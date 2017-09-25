
A miminal file upload server, support multiple files uploading

## Install file_upload
```
$ mkdir file_upload
$ docker run --name file_upload -p 8100:3100 -v `pwd`/file_upload:/usr/src/file_upload/uploads -d weimed/file_upload:latest
```

### Build the docker image
```
$ docker build -t weimed/file_upload:latest .
```

### Check the built image(s)
```
$ docker images
# docker history weimed/file_upload:latest
```

### Push the image to Docker Hub
```
$ docker push weimed/file_upload:latest
```