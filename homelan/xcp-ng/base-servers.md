# Setup base servers

## Use the image created
Ubuntu-Base-Image

## 1 - Prepare Servers
---

1. Set permanat hostname (need to do this if VMs were cloned)
    ```
    hostnamectl set-hostname lkw-node01
    hostnamectl set-hostname lkw-node02
    ```


3. Setup Static IP via DHCP leases in pfSense
    ```
    lkw-ctl00: 10.255.10.20
    lkw-ctl01: 10.255.10.21
    lkw-node00: 10.255.10.30
    lkw-node01: 10.255.10.31
    lkw-node02: 10.255.10.32
    lkw-node03: 10.255.10.33
    lkw-node04: 10.255.10.34
    lkw-node05: 10.255.10.35
    lkw-node06: 10.255.10.36
    ```


4. Confirm all OS patches are updated
    ```
    sudo apt update && sudo apt dist-upgrade && sudo apt autoremove
    ```


5. Install container runtime (on all servers) and confirm it is running
    ```
    sudo apt install containerd

    systemctl status containerd
    ```

6. Create containerd config file  (on all servers)
    ```
    sudo mkdir /etc/containerd && containerd config default | sudo tee /etc/containerd/config.toml
    ```

7. Edit containerd config file  (on all servers)
    ```
    [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
                SystemdCgroup = true
    ```
    to check
    ```
    sudo more /etc/containerd/config.toml | grep SystemdCgroup
                SystemdCgroup = true
    ```

8. Disable swap and check it is off  (on all servers)
    ```
    sudo swapoff -a && sudo rm /swap.img
    sudo vi /etc/fstab
    comment the line /swap.img

    sudo swapon --show && free -h
    ```

9. Enable packet forwarding  (on all servers)
    ```
    sudo vi /etc/sysctl.conf
    uncomment the line 
            net.ipv4.ip_forward=1
    ```

10. set netfilter  (on all servers)
    ```
    sudo vi /etc/modules-load.d/k8s.conf

    add line
        br_netfilter
    ```

10. reboot all machines
    ```
    sudo reboot now
    ```

## 2 - Install K8 packages
---

1. add the required GPG key and the package repo needed for kubernetes (on all servers)
    ```
    sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
    echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
    sudo apt update
    ```

2. install the packages required for K8 (on all servers)
    ```
    sudo apt install kubeadm kubectl kubelet

    ```

## 3 - Aside -- creating new worker nodes
---

1. Copy from the VM 

2. Boot the node, change the hostname, then reboot
    ```
    hostnamectl set-hostname k8-node-01
    sudo vi /etc/hosts
    ```

## 4 - Setup cluster 
---

1. Create the K8 network on the controller
    ```
    sudo kubeadm init --control-plane-endpoint=10.255.10.15 --node-name k8-ctl-01 --pod-network-cidr=10.244.0.0/16
    ```

2. Copy and keep the join command from the output of the above command

3. Run the commands on the contoller to provide user access
    ```
    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    ```

4. Check cluster is running
    ```
    ubuntu@k8-ctl-01:~$ kubectl get pods --all-namespaces
    NAMESPACE     NAME                                READY   STATUS    RESTARTS   AGE
    kube-system   coredns-565d847f94-hg29j            0/1     Pending   0          6m55s
    kube-system   coredns-565d847f94-zqq7g            0/1     Pending   0          6m55s
    kube-system   etcd-k8-ctl-01                      1/1     Running   0          7m8s
    kube-system   kube-apiserver-k8-ctl-01            1/1     Running   0          7m8s
    kube-system   kube-controller-manager-k8-ctl-01   1/1     Running   0          7m8s
    kube-system   kube-proxy-6vkth                    1/1     Running   0          6m55s
    kube-system   kube-scheduler-k8-ctl-01            1/1     Running   0          7m8s
    ```

  5. Create overlay network
    ```
    kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
    ```

  6. Check cluster is running
    ```
    ubuntu@k8-ctl-01:~$ kubectl get pods --all-namespaces
    NAMESPACE      NAME                                READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-mpr9b               1/1     Running   0          21s
    kube-system    coredns-565d847f94-hg29j            1/1     Running   0          9m44s
    kube-system    coredns-565d847f94-zqq7g            1/1     Running   0          9m44s
    kube-system    etcd-k8-ctl-01                      1/1     Running   0          9m57s
    kube-system    kube-apiserver-k8-ctl-01            1/1     Running   0          9m57s
    kube-system    kube-controller-manager-k8-ctl-01   1/1     Running   0          9m57s
    kube-system    kube-proxy-6vkth                    1/1     Running   0          9m44s
    kube-system    kube-scheduler-k8-ctl-01            1/1     Running   0          9m57
    ```


## 5 - Join nodes to the cluster 
---

1. create a new join command (on the controller)
    ```
    kubeadm token create --print-join-command
    ```

2. Use the output of the above on each of the nodes to join them to the cluster.
* Note:  You need to use sudo then the join command


## 6 - Cluster is now running
---
1. To check the cluster
    ```
    ubuntu@k8-ctl-01:~$ kubectl get nodes
    NAME         STATUS   ROLES           AGE   VERSION
    k8-ctl-01    Ready    control-plane   17m   v1.25.3
    k8-node-01   Ready    <none>          95s   v1.25.3
    k8-node-02   Ready    <none>          71s   v1.25.3
    k8-node-03   Ready    <none>          48s   v1.25.3
    ```

## 7  - Cluster permissions
---
[see](https://capstonec.com/2020/04/29/add-kubernetes-users-to-your-cluster/)