## Setup Traefik on vultr

[See Repo](https://github.com/traefik/traefik-helm-chart/tree/master)
[Also see this](https://admintuts.net/server-admin/how-to-deploy-traefik-to-google-kubernetes-engine/)

1. Create namespace for traefik and install CRDs
   ```
   kubectl create namespace traefik
   kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v2.10/docs/content/reference/dynamic-configuration/kubernetes-crd-definition-v1.yml
   kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v2.10/docs/content/reference/dynamic-configuration/kubernetes-crd-rbac.yml
   ```

2. Create Secret, Issuer, and Certificate

   Note:  Must have installed cert-manager before this step

   Create the DNS Edit API key on Cloudflares webssite - [see here](https://cert-manager.io/docs/configuration/acme/dns01/cloudflare/)
   add the key to ./prod/google-cloud/1-traefik/cloudflare-dns-edit-key.yaml file

   Staging to confirm it is working
   ```
   kubectl create namespace traefik
   kubectl apply -f ./homelan/3-setup-traefik/cloudflare-dns-edit-key.yaml
   kubectl apply -f ./homelan/3-setup-traefik/cert-manager-issuer-kirbyware-com-staging.yaml
   kubectl apply -f ./homelan/3-setup-traefik/certificate-local-kirbyware-com-staging.yaml
   kubectl apply -f ./homelan/3-setup-traefik/certificate-kirbyware-com-staging.yaml
   kubectl get certificate -n traefik
   ```
   
   Then production
   ```
   kubectl apply -f ./homelan/3-setup-traefik/cloudflare-dns-edit-key.yaml
   kubectl apply -f ./homelan/3-setup-traefik/cert-manager-issuer-kirbyware-com-production.yaml
   kubectl apply -f ./homelan/3-setup-traefik/certificate-local-kirbyware-com-production.yaml
   kubectl apply -f ./homelan/3-setup-traefik/certificate-kirbyware-com-production.yaml
   kubectl get certificate -n traefik
   ```


4. Install Traefik via Helm
   ```
   helm repo add traefik https://traefik.github.io/charts && helm repo update
   helm install traefik traefik/traefik -f ./homelan/3-setup-traefik/local-values.yaml --namespace=traefik
   ```

5. Set the default certificate for traefik
   ```
   kubectl apply -f ./homelan/3-setup-traefik/traefik-default-cert.yaml
   ```

6. See the dashboard
   ```
   kubectl port-forward -n traefik $(kubectl get pods -n traefik --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000
   ```
   Accessible with the url: http://127.0.0.1:9000/dashboard/