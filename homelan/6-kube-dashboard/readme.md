# [See Docs here](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)

1.  Create a user -- [see notes here](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)
    ```
    k apply -f homelan/6-kube-dashboard/service-account-user.yaml
    k apply -f homelan/6-kube-dashboard/cluster-role-binfding.yaml
    ```

2.  Get the token
    ```
    kubectl -n kubernetes-dashboard create token kirbymark
    ```


kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl proxy
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login
