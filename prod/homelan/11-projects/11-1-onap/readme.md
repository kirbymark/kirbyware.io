# Setup ONAP

## [Reference](https://docs.onap.org/projects/onap-oom/en/latest/sections/guides/infra_guides/oom_base_config_setup.html#oom-base-setup-guide)

1. Check kubectl and helm are installed
   ```
   helm version
   kubectl version
   ```

2. Install the OOM plugins required to un/deploy the OOM helm charts
   ```
   echo "oom/" > .gitignore
   git clone http://gerrit.onap.org/r/oom
   helm plugin install ./oom/kubernetes/helm/plugins/deploy
   helm plugin install ./oom/kubernetes/helm/plugins/undeploy
   helm plugin ls
   ```

<!-- 3. Install the Strimzi Kafka Operator
   ```
   helm repo add strimzi https://strimzi.io/charts/
   helm install strimzi-kafka-operator strimzi/strimzi-kafka-operator --namespace strimzi-system --version 0.35.0 --set watchAnyNamespace=true --create-namespace
   kubectl apply -f https://github.com/strimzi/strimzi-kafka-operator/releases/download/0.35.0/strimzi-crds-0.35.0.yaml --namespace strimzi-system 
   helm install strimzi-kafka-operator strimzi/strimzi-kafka-operator --namespace strimzi-system --version 0.35.0 --set watchAnyNamespace=true --create-namespace
   kubectl get po -n strimzi-system
   ``` -->


4. Verify cert-manager is running4
   ```
   kubectl get po -n cert-manager
   ```

<!-- 5. Install Prometheus Stack
   ```
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts && helm repo update
   helm install prometheus prometheus-community/kube-prometheus-stack --namespace=prometheus --create-namespace --version=35.6.2
   ```

6. Deploy Kafka Cluster
   ```
   kubectl apply -f 11-1-onap/kafka-cluster-ephemeral-single.yaml --namespace strimzi-system 
   ``` -->


7. Deploy ONAP
   ```
   helm deploy dev01 onap-release/onap --namespace onap --create-namespace --set global.masterPassword=myAwesomePassword88 --version 11.0.0 -f 11-1-onap/onap-values.yaml -f https://raw.githubusercontent.com/onap/oom/master/kubernetes/onap/resources/overrides/environment.yaml
   
   helm deploy dev01 onap-release/onap --namespace onap --create-namespace --set global.masterPassword=myAwesomePasswordThatINeedToChange --version 11.0.0 -f 11-1-onap/onap-values.yaml -f oom/kubernetes/onap/resources/overrides/environment.yaml
   ```
