import { useEffect, useState } from "react";
import loader from "./assets/loader.svg";
import browser from "./assets/browser.svg";
import "./App.css";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    if (!API_KEY) {
      setErrorInfo("Missing weather API key.");
      return;
    }

    fetch(`https://api.airvisual.com/v2/nearest_city?key=${API_KEY}`)
      .then((response) => {
        // 400-499: error from the client,
        // 500-599: error from the server
        if (!response.ok) {
          throw new Error(`Error: ${response.status}, ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData({
          city: data.data.city,
          country: data.data.country,
          temperature: data.data.current.weather.tp,
          weatherIcon: data.data.current.weather.ic,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setErrorInfo(error.message);
      });
  }, []);
  // The loader will be shown when both weatherData and errorInfo are null.
  return (
    <main>
      <div
        className={`loader-container ${!weatherData && !errorInfo && "active"}`}
      >
        <img src={loader} alt="loading icon" />
      </div>
      {weatherData && (
        <>
          <p className="city-name">{weatherData?.city}</p>
          <p className="country-name">{weatherData?.country}</p>
          <p className="temperature">
            {weatherData?.temperature}
            {"\u00b0C"}
          </p>
          <div className="info-icon-container">
            <img
              src={`${import.meta.env.BASE_URL}icons/${weatherData?.weatherIcon}.svg`}
              className="info-icon"
              alt="weather icon"
            />
          </div>
        </>
      )}

      {errorInfo && !weatherData && (
        <>
          <p className="error-message">{errorInfo}</p>
          <img src={browser} alt="error icon" />
        </>
      )}
    </main>
  );
}

export default App;
