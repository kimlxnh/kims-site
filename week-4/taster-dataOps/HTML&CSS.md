# DataOps with JavaScript - `index.html` & `style.css`

## Start Point

### `index.html`

- We could have run our `js` files, but without a HTML we cannot see the data in the browser...
- Start by creating a folder in the main tree called public
    - Create a `index.html` & `style.css`

<br>

- Create the HTML body and link the CSS file in the head
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <link rel="stylesheet" href="style.css">
  <title>Weather Dashboard</title>
</head>
<body>
    <div id="weather">
        <p>Loading weather data...</p>
    </div>

    <div id="plot-card">
        <div id="chart"></div>
    </div>

    <script src="/client.js"></script>
</body>
</html>
```


### `client.js`

- Let's start by creating a file inside our public folder `client.js`
- This file will have 2 functions:
  - One to load the current weather
  - One to display the chart with temperature over time

```js
async function loadWeather() {
    try {
        const res = await fetch('/api/weather')
        const weather = await res.json()

        document.getElementById('weather').innerHTML = `
            <h2>${weather.name}</h2>
            <p>Temperature: ${weather.main.temp}°C</p>
            <p>Condition: ${weather.weather[0].description}</p>
        `
    } catch (err) {
        document.getElementById('weather').innerHTML = '<p>Failed to load weather data.</p>'
        console.error(err)
    }
}

async function loadChart() {
  try {
    const res = await fetch('/api/weather-log')
    const { timestamps, temps } = await res.json()

    const trace = {
        x: timestamps,
        y: temps,
        type: 'scatter',
        mode: 'lines+markers',
        line: {
            color: 'purple'
        }
    }

    const layout = {
        title: 'Temperature Over Time',
        xaxis: { title: 'Date' , type: 'date'},
        yaxis: { title: 'Temperature (C)' },
        legend: { orientation: 'h', x: 0, y: 1.1 }
    }

    Plotly.newPlot('chart', [trace], layout)
  } catch (err) {
      console.error('Failed to load chart', err)
  }
}

loadWeather()
loadChart()
```


### `style.css`

```css
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
  background: #f7f9fb;
  color: #222;
  font-size: 20px;
}

.card {
  background: white;
  padding: 16px;
  border-radius: 8px;
}

h1 { 
    color: #053886;
}

#plot-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 500px;
  margin-top: 30px;
}
```

<br>

### Final Checks

To make sure everything is working, let's run our scripts:
- First let's install our `package.json`
  - `npm init -y`
  - Double check if you have all your libraries installed:
    ```json
    "dependencies": {
      "dotenv": "^17.2.3",
      "express": "^5.1.0"
    }
    ```
  - Add `type: "module"` after `"main": "app.js"`
- Run your scripts:
  - `node fetchWeather.js` - check the data folder that was created
  - `node app.js` - check in the browser if your graph is working