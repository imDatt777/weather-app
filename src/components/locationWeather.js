// Importing NPM Dependencies
import React, { useState, useEffect } from "react";

// Importing Components
import Forecast from "./forecast";
import CurrentWeather from "./currentWeather";
import SearchBar from "./searchBar";
import Loader from "./loader";

// Importing Helper Method
import { formatForecastData } from "../utilities/helperMethods";

// Importing API URLs
import API_URLS from "../utilities/apiUrl";

const LocationWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [forecastData, setforecastData] = useState([]);
    const [forecast, setForecast] = useState(null);

    /**
     * FetchWeather
     *
     * @description - Method to fetch current weather data
     * @param {Number} latitude - Latitude
     * @param {Number} longitude - Longitude
     * @returns {undefined}
     */
    const fetchWeather = async (latitude, longitude) => {
        setLoading(true);
        try {
            const response = await fetch(
                API_URLS.FETCH_CURRENT_WEATHER(latitude, longitude)
            );
            const data = await response.json();
            setCurrentWeather(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setLoading(false);
        }
    };

    /**
     * FetchForecast
     *
     * @description - Method to fetch forecast details
     * @param {Number} latitude - Latitude
     * @param {Number} longitude - Longitude
     * @returns {undefined}
     */
    const fetchForecast = async (latitude, longitude) => {
        setLoading(true);
        try {
            const response = await fetch(
                API_URLS.FETCH_FORECAST_DETAILS(latitude, longitude)
            );
            const data = await response.json();
            setForecast(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching forecast data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch current weather for the user's current location
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
            fetchForecast(latitude, longitude);
        });
    }, []);

    useEffect(() => {
        if (forecast) {
            setforecastData(formatForecastData(forecast));
        }
    }, [forecast]);

    return (
        <div className='bg-[#202124] p-[20px] tablet:p-[50px] h-[100vh]'>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {currentWeather && (
                        <div>
                            <SearchBar
                                {...{
                                    setCurrentWeather,
                                    fetchWeather,
                                    fetchForecast,
                                }}
                            />
                            <h3 className='text-center text-white text-[20px] font-bold'>
                                Current Weather
                            </h3>
                            <CurrentWeather
                                {...{
                                    currentWeather,
                                }}
                            />
                            <h3 className='text-center text-white text-[20px] font-bold mt-[20px] tablet:mt-[40px]'>
                                Weather Forecast
                            </h3>
                            <Forecast
                                {...{
                                    forecastData,
                                    currentWeather,
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LocationWeather;
