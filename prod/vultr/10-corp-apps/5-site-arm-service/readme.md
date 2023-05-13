## Setup Site-Arm Backend Service
 
1. Create and Apply deployment and service - [manifest](./site-arm-deployment.yaml))
   ```
   kubectl apply -f ./prod/google-cloud/10-corp-apps/5-site-arm-service/site-arm-deployment.yaml
   ```

2. Apply IngressRoute - [manifest](./site-arm-ingress-route.yaml)
   ```
   kubectl apply -f ./prod/google-cloud/10-corp-apps/5-site-arm-service/site-arm-ingress-route.yaml
   ```

3. Check the Status of the Pod
   ```
   kubectl get pods -n apps
   ```
