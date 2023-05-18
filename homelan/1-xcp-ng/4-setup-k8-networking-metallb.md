# Setup Metal LB with Calico

1. add metallb helm chart
   ```
   helm repo add metallb https://metallb.github.io/metallb && helm repo update
   helm show values metallb/metallb >> default-metallb-helm-chart-values.yaml
   ```

2. Create the namespace and modify node setting on contoller
   ``` 
   kubectl apply -f metallb-namespace.yaml

   ```
3. Deploy Metallb
    ```
    helm install metallb metallb/metallb --namespace metallb-system -f metallb-helm-chart-values-my.yaml
    ```

4. Set Metallb config 
    ```
    kubectl apply -f metallb-ipaddresspool.yaml
    ```


5. Test it is working
   ```
   kubectl create deploy nginx --image nginx
   kubectl expose deploy nginx --port 80 --type LoadBalancer
   curl http://10.200.10.1/
   ```

6. cleanup
   ```
   k delete deployment nginx && k delete service nginx
   ```

Notes:
- Cloudflare is forcing traffic to https - To change0
   Log in to your Cloudflare account Open external link and go to a specific domain.
   Go to SSL/TLS > Edge Certificates.
   For Always Use HTTPS, switch the toggle to On.

Updated pfSense Config with NAT rules
[here](./pfSense-config/config/config-yates.local.kirbyware.com-20230518202529.xml)

   # Not used
   # kubectl label node lkw-ctl00 node.kubernetes.io/exclude-from-external-load-balancers=true --overwrite=true 