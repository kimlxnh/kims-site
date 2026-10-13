# Temperature Report: JavaScript and Git Branching Exercise

## Goal

Write a JavaScript program that processes a list of daily temperatures. Use several functions to convert temperatures, classify them, and summarize the results. Call those functions in a loop.

Use Git branches to develop each feature separately, then merge all the branches into `main`.

## Problem definition

Start with this array:

    const temperaturesC = [8, 15, 24, 31, 12, 27, 19];

Your program should:

- Convert each Celsius temperature to Fahrenheit.
- Classify each Fahrenheit temperature as:
  - `cold` if it is below 50°F
  - `mild` if it is from 50°F through 75°F
  - `hot` if it is above 75°F
- Print each day’s Celsius temperature, Fahrenheit temperature, and category.
- Print a summary counting the cold, mild, and hot days.

Write the functions and decide how they work together. The steps below guide you through the Git workflow, not the implementation.

## Sample output

    Day 1: 8°C = 46.4°F — cold
    Day 2: 15°C = 59°F — mild
    Day 3: 24°C = 75.2°F — hot
    Day 4: 31°C = 87.8°F — hot
    Day 5: 12°C = 53.6°F — mild
    Day 6: 27°C = 80.6°F — hot
    Day 7: 19°C = 66.2°F — mild

    Summary:
    Cold: 1 day
    Mild: 3 days
    Hot: 3 days

## Git workflow

### 1. Create the project and make the initial commit

Create a project folder and initialize a Git repository:

    mkdir temperature-report
    cd temperature-report
    git init

Rename the current branch to `main`:

    git branch -M main

Create `temperature-report.js`. Add the starting temperature array, then save and commit the file:

    git add temperature-report.js
    git commit -m "Start temperature report"

### 2. Create and merge the conversion branch

Create a branch for the Celsius-to-Fahrenheit feature:

    git switch -c feature/conversion

Implement the conversion feature in your JavaScript file. Save your work, then commit it:

    git add temperature-report.js
    git commit -m "Add Celsius to Fahrenheit conversion"

Switch back to `main` and merge the feature branch:

    git switch main
    git merge feature/conversion

### 3. Create and merge the classification branch

Start a new branch from the updated `main`:

    git switch -c feature/classification

Implement the temperature-classification feature. Commit it:

    git add temperature-report.js
    git commit -m "Add temperature classification"

Switch back to `main` and merge the branch:

    git switch main
    git merge feature/classification

### 4. Create and merge the summary branch

Start another branch from `main`:

    git switch -c feature/summary

Implement the category-counting summary feature. Commit it:

    git add temperature-report.js
    git commit -m "Add category summary"

Switch back to `main` and merge the branch:

    git switch main
    git merge feature/summary

### 5. Create and merge the report-loop branch

Start the final feature branch from `main`:

    git switch -c feature/report-loop

Implement the loop that processes the temperatures, calls the appropriate functions, and prints the daily report and summary. Commit your changes:

    git add temperature-report.js
    git commit -m "Add daily temperature report"

Switch back to `main` and merge the branch:

    git switch main
    git merge feature/report-loop

### 6. Test the finished program

Run the program while on `main`. Check that the output matches the sample output above.

## Helpful Git checks

To see which branch you’re on:

    git branch --show-current

To see the commit history:

    git log --oneline --graph --all

To see the available branches:

    git branch

`git switch` requires Git 2.23 or newer. On older versions, use `git checkout -b <branch>` to create and switch to a branch, and `git checkout main` to switch back to `main`.
