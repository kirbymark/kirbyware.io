# my Parse Backend Setup

1.  Create namespace
    ```
    kubectl apply -f prod/homelan/9-parse/namespace.yaml
    ```

2.  Start the Mongodb instance 
    ```
    helm install mongo bitnami/mongodb --namespace parse -f prod/homelan/9-parse/mongo-helm-my-values.yaml
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


3. Create Mongo database and user
   Need to create the database and user
    ```
    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace parse mongo-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)
    kubectl run --namespace parse mongo-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=superpassword" --image docker.io/bitnami/mongodb:6.0.6-debian-11-r0 --command -- bash
    mongosh admin --host "mongo-mongodb" --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD

    use parse
    db.createUser(
    {
        user: "user",
        pwd: "password",  // Or  "<cleartext password>"
        roles: [ "readWrite", "dbAdmin" ]
    }
    )
    exit
    exit
    ```

Another way to create the database and user - using init scripts -- I have not tried this yet
my_init_script.sh: | 
  #!/bin/bash 
  echo "Create Database and Relative Users." 
  #Create New Users echo 'db.createUser({user:"${dbUser}",pwd:"${dbPassword}",roles:[{role:"dbAdmin", db:"${dbName}"}]});'> /tmp/crtuser.js 
  chmod 755 /tmp/crtuser.js 
  mongo admin -u 'root' -p '${rootPassword}' /tmp/crtuser.js 
  #Insert Test Data 
  echo 'db.${dbName}.insert({test:"ok",status:"success"});'> /tmp/insinfo.js 
  chmod 755 /tmp/insinfo.js 
  mongo ${dbName} -u '${dbUser}' -p '${dbPassword}' /tmp/insinfo.js

4. create the Parse Server
    ```
    cypher_inplace parse-server-secrets.yaml 
    kubectl apply -f prod/homelan/9-parse/parse-server-secrets.yaml
    kubectl apply -f prod/homelan/9-parse/parse-server-setup.yaml
    ```

5. check the parse server is running
    ```
    kubectl -n parse get all
    kubectl -n parse logs parse-server-59ddbf7b84-xf74x

    kubectl -n parse logs parse-server-59ddbf7b84-xf74x
    curl -X POST \
        -H "X-Parse-Application-Id: myappID" \
        -H "Content-Type: application/json" \
        -d '{"score":1344,"playerName":"Sean Plott","cheatMode":false}' \
        https://parse.kirbyware.com/parse/classes/GameScore
    ```


6. create the Parse dashboard
    ```
    kubectl apply -f prod/homelan/9-parse/parse-dashboard-setup.yaml
    ```

7.  Setup ingressroute 

    7.1 Add needed aliases to the pfSense DNS resolver

    7.2 Apply the ingress routes
    ```
    kubectl apply -f prod/homelan/9-parse/ingress-route-tls.yaml
    ```

8.  Test Connection to services
    
    8.1 Test Mongo connection via local port forwarding
    ```
    kubectl port-forward --namespace parse svc/mongo-mongodb 27017:27017
    mongosh admin --host "localhost" --authenticationDatabase admin -u root -p superpassword
    ```

    8.2 Test Parse Server Connection via ingress route
    ```
    curl -X POST \
        -H "X-Parse-Application-Id: YourAppId" \
        -H "Content-Type: application/json" \
        -d '{"score":1344,"playerName":"Sean Plott","cheatMode":false}' \
        https://parse.kirbyware.com/parse/classes/GameScore

        curl -X GET \
        -H "X-Parse-Application-Id: YourAppId" \
        https://parse.kirbyware.com/parse/classes/GameScore
    ```




    8.3 Test Parse Dashboard Connection via ingress route
    ```
    curl https://parse-ui.kirbyware.com/
    ```


    8.4 Access the dashboard
    ```
    https://parse-ui.kirbyware.com/
    ```




----
# Cleanup
----
Cleanup all resources
```

```


----
# OTHER
----
