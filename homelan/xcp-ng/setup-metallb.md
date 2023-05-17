# Setup Metal LB with Calico

1. Install calicoctl as kubectl plugin
   ```
   ssh kirbymark@lkw-ctl00.local.kirbyware.com
   sudo curl -L https://github.com/projectcalico/calico/releases/latest/download/calicoctl-linux-amd64 -o /usr/local/bin/kubectl-calico
   sudo chmod +x /usr/local/bin/kubectl-calico
   kubectl calico -h
   ```

2. add metallb helm chart
   ```
   helm repo add metallb https://metallb.github.io/metallb && helm repo update
   helm show values metallb/metallb >> default-metallb-helm-chart-values.yaml
   ```

3. Create the namespace and modify node setting on contoller
   ``` 
   kubectl apply -f metallb-namespace.yaml

   ```

4. Config BGP peering for yates and Calico
    in yates install the FFR package and configure it per https://geek-cookbook.funkypenguin.co.nz/kubernetes/loadbalancer/metallb/pfsense/
    see screenshots and diagram
    

5. Deploy Metallb
    ```
    helm install metallb metallb/metallb --namespace metallb-system -f metallb-helm-chart-values-my.yaml
    ```

6. Set Metallb config AND Set Calico BGP default config
    ```
    kubectl apply -f metallb-ipaddresspool.yaml
    kubectl apply -f calico-config.yaml

    ```


7. Test it is working
   ```
   kubectl create deploy nginx --image nginx 
   kubectl expose deploy nginx --port 80 --type LoadBalancer
   curl http://10.200.10.1/
   ```

8. cleanup
   ```
   k delete deployment nginx && k delete service nginx
   ```



   # Not used
   # kubectl label node lkw-ctl00 node.kubernetes.io/exclude-from-external-load-balancers=true --overwrite=true 