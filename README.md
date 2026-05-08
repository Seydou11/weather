# Weather App

A small React and Vite weather app that displays the nearest city, country, temperature, and weather icon using the AirVisual API.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:

   ```bash
   VITE_WEATHER_API_KEY=your_airvisual_api_key_here
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Deployment

This project includes a GitHub Pages workflow in `.github/workflows/deploy.yml`.

Before deploying, add this repository secret on GitHub:

```bash
VITE_WEATHER_API_KEY
```

Then enable GitHub Pages with **GitHub Actions** as the source. After the workflow runs, the app URL should be:

```text
https://seydou11.github.io/weather/
```

Note: Vite variables that start with `VITE_` are included in the browser bundle. For a fully private API key, use a backend or serverless proxy.
