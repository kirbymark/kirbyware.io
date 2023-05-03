## Setup Traefik on GKE

[See Repo](https://github.com/traefik/traefik-helm-chart/tree/master)
[Also see this](https://admintuts.net/server-admin/how-to-deploy-traefik-to-google-kubernetes-engine/)

1. Create namespace for traefik
   ```
   kubectl create namespace traefik
   ```

2. Create Static Global IP address
   ```
   gcloud compute addresses create c-armor-traefik-addr --global
   gcloud compute addresses list
   ```

3. Create Secret, Issuer, and Certificate

   Note:  Must have installed cert-manager before this step

   Create the DNS Edit API key on Cloudflares webssite - [see here](https://cert-manager.io/docs/configuration/acme/dns01/cloudflare/)
   add the key to ./prod/google-cloud/1-traefik/cloudflare-dns-edit-key.yaml file

   Staging to confirm it is working
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/cloudflare-dns-edit-key.yaml
   kubectl apply -f ./prod/google-cloud/1-traefik/cert-manager-issuer-kirbyware-io-staging.yaml
   kubectl apply -f ./prod/google-cloud/1-traefik/certificate-kirbyware-io-staging.yaml
   kubectl get certificate -n traefik
   ```
   
   Then production
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/cert-manager-issuer-kirbyware-io-production.yaml
   kubectl apply -f ./prod/google-cloud/1-traefik/certificate-kirbyware-io-production.yaml
   kubectl get certificate -n traefik
   ```


4. Install Traefik via Helm
   ```
   helm repo add traefik https://traefik.github.io/charts && helm repo update
   helm install traefik traefik/traefik -f ./prod/google-cloud/1-traefik/values.yaml --namespace=traefik

   ```

5. See the dashboard
   ```
   kubectl port-forward -n traefik $(kubectl get pods -n traefik --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000
   ```
   Accessible with the url: http://127.0.0.1:9000/dashboard/

6. Apply the healthcheck Ingress
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/healthcheck-ingress.yaml
   gcloud compute health-checks list
   gcloud compute health-checks update http --request-path "/healthcheck" k8s1-450d1b9e-traefik-traefik-80-229459ff
   ```

7. Validate the annotations 
   ```
   kubectl get ing traefik -o json -n traefik |jq '.metadata.annotations'
   ```


8. Apply basic Cloud Armor Policy - if it doesnt exist
   ```
   gcloud compute security-policies create armor-rule-1 --description "Cloud Armor Policy per https://traefik.io/blog/protect-applications-with-google-cloud-armor-and-traefik-proxy/"
   gcloud compute security-policies rules update 2147483647 --security-policy armor-rule-1 --description "allow everyone who pass all rules to visit the app" --action "allow"
   gcloud compute security-policies rules create 1000 --security-policy armor-rule-1 --description "deny if useragent is Godzilla"  --expression="request.headers['user-agent'].contains('Godzilla')" --action "deny-403"
   gcloud compute security-policies rules create 1001 --security-policy armor-rule-1 --description "deny if the region code is RU"  --expression="origin.region_code == 'RU'" --action "deny-403"
   ```

9. Connect Cloud Armor and Traefik Proxy
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/backendConfig.yaml
   kubectl annotate svc traefik --namespace=traefik "cloud.google.com/backend-config={\"ports\": {\"80\":\"backendconfig-armor-rule-1\"}}" 
   kubectl get service traefik --namespace=traefik -o json 
   ```