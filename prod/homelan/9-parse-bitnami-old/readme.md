# my Parse Backend Setup

1.  Create namespace
    ```
    kubectl apply -f prod/homelan/9-parse-bitnami/namespace.yaml
    ```

2.  Install 
    ```
    kubectl apply -f prod/homelan/9-parse-bitnami/dashboard-configmap.yaml
    helm install parse bitnami/parse --namespace=parse --create-namespace -f prod/homelan/9-parse-bitnami/new-values.yaml --set server.host=parse.parse,server.containerPorts.http=1337,server.masterKey=6ioakMgqY0,dashboard.username=kirbymark,dashboard.password=defaultpassword
    ```

3.  Setup ingressroute 
    Add an alias to the pfSense DNS resolver
    ```
    kubectl apply -f prod/homelan/9-parse-bitnami/ingress-route-tls.yaml
    ```

    Test the backend
    ```
    curl -X POST \
        -H "X-Parse-Application-Id: myappID" \
        -H "Content-Type: application/json" \
        -d '{"score":1344,"playerName":"Sean Plott","cheatMode":false}' \
        https://parse.kirbyware.com/parse/classes/GameScore
    ```

    Access the dash
    ```
    https://parse-ui.kirbyware.com/
    ```

Notes: From the helm deployment

NAME: parse
LAST DEPLOYED: Fri May 26 14:02:22 2023
NAMESPACE: parse
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: parse
CHART VERSION: 20.2.1
APP VERSION: 6.1.0** Please be patient while the chart is being deployed **

Parse Server
------------

1. Get your Parse Server URL:

  export POD_NAME=$(kubectl get pods --namespace parse -l app.kubernetes.io/name=parse,app.kubernetes.io/component=server -o jsonpath="{.items[0].metadata.name}")
  kubectl port-forward --namespace parse $POD_NAME 1337:1337 &
  export SERVICE_HOST=127.0.0.1:1337

Example Usage:

  curl -X POST \
    -H "X-Parse-Application-Id: myappID" \
    -H "Content-Type: application/json" \
    -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
    http://$SERVICE_HOST/parse/classes/GameScore

Parse Dashboard
---------------

1. Get the Parse Dashboard URL:

  export POD_NAME=$(kubectl get pods --namespace parse -l app.kubernetes.io/name=parse,app.kubernetes.io/component=dashboard -o jsonpath="{.items[0].metadata.name}")
  kubectl port-forward --namespace parse $POD_NAME 4040:4040 &
  echo "Parse Dashboard URL: http://127.0.0.1:4040/"

2. Get your Parse Dashboard login credentials by running:

  echo Username: kirbymark
  echo Password: $(kubectl get secret --namespace parse parse -o jsonpath="{.data.parse-dashboard-password}" | base64 -d)