---
layout: post
title: Running CUDA models offline with Docker
---
In my research, I often have to run machine learning experiments on very sensitive data. This data lives in a protected environment, and one of the features of this environment is that it is sealed off from the internet. This makes running experiments a bit challenging.

We don't want to install a bunch of dependencies in the shared environment, since this might break other people's experiments. At the same time, it is quite difficult to create a virtual environment without internet access, since it is often quite tricky to find all the dependencies. This is an excellent use-case for Docker containers!

{% gist bdf35b5f22baf2a053fabd56e0b24ebf %}

The `Dockerfile` included above is an example of how you could create a CUDA-enabled environment that has all your Python scripts and the environment needed to run them. The model and data directories can be mounted to the container when we start it. More on that in the end of the post.

To build the Docker container, use the following command:

```
docker build . -t my-docker-container -f path/to/Dockerfile
```

Note that Docker [will not follow symlinks](https://stackoverflow.com/a/31885214/807515)! You will only be able to reference files in the current directory (note the `.` after `build`) or whichever directory you pick as the build context.

Now that the container has been built, we can save it to a gzipped file using the following command:

```
docker save my-docker-container | gzip > /path/to/my-docker-container.tar.gz
```

The container is now ready for transport! By this time I have typically saved the container to a USB flash drive which I can use to move the container to the offline server.

Before we can do this, however, we need to ensure that the server has the software required to run the docker-container. You need to have the [NVIDIA Container Toolkit](https://github.com/NVIDIA/nvidia-docker) installed on the machine. The link contains installation instructions and as far as I know, there is no way to use CUDA from the container without this toolkit.

With that sorted out, next step is to load it onto this machine using the following command:

```
docker load -i /usb/path/to/my-docker-container.tar.gz
```

A nice bonus is that Docker decompresses the file on the fly when loading it. Now, the only thing left is to actually start the container:

```
docker run --gpus all -v /path/to/data:/data -v /path/to/model:/model -it my-docker-container bash
```

Now go grab a nice cup of coffee while you wait for your experiments to run! After all, machine learning has allowed us to relive the good old days of the mainframe.

__UPDATE 2024-02-14:__ _Updated the base image in the Dockerfile since the previous one [had problems](https://github.com/NVIDIA/nvidia-container-toolkit/issues/257) with public keys. Also changed the setup to start into bash and mount the model directory when starting the docker container._