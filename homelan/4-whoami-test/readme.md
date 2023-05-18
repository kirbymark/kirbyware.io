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
   helm install whoami cowboysysop/whoami -n test -f homelan/4-whoami-test/whoami-my-values.yaml
   ```

3. Check it is running
   ```
   kubectl --namespace test port-forward $(kubectl get pods --namespace test -l "app.kubernetes.io/name=whoami,app.kubernetes.io/instance=whoami" --output=name) 8080:80
   ```
   Visit http://127.0.0.1:8080/ 

4.  Another Test
   ```
   kubectl create deploy mytest -n test --image containous/whoami
   kubectl expose deploy mytest -n test --port 80 --type LoadBalancer
   ```

5. cleanup
   ```
   k delete deployment mytest -n test 
   k delete service mytest -n test 
   ```

6. Create Ingress Route - [manifest](./whoami-ingress-route.yaml)
   ```
   kubectl apply -f ./homelan/4-whoami-test/whoami-ingress-route.yaml
   ```


7. Confirm ingress
   https://test.local.kirbyware.com
   http://test.local.kirbyware.com


8. Cleanup test resources
   ```
   kubectl delete namespace test
   ```
