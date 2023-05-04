## Setup Dashy 

1. Create PVC and deployment - [manifest](../10-app-dashy/dashy-setup-manifest.yaml)
   ```
   kubectl apply -f ./prod/google-cloud/10-app-dashy/dashy-setup-manifest.yaml
   ```

2. Check the Status of the Pod
   ```
   kubectl get pods -n apps
   ```

3. Create and Apply service - [manifest](../10-app-dashy/dashy-service.yaml)
   ```
   kubectl apply -f ./prod/google-cloud/10-app-dashy/dashy-service.yaml
   ```

4. Apply Ingress - [manifest](../10-app-dashy/dashy-ingress-tls.yaml)
   ```
   kubectl apply -f ./prod/google-cloud/10-app-dashy/dashy-ingress-tls.yaml
   ```

5. Check the Status of the Pod
   ```
   kubectl get pods -n apps
   ```

6. Copy the config into pod  - [config](../10-app-dashy/dashy_conf.yml) 
   ```
   kubectl cp ./prod/google-cloud/10-app-dashy/dashy_conf.yml apps/dashy-76f65bbd4f-2pvg5:/app/public/conf.yml
   ```

8. Copying in other resources
   ```
   tar -C ./prod/google-cloud/10-app-dashy -cvf - ./item-icons/ | kubectl exec -i -n apps dashy-76f65bbd4f-2pvg5 -- tar xf - -C /app/public/ 
   ```

7. Then restart the deployment
   ```
   kubectl rollout restart deployment dashy -n apps
   ```
   
---
6. This is for troubleshooting only - Check via direct loadbalancer
   ```
   kubectl expose deployment dashy --type LoadBalancer --port 80 --target-port 8080
   ```