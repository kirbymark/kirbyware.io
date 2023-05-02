# kirbyware-io Kubernetes cluster

## [Dashboard](https://console.cloud.google.com/home/dashboard?project=kirbyware-io-primary-k8&walkthrough_id=assistant_webhosting_index)

##  Overview
  See [Setup](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster#gcloud_2)

1. create the cluster
   ```
   gcloud container clusters create-auto kw-01 --region us-east1 --project=kirbyware-io-primary-k8
   ```

2. Connect to the cluster
   ```
   gcloud container clusters get-credentials kw-01 --region us-east1 --project=kirbyware-io-primary-k8
   ```

3. Descibe the cluster
   ```
   gcloud container clusters describe kw-01 --region us-east1
   ```

4.  Cleanup the cluster
   ```
   gcloud container clusters delete kw-01  --region us-east1
   ```

----

## Install helm
1. Install helm
   ```
   curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
   chmod 700 get_helm.sh
   ./get_helm.sh
   ```

---

## Deploy example app

[Follow this](https://cloud.google.com/kubernetes-engine/docs/deploy-app-cluster)

1. Install
   ```
   kubectl create deployment hello-server --image=us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
   ```
---


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

----
## Setup Dashy 

1. Create PVC and deployment
   ```
   kubectl apply -f ./prod/google-cloud/3-dashy-app/dashy-setup-manifest.yaml
   ```

2. Check the Status of the Pod
   ```
   kubectl get pods
   ```
3. Create and Apply a NodePort Service
   ```
   kubectl apply -f ./prod/google-cloud/3-dashy-app/nodeport.yaml
   ```

4. Apply the modified Ingress
   ```
   kubectl apply -f ./prod/google-cloud/3-dashy-app/managed-cert-ingress-dashy.yaml
   ```

5. Check the Status of the Pod
   ```
   kubectl get pods
   ```

6. This is for troubleshooting only - Check via direct loadbalancer
   ```
   kubectl expose deployment dashy --type LoadBalancer --port 80 --target-port 8080
   ```

7. I had to create a config file within the PVC
   ```
   kubectl exec -it dashy-5f7bbcf7c8-7l9k7 /bin/sh   
   ```

8. Copying in some icons
   ```
   tar cf - ./synology.png | kubectl exec -i dashy-5f7bbcf7c8-7l9k7 -- tar xf - -C /app/public/item-icons
   tar cf - ./xoa-transparent.png | kubectl exec -i dashy-5f7bbcf7c8-7l9k7 -- tar xf - -C /app/public/item-icons  
   ```
   


# for now am only using Google Managed SSL - Perhaps in the future will explore cert-manager and Traefik

----
## Setup cert-manager
https://cert-manager.io/docs/tutorials/getting-started-with-cert-manager-on-google-kubernetes-engine-using-lets-encrypt-for-ingress-ssl/


----

## Setup Traefik on GKE

[Follow this](https://admintuts.net/server-admin/how-to-deploy-traefik-to-google-kubernetes-engine/)

1. Create namespace for traefik
   ```
   kubectl create namespace traefik
   ```

2. Create a Traefik Service Account
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/service-account.yaml
   ```


3. Create a Cluster Role and Cluster Role Binding
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/cluster-role-binding.yaml
   ```

4. Create a ConfigMap
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/traefik-config.yaml
   ```

5. Create a Traefik Deployment
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/traefik-deployment.yaml
   ```


6. Create a Traefik Service
   ```
   kubectl apply -f ./prod/google-cloud/1-traefik/traefik-service.yaml
   ```

7. Verify the Traefik Deployment
   ```
   kubectl get pods -n traefik
   kubectl describe pod -n traefik-deployment-6f7d5c4787-7pcd7
   
----

## Install cert-manager

1. Install and check it is running
```
helm install --create-namespace --namespace cert-manager --set installCRDs=true --set global.leaderElection.namespace=cert-manager cert-manager jetstack/cert-manager
kubectl -n cert-manager get all
```

2. remove cert-manager
```
helm uninstall --namespace cert-manager cert-manager 
kubectl -n cert-manager get all
```

----
