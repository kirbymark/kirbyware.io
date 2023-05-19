# Setup OpenEBS

1. Add the openebs operator to the cluster
   ```
   kubectl apply -f https://openebs.github.io/charts/openebs-operator.yaml
   kubectl apply -f https://openebs.github.io/charts/cstor-operator.yaml
   ```

2. Attached disks to the nodes via XOA

3. use openebsctl to build the pool cluster manifest
   3.1 [install krew](https://krew.sigs.k8s.io/docs/user-guide/setup/install/#bash)

   3.2 install the openebsctl via
      ```
      kubectl krew install openebs
      ```

   3.3 Generate the [the cstor pool cluster manifest](./create-cstor-poolcluster.yaml) using the tool
      ```
      kubectl openebs generate cspc --nodes=lkw-node00,lkw-node01,lkw-node02,lkw-node03
      ```
   
4. Apply the cstor pool manifest
      ```
      kubectl apply -f prod/homelan/5-openebs/create-cstor-poolcluster.yaml
      ```

5. Check the status
   ```
   kubectl get cspc -n openebs
   kubectl get cspi -n openebs
   ```

6. Creating cStor storage classes
   ```
   kubectl apply -f prod/homelan/5-openebs/cstor-csi-disk.yaml
   ```

7. Confirm the storage class 
   ```
   kubectl get sc
   ```

8. Create PVC for sample app
   ```
   kubectl apply -f prod/homelan/5-openebs/sample-app-pvc.yaml
   ```    

8. Create the app
   ```
   kubectl apply -f prod/homelan/5-openebs/sample-app.yaml
   ```    

9. Check the outpu
   ```
   kubectl get pods
   kubectl exec -it busybox -- cat /mnt/openebs-csi/date.txt

   ```    
