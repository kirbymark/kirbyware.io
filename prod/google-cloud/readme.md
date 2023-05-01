# kirbyware-io Kubernetes cluster

## [Dashboard](https://console.cloud.google.com/home/dashboard?project=kirbyware-io-primary-k8&walkthrough_id=assistant_webhosting_index)

##  Overview
1. See [Setup](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster#gcloud_2)

2. Connect to the cluster
   ```
   gcloud container clusters get-credentials kirbyware-k8-cluster --region us-east1 --project kirbyware-io-primary-k8
   ```

3. Descibe the cluster
   ```
   gcloud container clusters describe kirbyware-k8-cluster --region us-east1 --project kirbyware-io-primary-k8
   ```

4.  Cleanup the cluster
   ```
   gcloud container clusters delete kirbyware-k8-cluster  --region us-east1
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

2. Expose
   ```
   kubectl expose deployment hello-server --type LoadBalancer --port 80 --target-port 8080
   ```

3. Check status
   ```
   kubectl get pods
   kubectl get service hello-server
   ```


---

## Setup Google-managed SSL certificates
[Follow this](https://cloud.google.com/kubernetes-engine/docs/how-to/managed-certs)

1. 



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
