## Setup Dashy

0. Ensure the OpenEBS strorage class has been created   [see](../1-openebs/readme.md)
   ```
   kubectl get sc
   ```
   we are using a sc called cstor-csi-disk


1. Create PVC and deployment - [manifest](./dashy-setup-manifest.yaml)
   ```
   kubectl create namespace corp-apps
   kubectl apply -f prod/homelan/8-dashy/dashy-pvc.yaml 
   kubectl apply -f prod/homelan/8-dashy/dashy-setup-manifest.yaml
   ```

2. Check the Status of the Pod
   ```
   kubectl get all -n corp-apps 
   ```

3. Create and Apply service - [manifest](./dashy-service.yaml))
   ```
   kubectl apply -f prod/homelan/8-dashy/dashy-service.yaml
   ```

4. Copy the config into pod  - [config](../10-app-dashy/dashy_conf.yml) 
   ```
   kubectl cp prod/homelan/8-dashy/dashy_conf.yml dashy-57c98f45db-w5ph4:/app/public/conf.yml -n corp-apps
   ```
    

5. Copying in other resources
   ```
   tar -C prod/homelan/8-dashy/ -cvf - ./item-icons/ | kubectl exec -i -n corp-apps dashy-57c98f45db-w5ph4 -- tar xf - -C /app/public/
   ```

6. Then restart the deployment
   ```
   kubectl rollout restart deployment dashy -n corp-apps
   ```

7. Create ingressroute
   ```
   kubectl apply -f prod/homelan/8-dashy/dashy-ingress-route-tls.yaml
   ```
Note - need to add the DNS resolver to the pfSense

---
Notes:
- This is for troubleshooting only - Check via direct loadbalancer
   ```
   kubectl port-forward -n corp-apps svc/dashy 8081:80
   ```


