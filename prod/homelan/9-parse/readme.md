# my Parse Backend Setup

1.  Create namespace
    ```
    kubectl apply -f prod/homelan/9-parse/namespace.yaml
    ```

1b.  Label the nodes
    ```
    kubectl label nodes lkw-node00 lkw-node01 lkw-node02 lkw-node03 lkw-node04 lkw-node05 lkw-node06 lkw-node07 size=large
    ```

2.  Start the Mongodb instance 
    ```
    helm install mongo bitnami/mongodb --namespace parse -f prod/homelan/9-parse/mongo-helm-my-values.yaml --set auth.rootPassword=password
    ```
        NAME: mongo
        LAST DEPLOYED: Wed May 31 15:52:36 2023
        NAMESPACE: parse
        STATUS: deployed
        REVISION: 1
        TEST SUITE: None
        NOTES:
        CHART NAME: mongodb
        CHART VERSION: 13.13.0
        APP VERSION: 6.0.6

        ** Please be patient while the chart is being deployed **

        MongoDB&reg; can be accessed on the following DNS name(s) and ports from within your cluster:

            mongo-mongodb.parse.svc.cluster.local

        To get the root password run:

            export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace parse mongo-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)

        To connect to your database, create a MongoDB&reg; client container:

            kubectl run --namespace parse mongo-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:6.0.6-debian-11-r0 --command -- bash

        Then, run the following command:
            mongosh admin --host "mongo-mongodb" --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD

        To connect to your database from outside the cluster execute the following commands:

            kubectl port-forward --namespace parse svc/mongo-mongodb 27017:27017 &
            mongosh --host 127.0.0.1 --authenticationDatabase admin -p $MONGODB_ROOT_PASSWORD



3. Start the Parse instance 
    ```
    helm install parse bitnami/parse --namespace parse -f prod/homelan/9-parse/parse-helm-my-values.yaml
    ```

3. Start the Parse Dashboard 
    ```
    kubectl apply -f prod/homelan/9-parse/parse-dashboard-setup.yaml
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

----
# OTHER
----
