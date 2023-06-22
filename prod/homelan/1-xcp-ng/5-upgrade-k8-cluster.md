# Upgrade K8 Cluster

Notes:  [following this guide](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)

## Determine version 
```
apt-cache madison kubeadm
```


## Upgrade controller lkw-ctl00
1. Upgrade kubeadm
    ```
    sudo apt-mark unhold kubeadm && sudo apt-get update && sudo apt-get install -y kubeadm=1.27.3-00 && sudo apt-mark hold kubeadm

    kubeadm version

    sudo kubeadm upgrade plan

    sudo kubeadm upgrade apply v1.27.3
    ```

2. Upgrade kubelet, kubectl
    ```
    sudo apt-mark unhold kubelet kubectl && \
    sudo apt-get update && sudo apt-get install -y kubelet=1.27.3-00 kubectl=1.27.3-00 && \
    sudo apt-mark hold kubelet kubectl

    sudo systemctl daemon-reload
    sudo systemctl restart kubelet
    ```



## on the worker nodes lkw-node00, lkw-node01, lkw-node02 etc.
1. Upgrade kubeadm
    ```
    sudo apt-mark unhold kubeadm && sudo apt-get update && sudo apt-get install -y kubeadm=1.27.3-00 && sudo apt-mark hold kubeadm

    sudo kubeadm upgrade node
    ```

2. Upgrade kubelet, kubectl
    ```
    sudo apt-mark unhold kubelet kubectl && sudo apt-get update && sudo apt-get install -y kubelet=1.27.3-00 kubectl=1.27.3-00 && sudo apt-mark hold kubelet kubectl

    sudo systemctl daemon-reload
    sudo systemctl restart kubelet
    ```

Full command for the worker nodes
```
sudo apt-mark unhold kubeadm && sudo apt-get update && sudo apt-get install -y kubeadm=1.27.3-00 && sudo apt-mark hold kubeadm
    
sudo kubeadm upgrade node
    
sudo apt-mark unhold kubelet kubectl && sudo apt-get update && sudo apt-get install -y kubelet=1.27.3-00 kubectl=1.27.3-00 && sudo apt-mark hold kubelet kubectl

sudo systemctl daemon-reload
sudo systemctl restart kubelet
