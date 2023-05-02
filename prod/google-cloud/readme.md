# kirbyware-io Kubernetes cluster

## [Dashboard](https://console.cloud.google.com/home/dashboard?project=kirbyware-io-primary-k8&walkthrough_id=assistant_webhosting_index)
## [Setup Environment](./setup-environment.md)
## [Setup Cluster](./setup-cluster.md)
## [Setup Google Managed SSL Certs](./setup-google-ssl.md)

## [Setup Traefix for GKE Ingress](./setup-traefik.md)


## Deploy example app

[Follow this](https://cloud.google.com/kubernetes-engine/docs/deploy-app-cluster)

1. Install
   ```
   kubectl create deployment hello-server --image=us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
   ```
---


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


