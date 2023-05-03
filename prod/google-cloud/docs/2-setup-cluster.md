# kirbyware-io Kubernetes cluster

## [Dashboard](https://console.cloud.google.com/home/dashboard?project=kirbyware-io-primary-k8&walkthrough_id=assistant_webhosting_index)

##  Overview
  See [Setup](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster#gcloud_2)

1. create the cluster
   ```
   gcloud container clusters create-auto kw-03 --region us-east1 --project=kirbyware-io-primary-k8
   ```

2. Connect to the cluster
   ```
   gcloud container clusters get-credentials kw-03 --region us-east1 --project=kirbyware-io-primary-k8
   ```

3. Descibe the cluster
   ```
   gcloud container clusters describe kw-03 --region us-east1
   ```

4.  Cleanup the cluster
   ```
   gcloud container clusters delete kw-03 --region us-east1
   ```