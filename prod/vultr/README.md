## Connect to Vultr K8s cluster

1. Go to the vultr cluster webpage
[Here](https://my.vultr.com/kubernetes/)

2. Download the config file and place config in ~/.kube
```
❯ pwd
/home/kirbymark/.kube
❯ ls -la
drwxr-x---    - kirbymark 10 May 18:29  cache
.rw-r--r-- 6.1k kirbymark 10 May 18:14  vke-config.yaml
```

3. set the kube config
```
export KUBECONFIG=~/.kube/vke-config.yaml
```

4. confirm can talk to the nodes
```
kubectl get nodes
```