# DataOps with JavaScript - `ci.yml`

Let's create our first GitHub Actions...

<br>

On your root directory:
- create a folder called: `.github/workflows`
- inside it, create a file called: `ci.yml`

<br>

On our `yml` file, let's write:
```yml
name: Weather Pipeline CI/CD (JS)
```
- This line gives a name to your workflow
- It’s just for humans — so you and your team can easily identify this workflow in GitHub Actions

<br>

```yml
on:
  push:
  schedule:
    - cron: "0 */2 * * *"
  workflow_dispatch:
```
This section tells GitHub when to run the workflow. Here we have three triggers:
- `push` → Runs the workflow automatically every time you push changes to your repository
- `schedule` → Runs the workflow on a timer
- `cron` → Runs the workflow every 2 hours
- `workflow_dispatch` → Lets you manually trigger the workflow from GitHub, anytime you want

<br>

```yml
permissions:
  contents: write
```
- This gives the workflow permission to modify your repository’s files
- Without this, the workflow wouldn’t be able to commit updated weather data back to your repo

<br>

```yml
jobs:
  test_and_fetch:
    runs-on: ubuntu-latest
    steps:
    {...}
```
- `jobs` - This section defines all the tasks your workflow will run
- `test_and_fetch`
    - This is the name of a specific job
    - In your workflow, this job will:
        - Fetch the latest weather data
        - Run tests
        - Commit updates if needed
        - Optionally trigger deployment
- `runs-on` - This tells GitHub to run the job on a virtual machine using the latest version of Ubuntu Linux. It’s basically the “computer” that executes all the steps in your job
- `steps` - This is the list of individual actions the job will perform, in order

<br>

Let's have a look at the steps:
```yml
{...}
# inside steps
- name: Checkout repo
    uses: actions/checkout@v4
```
- `name` - This is just a label for the step so you know what it does in the workflow
- `uses`:
    - This tells GitHub Actions to use a prebuilt action that checks out your repository’s code onto the virtual machine
    - It makes a copy of your project files available for the workflow to work with
    - Without this step, your workflow wouldn’t have access to your code, so nothing else could run
- `actions` - is the GitHub organization or publisher that created the action
- `checkout` - is the name of the action itself
- `@v4` - is the version of that action

<br>

```yml
- name: Use Node.js
    uses: actions/setup-node@v4
    with:
        node-version: "22"
```
- `name` - label of the step
- `uses: actions/setup-node@v4` - This tells GitHub Actions to use a prebuilt action called *setup-node* (from the actions organization) that installs `Node.js` on the virtual machine
- `with` - This specifies which version of `Node.js` to install. In this case, it will install `Node.js` version 18, so your workflow runs with the correct environment for your project
> This step sets up `Node.js` on the machine so your workflow can run JavaScript scripts and commands

<br>

```yml
- name: Cache Node modules
    uses: actions/cache@v3
    with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
```
- `uses: actions/cache@v3` - This tells GitHub Actions to use a prebuilt caching action that can save and reuse files between workflow runs
- `path: ~/.npm` → This tells the action what to cache. Here, it’s caching the folder where `Node.js` stores installed packages (*Node modules*)
- `key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}` → This creates a unique key for the cache
    - It ensures the cache is reused only if the `package-lock.json` file hasn’t changed
    - If the dependencies change, a new cache is created automatically
> This step saves your `Node.js` packages so the workflow doesn’t have to reinstall them every time, making the workflow faster and more efficient

<br>

```yml
- name: Install dependencies
    run: npm ci
```
- This tells GitHub Actions to install all the `Node.js` dependencies listed in your `package-lock.json` file
    - `npm ci` is slightly different from `npm install`:
        - It installs exactly the versions listed in `package-lock.json` for consistency
        - It’s faster and more reliable for automated workflows
> This step installs all the Node.js packages your project needs to run and test

<br>

```yml
- name: Fetch latest weather
    env:
        WEATHER_API_KEY: ${{ secrets.WEATHER_API_KEY }}
        WEATHER_CITY:   ${{ secrets.CITY }}
    run: node fetchWeather.js
```
- `env` - your environment variables
    - `WEATHER_API_KEY` and `WEATHER_CITY` are environment variables
    - They provide sensitive information or configuration your script needs, without hardcoding it in your code
    - `${{ secrets.WEATHER_API_KEY }}` and `${{ secrets.CITY }}` come from GitHub Secrets, which keeps your API keys and other sensitive data secure
- `run: node fetchWeather.js`
    - This runs your JavaScript script `fetchWeather.js` on the virtual machine
    - The script uses the environment variables to fetch the latest weather data from the API
> This step fetches the latest weather data automatically, using secure API keys and city information stored in GitHub Secrets

<br>

This step commits and pushes updated weather data back to GitHub repo automatically
```yml
- name: Commit weather data if changed
    run: |
        git config user.name "github-actions[bot]"
        git config user.email "github-actions[bot]@users.noreply.github.com"
        git add data/weather.json data/weather_log.csv || true
        git commit -m "ci: update weather data" || echo "No changes to commit"
        git push || echo "Push failed or no changes"
```
- **Set Git user info**
    - `git config user.name` and `git config user.email` give Git a user identity so the commit has an author
    - Here, it uses a bot identity (`github-actions[bot]`)
- **Stage the files**
    - `git add data/weather.json data/weather_log.csv` tells Git which files to track for changes
- **Commit the changes**
    - `git commit -m "ci: update weather data"` creates a commit if there are any changes
    - If there are no changes, it prints "No changes to commit" instead of failing
- **Push to GitHub**
    - `git push` uploads the commit to your repository
    - If there’s nothing to push, it prints "Push failed or no changes" without breaking the workflow
> This step automatically saves and uploads any updated weather data to your GitHub repo, keeping your data fresh without manual work

<br>

This final step triggers a deployment to Render (your hosting service) if a deploy hook is set (if time)
```yml
- name: Trigger Render Deploy†
    run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```
- `run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}`
    - This sends a POST request to Render’s deploy URL, triggering a new deployment of your project automatically
> This step automatically deploys your updated **weather app** to Render whenever there’s new data, but only if a deploy hook is set in your secrets

<br>

Full `yml` file (be careful with indentation):
```yml
name: Weather Pipeline CI/CD (JS)

on:
  push:
  schedule:
    - cron: "0 */2 * * *"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  test_and_fetch:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4
      - name: Use node.JS
        uses: actions/setup-node@v4
        with:
          node-version: "22"
      - name: Cache Node modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
      - name: Install Dependencies
        run: npm ci
      - name: Fetch Latest Weather
        env:
          WEATHER_API_KEY: ${{ secrets.WEATHER_API_KEY }}
          CITY: ${{ secrets.CITY }}
          PORT: ${{ secrets.PORT }}
        run: node fetchWeather.js
      - name: Commit weather data if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/weather.json data/weather_log.csv || true
          git commit -m "ci: update weather data" || echo "No changed to commit"
          git push || echo "Push failed or no changes"
      - name: Trigger Render Deploy
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```