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


# More advanced version of dashboard

https://artifacthub.io/packages/helm/k8s-dashboard/kubernetes-dashboard

1.  Via helm
    ```
    helm install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard -n kubernetes-dashboard --create-namespace -f homelan/6-kube-dashboard/dashboard-my-values.yaml 
    ```
2. Add ingress route
   ```
   kubectl apply -f homelan/6-kube-dashboard/dashboard-ingressroute.yaml
   ```
   Note:  We are going to all local routing using  [pfSense's DNS resolver\(http://10.255.100.1/services_unbound.php).   
   Will add an entry for the LKW cluster ingress which is 10.200.10.1 and then all the aliases.   Create an alias for k8-dash.kirbyware.com and then use this in the ingress route
   



## Notes:   had to set the serverTLSBootstrap: true fopr metrics.  Will need to do this on the node08->

[see guide here](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/#kubelet-serving-certs)

1. Edit the configmap using 
    ```
    k edit configmap kubelet-config -n kube-system
    ```

2. Update each kubelet on nodes adding this serverTLSBootstrap: true
    ```
    ssh kirbymark@lkw-node04.local.kirbyware.com
    sudo vi /var/lib/kubelet/config.yaml && sudo systemctl restart kubelet && exit
    ```

3. Approve the requests
    ```
    kubectl get csr
    kubectl certificate approve csr-bppxd
    ```

4. Manually View the dashbaord via from local machine
    ```    
    kubectl -n kubernetes-dashboard create token kirbymark
    export POD_NAME=$(kubectl get pods -n kubernetes-dashboard -l "app.kubernetes.io/name=kubernetes-dashboard,app.kubernetes.io/instance=kubernetes-dashboard" -o jsonpath="{.items[0].metadata.name}")
    echo http://127.0.0.1:9090/
    kubectl -n kubernetes-dashboard port-forward $POD_NAME 9090:9090
    ```