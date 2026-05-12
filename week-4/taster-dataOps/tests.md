# DataOps with JavaScript - `weather.test.js`

## Why tests are important for DataOps Pipeline

1. **Verify data existence**
    - `weather.json` and `weather_log.csv` must exist
    - **Why**: If the files don’t exist, your pipeline has already failed at the ingestion stage
    - This prevents downstream errors (e.g., chart generation or front-end display)

2. **Ensure JSON structure is correct**
    - Checks that `weather.json` has all required keys (`main`, `weather`, `_last_updated_utc`) and valid `timestamp`
    - **Why**: Consistent data schema is critical. If keys are missing or malformed, charts or APIs will break

3. **Check CSV log integrity**
    - Confirms the CSV file exists, has a proper header, contains at least one row, and that numeric fields are valid
    - **Why**: The CSV is used for historical plots and trends. Any corruption or missing data could break visualizations or analysis

4. **Automate quality assurance**
    - Running these tests in CI/CD ensures that data quality issues are caught automatically before committing or deploying
    - **Why**: In a DataOps workflow, you want reliable, predictable pipelines that don’t silently fail

<br>

- These tests are your first line of defense in the DataOps pipeline
- They make sure that the data you fetch, log, and visualize is present, structured correctly, and usable, keeping your pipeline robust and trustworthy

<br>

- On the root directory create a folder `tests`
  - Create a file `weather.test.js`
- We will start with imports for file handling and directory paths for our tests

```js
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const JSON_FILE = path.join(DATA_DIR, "weather.json");
const CSV_FILE = path.join(DATA_DIR, "weather_log.csv");

describe("Weather Data Tests", () => {
  test("weather.json exists", () => {
    expect(fs.existsSync(JSON_FILE)).toBe(true);
  });

  test("weather.json has required keys", () => {
    const raw = fs.readFileSync(JSON_FILE, "utf8");
    expect(raw.trim().length).toBeGreaterThan(0);

    const data = JSON.parse(raw);
    expect(data).toHaveProperty("main");
    expect(data).toHaveProperty("weather");
    expect(data.weather[0]).toHaveProperty("description");
    expect(data).toHaveProperty("_last_updated_utc");

    expect(new Date(data._last_updated_utc).toISOString()).toBe(data._last_updated_utc);
  });

  test("CSV log exists and has header", () => {
    expect(fs.existsSync(CSV_FILE)).toBe(true);

    const csvContent = fs.readFileSync(CSV_FILE, "utf8");
    const lines = csvContent.trim().split("\n");
    const header = lines[0].split(",");
    expect(header).toEqual(["timestamp", "city", "temperature", "description"]);

    expect(lines.length).toBeGreaterThan(1);

    const firstDataRow = lines[1].split(",");
    expect(!isNaN(parseFloat(firstDataRow[2]))).toBe(true);
  });
})
```

- Install `jest` as a Dev Dependency
- Create a script on `package.json`
  - `"test": "jest --watchAll --verbose"`
- Run: `node run test`