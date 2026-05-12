# DataOps with JavaScript - `fetchWeather.js`


### Architecture of Application

- **Ingest**: `fetchWeather.js` (calls API, writes `data/weather.json`, appends `data/weather_log.csv`)
- **Store**: local files (JSON + CSV)
- **Serve/Visualize**: `app.js` (Express + chart generation)
- **Test**: Jest tests validate data files and schema
- **CI/CD**: GitHub Actions (`ci.yml`) to schedule fetch, run tests, commit data and trigger deploy
- **Deploy**: Render/Heroku/Docker
- This project requires `Node` version 22 or higher


## Start Point

### `fetchWeather.js`

Create a folder called `Weather-JS` and a file on our root directory called `fetchWeather.js`
- This file is a `Node.js` script that will fetch real-time weather data from an external API and save it in a `.json` and `.csv` file
- In the `.csv` file, we will save the city name, temperature, description, and timestamp — this will be used later to plot how temperature changes during the day
- Let's start by importing the libraries we need:

```js
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()
```
- `import fs from 'fs'` - **File System**: lets us read and write files, like saving `weather.json` and appending rows to `weather_log.csv`
- `import path from 'path'` - Builds file paths that work on any operating system (Windows, Mac, Linux)
- `import dotenv from 'dotenv'` - Loads our secret values (like the API key) from a `.env` file, so we never hardcode them in our script

<br>

```js
const DATA_DIR = path.join(import.meta.dirname, 'data')
fs.mkdirSync(DATA_DIR, { recursive: true })
```
- `path.join(import.meta.dirname, 'data')` - Creates the full path to a `data/` folder inside the project directory. `import.meta.dirname` gives us the folder where this file lives
- `fs.mkdirSync(DATA_DIR, { recursive: true })` - Creates the `data/` folder if it doesn't already exist. The `{ recursive: true }` option means "do nothing if the folder is already there"

<br>

```js
const WEATHER_FILE = path.join(DATA_DIR, "weather.json")
const LOG_FILE = path.join(DATA_DIR, "weather_log.csv")
```
- `WEATHER_FILE` - Full path to `data/weather.json` — where we store the latest weather snapshot
- `LOG_FILE` - Full path to `data/weather_log.csv` — where we keep a running history of all fetches

<br>

```js
export async function fetchWeather() {
  const apiKey = process.env.WEATHER_API_KEY
  const city = process.env.CITY || "London"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    
    const data = await response.json()
    const nowUTC = new Date().toISOString()
    data._last_updated_utc = nowUTC
    fs.writeFileSync(WEATHER_FILE, JSON.stringify(data, null, 2))

    if (!fs.existsSync(LOG_FILE)) {
      fs.writeFileSync(LOG_FILE, "timestamp,city,temperature,description\n")
    }

    const logEntry = `${nowUTC},${city},${data.main.temp},${data.weather[0].description}\n`
    fs.appendFileSync(LOG_FILE, logEntry)

    console.log(`✅ Weather data updated for ${city} at ${nowUTC}`)
  } catch (err) {
    console.error("❌ Error fetching weather:", err)
  }
}
```
- `response.json()` - Converts the raw API response into a JavaScript object we can work with
- `new Date().toISOString()` - Creates a timestamp like `"2025-10-09T12:34:56.789Z"` representing the current time in UTC (*Coordinated Universal Time*)
- `data._last_updated_utc = nowUTC` - Adds our timestamp directly onto the weather data object before saving it
- `fs.writeFileSync(WEATHER_FILE, JSON.stringify(data, null, 2))` - Writes the data to `weather.json`. The `null, 2` argument makes the file human-readable with indentation
- `if (!fs.existsSync(LOG_FILE))` - Checks if the CSV file exists. If it doesn't, we create it and write the header row first — this ensures the file always has the correct column names
- `logEntry` - Builds one line of CSV data: timestamp, city, temperature, and weather description
- `fs.appendFileSync(LOG_FILE, logEntry)` - Adds that line to the end of the CSV file without overwriting what's already there. This is how we build up our history of weather readings over time

<br>


Finally, we call our function so it runs when the script is executed:
```js
fetchWeather()
```
- This calls `fetchWeather()` every time the script runs — whether that's you typing `node fetchWeather.js` in the terminal, or GitHub Actions running it automatically on a schedule
- The `export` keyword on the function still lets us import it in our test file, so this simple approach works for both running and testing