## Docker Build
```
docker build --no-cache -t site-arm .
```

## Docker Run Locally
```
docker run -p 3000:3000 -it --rm --name running-site-arm site-arm 
```

Access the API at 
http://localhost:3000/status/cnn.com


## Docker Phs to Google cloud
```
docker tag site-arm us-east1-docker.pkg.dev/kirbyware-io-primary-k8/kirbyware-io-docker-store/site-arm
docker push us-east1-docker.pkg.dev/kirbyware-io-primary-k8/kirbyware-io-docker-store/site-arm
```

Image name is 
--image=us-east1-docker.pkg.dev/kirbyware-io-primary-k8/kirbyware-io-docker-store/site-arm:latest