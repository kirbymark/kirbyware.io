## Setup Traefik on GKE

[See Repo](https://github.com/traefik/traefik-helm-chart/tree/master)
[Also see this](https://admintuts.net/server-admin/how-to-deploy-traefik-to-google-kubernetes-engine/)

1. Create namespace for traefik
   ```
   kubectl create namespace traefik
   ```

2. Create Static Global IP address
   ```
   gcloud compute addresses create kw-05-traefik-ip --region us-east1
   gcloud compute addresses list
   ```

3. Create Secret, Issuer, and Certificate

   Note:  Must have installed cert-manager before this step

   Create the DNS Edit API key on Cloudflares webssite - [see here](https://cert-manager.io/docs/configuration/acme/dns01/cloudflare/)
   add the key to ./prod/google-cloud/1-traefik/cloudflare-dns-edit-key.yaml file

   Staging to confirm it is working
   ```
   kubectl create namespace traefik
   kubectl apply -f ./prod/google-cloud/4-traefik/cloudflare-dns-edit-key.yaml
   kubectl apply -f ./prod/google-cloud/4-traefik/cert-manager-issuer-kirbyware-io-staging.yaml
   kubectl apply -f ./prod/google-cloud/4-traefik/certificate-kirbyware-io-staging.yaml
   kubectl get certificate -n traefik
   ```
   
   Then production
   ```
   kubectl apply -f ./prod/google-cloud/4-traefik/cert-manager-issuer-kirbyware-io-production.yaml
   kubectl apply -f ./prod/google-cloud/4-traefik/certificate-kirbyware-io-production.yaml
   kubectl get certificate -n traefik
   ```


4. Install Traefik via Helm
   ```
   helm repo add traefik https://traefik.github.io/charts && helm repo update
   helm install traefik traefik/traefik -f ./prod/google-cloud/4-traefik/values.yaml --namespace=traefik

   ```

5. See the dashboard
   ```
   kubectl port-forward -n traefik $(kubectl get pods -n traefik --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000
   ```
   Accessible with the url: http://127.0.0.1:9000/dashboard/