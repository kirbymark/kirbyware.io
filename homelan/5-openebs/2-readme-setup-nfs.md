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
         --set wordpressPassword=password \
         --set mariadb.auth.rootPassword=secretpassword \
         --set persistence.storageClass=openebs-rwx \
         --set mariadb.primary.persistence.storageClass=openebs-rwx \
         --set persistence.accessModes={ReadWriteMany} \
         --set volumePermissions.enabled=true \
         --set autoscaling.enabled=true \
         --set autoscaling.minReplicas=2 \
         --set autoscaling.maxReplicas=6 \
         --set autoscaling.targetCPU=80 \
         bitnami/wordpress
   ```