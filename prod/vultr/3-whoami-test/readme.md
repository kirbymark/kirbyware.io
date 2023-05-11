## Setup whoami to Test deployments

1. Create namespace for testing 
   ```
   kubectl create namespace test
   kubectl get namespaces
   kubectl get all -n test 
   ```

2. Install whoami
   ```
   helm repo add cowboysysop https://cowboysysop.github.io/charts/ && helm repo update
   helm install whoami cowboysysop/whoami -n test
   ```

3. Check it is running
   ```
   kubectl --namespace test port-forward $(kubectl get pods --namespace test -l "app.kubernetes.io/name=whoami,app.kubernetes.io/instance=whoami" --output=name) 8080:80
   ```
   Visit http://127.0.0.1:8080/ 


5. Create Ingress Route - [manifest](./whoami-ingress-route.yaml)
   ```
   kubectl apply -f ./prod/vultr/3-whoami-test/whoami-ingress-route.yaml
   ```


6. Confirm ingress
   https://test.kirbyware.io
   http://test.kirbyware.io


7. Cleanup test resources
   ```
   kubectl delete namespace test
   ```
