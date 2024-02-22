// Importing API KEY
import { API_KEY } from "./appConfig";

const API_URLS = {
    FETCH_CURRENT_WEATHER: (lat, long) =>
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`,
    FETCH_FORECAST_DETAILS: (lat, long) =>
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`,
    FETCH_CITIES_LIST: (searchValue) =>
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${API_KEY}`,
};

export default API_URLS;
