
4. Apply the catch-all Ingress
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/catchall-ingress.yaml --namespace=traefik-system
   kubectl get ing -n traefik-system
   ```

5. Apply the healthcheck Ingress
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/healthcheck-ingress.yaml
   gcloud compute health-checks update http --request-path "/healthcheck" k8s1-48993332-traefik-system-traefik-80-7479dc8a
   ```
   Note you can get the name of the LoadBalancer from 
   ```
   gcloud compute health-checks list
   ```


6. Validate the annotations 
   ```
   kubectl get ing catch-all-ingress -o json -n traefik-system |jq '.metadata.annotations'
   ```
{
  "ingress.kubernetes.io/backends": "{\"k8s1-48993332-traefik-system-traefik-80-7479dc8a\":\"HEALTHY\"}",
  "ingress.kubernetes.io/forwarding-rule": "k8s2-fr-ti163jvh-traefik-system-catch-all-ingress-j7y89irc",
  "ingress.kubernetes.io/target-proxy": "k8s2-tp-ti163jvh-traefik-system-catch-all-ingress-j7y89irc",
  "ingress.kubernetes.io/url-map": "k8s2-um-ti163jvh-traefik-system-catch-all-ingress-j7y89irc",
  "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"networking.k8s.io/v1\",\"kind\":\"Ingress\",\"metadata\":{\"annotations\":{\"kubernetes.io/ingress.global-static-ip-name\":\"cloud-aromor-traefik-addr\"},\"name\":\"catch-all-ingress\",\"namespace\":\"traefik-system\"},\"spec\":{\"defaultBackend\":{\"service\":{\"name\":\"traefik\",\"port\":{\"number\":80}}}}}\n",
  "kubernetes.io/ingress.global-static-ip-name": "cloud-aromor-traefik-addr"
}



7. Apply basic Cloud Armor Policy
   ```
   gcloud compute security-policies create armor-rule-1 --description "Cloud Armor Policy per https://traefik.io/blog/protect-applications-with-google-cloud-armor-and-traefik-proxy/"
   gcloud compute security-policies rules update 2147483647 --security-policy armor-rule-1 --description "allow everyone who pass all rules to visit the app" --action "allow"
   gcloud compute security-policies rules create 1000 --security-policy armor-rule-1 --description "deny if useragent is Godzilla"  --expression="request.headers['user-agent'].contains('Godzilla')" --action "deny-403"
   gcloud compute security-policies rules create 1001 --security-policy armor-rule-1 --description "deny if the region code is RU"  --expression="origin.region_code == 'RU'" --action "deny-403"
   ```

8. Connect Cloud Armor and Traefik Proxy
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/backendConfig.yaml --namespace=traefik-system
   kubectl annotate svc traefik --namespace=traefik-system "cloud.google.com/backend-config={\"ports\": {\"80\":\"backendconfig-armor-rule-1\"}}" 
   kubectl get service traefik --namespace=traefik-system -o json 
   ```
   
8. Create a test deployment
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/test-whoami.yaml
   ```

9. Create the ingress for the test deployment
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/test-whoami-ingress.yaml
   ```
   

10. Create the default headers   NOTE:  HAVE NOT RUN THIS YET
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/default-headers.yaml
   ```
   