## Setup Dashy
   ```

1. Create PVC and deployment - [manifest](./dashy-setup-manifest.yaml)
   ```
   kubectl apply -f ./prod/google-cloud/10-corp-apps/2-dashy/dashy-setup-manifest.yaml
   ```

2. Check the Status of the Pod
   ```
   kubectl get pods -n corp-apps
   ```

3. Create and Apply service - [manifest](./dashy-service.yaml))
   ```
   kubectl apply -f ./prod/google-cloud/10-corp-apps/2-dashy/dashy-service.yaml
   ```

4. Apply IngressRoute - [manifest](./dashy-ingress-route-tls.yaml)
   ```
   kubectl apply -f ./prod/google-cloud/10-corp-apps/2-dashy/dashy-ingress-route-tls.yaml
   ```

7. Check the Status of the Pod
   ```
   kubectl get pods -n corp-apps
   ```

8. Copy the config into pod  - [config](../10-app-dashy/dashy_conf.yml) 
   ```
   kubectl cp ./prod/google-cloud/10-corp-apps/2-dashy/dashy_conf.yml $(kubectl get pods --no-headers -o custom-columns=":metadata.name" -n corp-apps | grep dashy ):/app/public/conf.yml -n corp-apps
   ```
    

9. Copying in other resources
   ```
   tar -C ./prod/google-cloud/10-corp-apps/2-dashy/ -cvf - ./item-icons/ | kubectl exec -i -n corp-apps $(kubectl get pods --no-headers -o custom-columns=":metadata.name" -n corp-apps | grep dashy ) -- tar xf - -C /app/public/
   ```

10. Then restart the deployment
   ```
   kubectl rollout restart deployment dashy -n corp-apps
   ```

11. Setup Authentication Forwarder for Dashy
   ```
   kubectl apply -f ./prod/google-cloud/10-corp-apps/2-dashy/google-auth-secret.yaml
   kubectl apply -f ./prod/google-cloud/10-corp-apps/2-dashy/traefik-forward-auth-deployment.yaml
   ```


11. Change the IngressROute for Dashy to use Google SSO
   ```
   kubectl apply -f ./prod/google-cloud/10-corp-apps/2-dashy/dashy-ingress-route-tls-sso.yaml
   ```

---
Notes:
- This is for troubleshooting only - Check via direct loadbalancer
   ```
   kubectl expose deployment dashy --type LoadBalancer --port 80 --target-port 8080
   ```

- Old ingress routes
   [tls-ingress](../10-app-dashy/dashy-ingress-tls.yaml)
   ```
   kubectl apply -f ./prod/google-cloud/10-app-dashy/dashy-ingress-tls.yaml
   ```

