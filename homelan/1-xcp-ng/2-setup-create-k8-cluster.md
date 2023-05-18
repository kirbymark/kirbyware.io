# Setup base servers

Notes:  [following this guide](https://www.itsgeekhead.com/tuts/kubernetes-126-ubuntu-2204.txt)


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


4. Prepare all hosts - part 1
    ```
    sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
    sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
    sudo sysctl -w net.ipv6.conf.lo.disable_ipv6=1
    sudo apt update && sudo apt upgrade && sudo apt dist-upgrade && sudo apt autoremove
    sudo apt-get install -y apt-transport-https ca-certificates curl
    printf "overlay\nbr_netfilter\n" | sudo tee /etc/modules-load.d/containerd.conf
    printf "net.bridge.bridge-nf-call-iptables = 1\nnet.ipv4.ip_forward = 1\nnet.bridge.bridge-nf-call-ip6tables = 1\n" | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf

    sudo wget https://github.com/containerd/containerd/releases/download/v1.7.1/containerd-1.7.1-linux-amd64.tar.gz -P /tmp/
    sudo tar Cxzvf /usr/local /tmp/containerd-1.7.1-linux-amd64.tar.gz
    sudo wget https://raw.githubusercontent.com/containerd/containerd/main/containerd.service -P /etc/systemd/system/
    sudo systemctl daemon-reload
    sudo systemctl enable --now containerd
    
    sudo wget https://github.com/opencontainers/runc/releases/download/v1.1.7/runc.amd64 -P /tmp/
    sudo install -m 755 /tmp/runc.amd64 /usr/local/sbin/runc


    sudo wget https://github.com/containernetworking/plugins/releases/download/v1.3.0/cni-plugins-linux-amd64-v1.3.0.tgz -P /tmp/
    sudo mkdir -p /opt/cni/bin
    sudo tar Cxzvf /opt/cni/bin /tmp/cni-plugins-linux-amd64-v1.3.0.tgz

    sudo mkdir -p /etc/containerd
    sudo containerd config default | sudo tee /etc/containerd/config.toml
    sudo sed -i "/SystemdCgroup/ s/= $PARTITION_COLUMN.*/= true/" /etc/containerd/config.toml 
    sudo systemctl restart containerd

    sudo sed -i  's/^\/swap/#\/swap/' /etc/fstab

    sudo curl -fsSLo /etc/apt/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
    sudo echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
    sudo apt-get update

    sudo reboot
    ```

5. Prepare all hosts - part 2
    ```
    sudo apt-get install -y kubelet kubeadm kubectl
    sudo apt-mark hold kubelet kubeadm kubectl
    free -m
    exit

    ```

6. Prepare CONTROLLER 
    1. control plane install
    ```
    sudo kubeadm init --pod-network-cidr 10.10.0.0/16 --kubernetes-version 1.27.1 --node-name lkw-ctl00
    ```
    
    2. Then run the command provided to create local user
    ```
    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    ```

    3. Check all is good
    ```
    kubectl get nodes
    ```
    should show as NotReady
    ```
    NAME        STATUS     ROLES           AGE     VERSION
    lkw-ctl00   NotReady   control-plane   3m11s   v1.27.1
    ```
