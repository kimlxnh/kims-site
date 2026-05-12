# DataOps in JavaScript

## `.env` & `.ignore`

### What is `.env` and `.gitignore` & Why We Need Them

- `.env` file
    - A file to store secrets and configuration (like API keys, passwords, etc)
    - Keeps sensitive data out of your code so it doesn’t get pushed to GitHub
- `.gitignore` file
    - A file that tells Git which files or folders not to track in Git
    - Prevents unnecessary files (like installed packages or local secrets) from being pushed

### Why They Are Important in DataOps

- **Protect sensitive data**
    - DataOps projects often connect to APIs or databases. `.env` keeps keys safe
- **Keep repos clean and lightweight**
    - `.gitignore` prevents large or unnecessary files from cluttering your repository
-** Maintain reproducibility and security**
    - Ensures pipelines and workflows run safely across environments

### How to Create the Files
1. Create `.env`
- Make a file named `.env` in your project folder
- Add your secrets inside, for example:
    - `WEATHER_API_KEY=your_api_key_here`
    - `CITY=London`
2. Create `.gitignore`
- Make a file named `.gitignore` in your project folder
- Add files/folders to exclude from Git, for example:
    - `.env` → keeps secrets private
    - `node_modules` → prevents pushing all installed packages

> `.env` keeps your secrets safe, `.gitignore` keeps your repo clean, and both are essential for secure and efficient DataOps workflows

<br>

## GitHub

### Create a new repository on GitHub

- On GitHub:
    - click New repository
    - give it a name (e.g., weather-pipeline)
    - choose public/private
    - **do not** initialize with a README if you already have a local project
- Copy the repository URL (HTTPS or SSH)
- Make sure your terminal in running in your project folder
    - `pwd`

```git
git init
```
- Initialise Git locally

<br>

```git
git add .
git commit -m "initial commit"
```
- Stage files and make the first commit

<br>

```git
git remote add origin git@github.com:your-username/weather-pipeline.git
git branch -M main
git push -u origin main
```
- Add the GitHub remote and push

<br>

Verify your repo on GitHub
- Open the repo page — your files should be visible
- On `GitHub > Actions` you’ll see that nothing has happened

<br>

### Add GitHub Secrets (required for your workflow)

- In your GitHub repo: Settings → Secrets and variables → Actions → New repository secret
- Add `WEATHER_API_KEY`, `CITY`, and `RENDER_DEPLOY_HOOK`. Values are hidden and secure


<br>

## Deployment

### Create a Render Account and Service

- Go to Render and sign up or log in
- Connect your GitHub account to Render when prompted
- Click **New Web Service** (or “Web Service” depending on your project type) or **Create new project**
- Select the repository you want to deploy (your Weather Pipeline project)
- Render will try to deploy and you may get an error, but that's okay

### Get the Deploy Hook URL from Render

- Go to **Settings** in the project
- Look for Deploy Hooks or Manual Deploy URL
- Copy the unique URL provided — this is your deploy hook

### Add the Deploy Hook as a GitHub Secret

- In your GitHub repository, go to Settings → Secrets and Variables → Actions → New repository secret
- Name the secret something like `RENDER_DEPLOY_HOOK`
- Paste the deploy hook URL from Render into the secret value
- Save the secret
> This ensures the URL is kept secure and isn’t exposed in your workflow

### Test the Deployment

- Push a change to your GitHub repo (or manually trigger the workflow)
- Check the Actions tab in GitHub to ensure the workflow runs successfully
- Go to your Render service to see the updated deployment live
> Your workflow sends a signal to Render via the deploy hook, and Render automatically deploys your app, keeping it up-to-date whenever your pipeline runs