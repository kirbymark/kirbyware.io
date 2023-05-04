## Setup Google-managed SSL certificates
[Follow this](https://cloud.google.com/kubernetes-engine/docs/how-to/managed-certs)

1. Create reserved IP address
   ```
   gcloud compute addresses create kw-gke-ip-addr --global
   ```

2. Display the address
   ```
   gcloud compute addresses describe kw-gke-ip-addr --global
   ```

3. Apply the managed certificate object
   ```
   kubectl apply -f ./prod/google-cloud/2-google-manged-ssl/managed-cert.yaml
   ```

4. Create and Apply a NodePort Service
   ```
   kubectl apply -f ./prod/google-cloud/2-google-manged-ssl/nodeport.yaml
   ```

5. Apply the Ingress
   ```
   kubectl apply -f ./prod/google-cloud/2-google-manged-ssl/managed-cert-ingress.yaml
   ```

6. Check the Status of the Pod, Ingress and the managed cert
   ```
   kubectl get pods
   kubectl get ingress
   kubectl get service
   kubectl describe managedcertificate managed-cert
   ```

7. delete 
   ```
   kubectl delete -f ./prod/google-cloud/2-google-manged-ssl/managed-cert.yaml
   kubectl annotate ingress managed-cert-ingress networking.gke.io/managed-certificates-
   ```