# my Prometheus setup

1.  Create namespace
    ```
    kubectl apply -f prod/homelan/7-kube-prometheus-stack/namespace.yaml
    ```

2.  Install 
    ```
    helm install prometheus prometheus-community/kube-prometheus-stack --namespace=monitoring --create-namespace -f prod/homelan/7-kube-prometheus-stack/my-values.yaml 
    ```

3.  Setup ingressroutes
    Add an alias to the pfSense DNS resolver
    ```
    kubectl apply -f prod/homelan/7-kube-prometheus-stack/grafana-console-ingressroute.yaml
    kubectl apply -f prod/homelan/7-kube-prometheus-stack/prometheus-console-ingressroute-.yaml
    ```
