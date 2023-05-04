## Setup whoami to Test deployments

1. Create namespace for whoami
   ```
   kubectl create namespace whoami
   kubectl get namespaces
   ```

2. Install whoami
   ```
   helm repo add cowboysysop https://cowboysysop.github.io/charts/ && helm repo update
   helm install whoami cowboysysop/whoami -n whoami
   ```

3. Check it is running
   ```
   kubectl --namespace whoami port-forward $(kubectl get pods --namespace whoami -l "app.kubernetes.io/name=whoami,app.kubernetes.io/instance=whoami" -o jsonpath="{.items[0].metadata.name}") 8080:80
   ```
   Visit http://127.0.0.1:8080/ 


4. Create Service
   ```
   kubectl apply -f ./prod/google-cloud/5-whoami-test/whoami-service.yaml
   ```

5. Create Ingress
   ```
   kubectl apply -f ./prod/google-cloud/5-whoami-test/whoami-ingress.yaml
   ```

5. add service name to DNS
   ```

   ```

