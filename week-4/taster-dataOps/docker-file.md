# DataOps with JavaScript - `Dockerfile`

- Create a `Dockerfile` on the root directory
- This Dockerfile defines how to package and run your JavaScript DataOps project inside a lightweight, isolated environment — a Docker container
- Each line is an instruction that helps Docker build that container step by step

```docker
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=5000
CMD ["node", "app.js"] 
```

- `FROM node:22-slim`
    - **What it is**: Uses a small official `Node.js 22` image as the base
    - **Why we need it**: Gives your app a preinstalled Node environment, so you don’t have to manually install Node inside the container
- `WORKDIR /app`
    - **What it is**: Sets `/app` as the working directory inside the container
    - **Why we need it**: Keeps all your app’s files organized in one place inside the container
- `COPY package*.json ./`
    - **What it is**: Copies only the package files into the container
    - **Why we need it**: Lets Docker install dependencies before copying the rest of the code, speeding up rebuilds by using cached layers
- `RUN npm ci`
    - **What it is**: Installs your app’s dependencies exactly as listed in `package-lock.json`
    - **Why we need it**: Ensures clean, reproducible installs — important for stable DataOps pipelines
- `COPY . .`
    - **What it is**: Copies all your project files into the container
    - **Why we need it**: Adds your app’s code so it can run inside the environment
- `ENV PORT=5000`
    - **What it is**: Sets a default environment variable for the port number
    - **Why we need it**: Lets you easily configure which port the app runs on, helpful for deployment and CI setups
- `CMD ["node", "app.js"]`
    - They must be inside `""`
    - **What it is**: Defines the command to start your app when the container runs
    - **Why we need it**: This is the entry point of your DataOps pipeline, it launches your *Express* server (`app.js`)

### How to run

`docker build -t <app-name>:<tag> .` or `docker build -t weatherapp .`
- `docker build` → tells Docker to create an image from a Dockerfile
- `-t` → means tag, which lets you name the image
- `weatherApp` → the name given to the image
- `.` → tells Docker to use the current folder as the build context (where the Dockerfile and app files are)
- What this does:
    - Reads the Dockerfile
    - Installs dependencies
    - Packages your app
    - Creates an image called `weatherapp`

<br>

`docker run -p <local-port>:<container-port> <image-name>` or `docker run -p 5000:5000 weatherApp`
- `docker run` → starts a container from an image
- `-p` → maps a port from your computer to a port inside the container
- `5000` → the port on your computer you will use to access the app
- `5000` → the port the app is using inside the container
- `weatherApp` → the Docker image used to create and run the container
- We need this command to create a *container* based on the *image*, so we can have the app up and running

---

- Open `Docker app`
- In you terminal type ` docker ps`
    - This command lists all the running containers
- Or `docker image ls`
    - This lists all the images that you have on your machine
- Inside the application directory run:
    - `docker build`
    - `docker image ls` and look for the image you just created
    - `docker run`
    - `docker ps` will show the container running
    - `docker container stop <container-name>` to stop the container
    - `docker image rm <image-name>` to delete the image