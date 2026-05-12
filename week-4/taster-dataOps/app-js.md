# DataOps with JavaScript - `app.js`

### Architecture of Application

- **Ingest**: `fetchWeather.js` (calls API, writes `data/weather.json`, appends `data/weather_log.csv`)
- **Store**: local files (JSON + CSV)
- **Serve/Visualize**: `app.js` (Express + chart generation)
- **Test**: Jest tests validate data files and schema
- **CI/CD**: GitHub Actions (`ci.yml`) to schedule fetch, run tests, commit data and trigger deploy
- **Deploy**: Render/Heroku/Docker


## Start Point

### `app.js`

- In our root directory, same place as `fetchWeather.js`, create a file called `app.js`
- This file runs our web server and exposes the weather data to the browser
- Let's start with our imports:

```js
import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 5000

const DATA_DIR = path.join(import.meta.dirname, 'data')
const WEATHER_FILE = path.join(DATA_DIR, "weather.json")
const LOG_FILE = path.join(DATA_DIR, "weather_log.csv")

app.use(express.static(path.join(import.meta.dirname, 'public')))

app.get("/api/weather", (req, res) => {
  try {
    const weatherData = JSON.parse(fs.readFileSync(WEATHER_FILE, "utf-8"))
    res.json(weatherData)
  } catch {
    res.status(404).json({ error: "No weather data available" })
  }
})

app.get('/api/weather-log', (req, res) => {
  try {
    const lines = fs.readFileSync(LOG_FILE, 'utf-8').trim().split('\n')
    const ts = []
    const temps = []

    for (const line of lines.slice(1)) {
      const [timestamp, , temperature] = line.split(',')
      if (timestamp && temperature) {
        ts.push(timestamp)
        temps.push(parseFloat(temperature))
      }
    }

    res.json({ ts, temps })
  } catch {
    res.status(404).json({ error: 'No weather log available' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`)
})
```

`DATA_DIR`, `WEATHER_FILE`, `LOG_FILE`:
  - The same file path constants as in `fetchWeather.js` — each script runs independently, so each one needs to know where the data files live
      - `fetchWeather.js` **writes** to these files
      - `app.js` **reads** from these files

`app.use()`:
  - Tells Express to automatically serve everything inside the `public/` folder (our `index.html`, `style.css`, and `client.js`) directly to the browser
  - Without this, the browser wouldn't be able to load our frontend
