## Learn and Setup cert-manager
[Guide here](https://cert-manager.io/docs/tutorials/getting-started-with-cert-manager-on-google-kubernetes-engine-using-lets-encrypt-for-ingress-ssl/)
[Also see here](https://cert-manager.io/docs/installation/helm/) and [here](https://cert-manager.io/docs/installation/compatibility/))


1. create static IP address and view it
   ```
   gcloud compute addresses create kw-02-primary-ip --global
   gcloud compute addresses list
   ```


2. Install Cert-manager
   ```
   helm repo add jetstack https://charts.jetstack.io && helm repo update
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.1/cert-manager.crds.yaml
   
   helm install \
      cert-manager jetstack/cert-manager \
      --namespace cert-manager \
      --create-namespace \
      --version 1.11.1 --set global.leaderElection.namespace=cert-manager

   ```

3. Create an issuer using Staging Lets Encrypt
   ```
   kubectl apply -f ./prod/google-cloud/4-cert-manager/issuer-lets-encrypt-staging.yaml
   ```

4. Apply empty secret
   ```
   kubectl apply -f ./prod/google-cloud/4-cert-manager/empty-secret.yaml
   ```

5. Create the ingress
   ```
   kubectl apply -f ./prod/google-cloud/4-cert-manager/tutorial/ingress-test.yaml
   ```

6. Modify the ingress to use SSL
   ```
   kubectl apply -f ./prod/google-cloud/4-cert-manager/tutorial/ingress-test2.yaml
   ```

7. Create an issuer using Production Lets Encrypt
   ```
   kubectl apply -f ./prod/google-cloud/4-cert-manager/tutorial/issuer-lets-encrypt-production.yaml
   ```

8. Change the Ingress to use the Production Lets Encrypt Issuer
   ```
   kubectl annotate ingress web-ingress cert-manager.io/issuer=letsencrypt-production --overwrite
   ```