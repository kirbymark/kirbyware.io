# Setup our own stroage using openebs
[see guide here](https://openebs.io/docs/user-guides/cstor)

#  This is so that we dont have to use the full 40GB (minimum size) of the block provided by Vultr
#  Openebs will allow us to use the block as storage and add multiple PV to it.

1. Add the openebs operator to the cluster
   ```
   kubectl apply -f https://openebs.github.io/charts/openebs-operator.yaml
   kubectl apply -f https://openebs.github.io/charts/cstor-operator.yaml
   ```

2. Via Vultr GUI - add the block storage and attach it to a node.

3. Get the values to build the cstor pool
   ```
   kubectl get node --show-labels
   kubectl get bd -n openebs
   ```
  these values are used to create [the pool cluster manifest](./create-cstor-poolcluster.yaml)


4. Apply the cstor pool manifest
   ```
   kubectl apply -f ./prod/vultr/10-corp-apps/1-openebs/create-cstor-poolcluster.yaml
   ```

5. Check the status
   ```
   kubectl get cspc -n openebs
   kubectl get cspi -n openebs
   ```

6. Creating cStor storage classes
  ```
   kubectl apply -f ./prod/vultr/10-corp-apps/1-openebs/cstor-csi-disk.yaml
   ```

6. Confirm the storage class 
  ```
   kubectl get sc
   ```