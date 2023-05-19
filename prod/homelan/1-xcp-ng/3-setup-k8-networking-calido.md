# Setup base servers

Notes:  [following this guide](https://www.itsgeekhead.com/tuts/kubernetes-126-ubuntu-2204.txt)

1. Add Calico 3.25.1
```
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.1/manifests/tigera-operator.yaml
```

2. Download and modify the Calico resource defintions
```
wget https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/custom-resources.yaml
vi custom-resources.yaml
kubectl apply -f custom-resources.yaml
```

Note The edit is to change the line for cidr
```
 >       cidr: 10.10.0.0/16
---
<       cidr: 192.168.0.0/16
```

3. Get the join command
```
kubeadm token create --print-join-command
kubeadm join 10.255.10.20:6443 --token xklj2e.crll1x4ag3ax1r2d --discovery-token-ca-cert-hash sha256:3968ebf4f61fcbc7463ed248ecde47068e832fb3e5d9b98804cb9021d6801893
```

4. Join workers to the controller
    Run the command from above.  Make sure you run as sudo
    ```
    sudo kubeadm join 10.255.10.20:6443 --token xklj2e.crll1x4ag3ax1r2d --discovery-token-ca-cert-hash sha256:3968ebf4f61fcbc7463ed248ecde47068e832fb3e5d9b98804cb9021d6801893
    exit
    ```

5. Config BGP peering for yates and Calico
    in yates install the FFR package and configure it per https://geek-cookbook.funkypenguin.co.nz/kubernetes/loadbalancer/metallb/pfsense/
    see screenshots and diagram

6. Apply Set Calico BGP default config
    ```
    kubectl apply -f calico-config.yaml
    ```


## Notes
   
you can confirm the nodes by running kubectl get nodes from the master contoller
you can also copy the config to your local machines
```
scp kirbymark@lkw-ctl00.local.kirbyware.com:/home/kirbymark/.kube/config config-lkw
export KUBECONFIG="${HOME}/.kube/config-gke:${HOME}/.kube/config-vke:${HOME}/.kube/config-lkw"
restart the shell to load environment
kubectx
kubectx LKW=kubernetes-admin@kubernetes
```

Install calicoctl as kubectl plugin
   ```
   ssh kirbymark@lkw-ctl00.local.kirbyware.com
   sudo curl -L https://github.com/projectcalico/calico/releases/latest/download/calicoctl-linux-amd64 -o /usr/local/bin/kubectl-calico
   sudo chmod +x /usr/local/bin/kubectl-calico
   kubectl calico -h
   ```
