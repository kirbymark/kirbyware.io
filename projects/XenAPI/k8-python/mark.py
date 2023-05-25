
from kubernetes import client, config

config.load_kube_config()
v1 = client.CoreV1Api()
output = v1.list_node()
output2 = v1.list_namespace()

print(output2)