## Setup cert-manager
[See Docs here](https://cert-manager.io/docs/installation/helm/) and [here](https://cert-manager.io/docs/installation/compatibility/))
[See the Tutorial Guide here](https://cert-manager.io/docs/tutorials/getting-started-with-cert-manager-on-google-kubernetes-engine-using-lets-encrypt-for-ingress-ssl/)


1. Install Cert-manager
   ```
   helm repo add jetstack https://charts.jetstack.io && helm repo update
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.1/cert-manager.crds.yaml
   
   helm install \
      cert-manager jetstack/cert-manager \
      --namespace cert-manager \
      --create-namespace \
      --version 1.11.1 --set global.leaderElection.namespace=cert-manager
   ```