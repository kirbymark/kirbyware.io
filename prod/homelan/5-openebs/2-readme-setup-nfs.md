# Setup OpenEBS NFS

1. Add the openebs NFS operator to the cluster
   ```
   kubectl apply -f https://openebs.github.io/charts/nfs-operator.yaml
   ```

2. create a NFS Storageclass
   ```
   kubectl apply -f homelan/5-openebs/nfs-volume.yaml
   ```

3. create a nfs-pvc
   ```
   kubectl apply -f homelan/5-openebs/nfs-pvc.yaml
   ```

4. Test the setup using [this guide](https://github.com/openebs/dynamic-nfs-provisioner/blob/develop/docs/workload/wordpress.md)
   ```
   helm install my-release -n wordpress --create-namespace \
         --set global.storageClass=openebs-rwx \
         --set wordpressUsername=admin \
         --set volumePermissions.enabled=true \
         --set wordpressPassword=password \
         --set mariadb.auth.rootPassword=secretpassword \
         --set persistence.storageClass=openebs-rwx \
         --set mariadb.primary.persistence.storageClass=openebs-rwx \
         --set persistence.accessModes={ReadWriteMany} \
         --set mariadb.volumePermissions.enabled=true \
         --set autoscaling.enabled=true \
         --set autoscaling.minReplicas=2 \
         --set autoscaling.maxReplicas=6 \
         --set autoscaling.targetCPU=80 \
         bitnami/wordpress
   ```

   output :
   ```
      NAME: my-release
      LAST DEPLOYED: Fri May 19 08:53:21 2023
      NAMESPACE: wordpress
      STATUS: deployed
      REVISION: 1
      TEST SUITE: None
      NOTES:
      CHART NAME: wordpress
      CHART VERSION: 16.1.5
      APP VERSION: 6.2.1

      ** Please be patient while the chart is being deployed **

      Your WordPress site can be accessed through the following DNS name from within your cluster:

         my-release-wordpress.wordpress.svc.cluster.local (port 80)

      To access your WordPress site from outside the cluster follow the steps below:

      1. Get the WordPress URL by running these commands:

      NOTE: It may take a few minutes for the LoadBalancer IP to be available.
            Watch the status with: 'kubectl get svc --namespace wordpress -w my-release-wordpress'

         export SERVICE_IP=$(kubectl get svc --namespace wordpress my-release-wordpress --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
         echo "WordPress URL: http://$SERVICE_IP/"
         echo "WordPress Admin URL: http://$SERVICE_IP/admin"

      2. Open a browser and access WordPress using the obtained URL.

      3. Login with the following credentials below to see your blog:

      echo Username: admin
      echo Password: $(kubectl get secret --namespace wordpress my-release-wordpress -o jsonpath="{.data.wordpress-password}" | base64 -d)
   ```

   
5. Add the ingress-route for Traefilk
   ```
   k apply -f homelan/5-openebs/test-nfs-wordpress-ingressroute.yaml
   ```