// Importing
import storm from "../assets/storm.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import haze from "../assets/haze.png";

/**
 * GetWeatherCondition
 *
 * @description Method to determine overall weather condition based on descriptions
 * @param {String | Array} descriptions - Weather description
 * @returns {Object}
 */
export const getWeatherCondition = (descriptions) => {
    // If descriptions is an array, check each description
    if (Array.isArray(descriptions)) {
        if (descriptions.some((desc) => desc.includes("thunderstorm"))) {
            return { condition: "Thunderstorm", imgSrc: storm };
        } else if (
            descriptions.some((desc) => desc.includes("drizzle")) ||
            descriptions.some((desc) => desc.includes("rain"))
        ) {
            return { condition: "Rainy", imgSrc: rain };
        } else if (descriptions.some((desc) => desc.includes("snow"))) {
            return { condition: "Snowy", imgSrc: snow };
        } else if (descriptions.some((desc) => desc.includes("clear"))) {
            return { condition: "Clear", imgSrc: clear };
        } else if (descriptions.some((desc) => desc.includes("cloud"))) {
            return { condition: "Cloudy", imgSrc: cloud };
        } else if (descriptions.some((desc) => desc.includes("haze"))) {
            return { condition: "Haze", imgSrc: haze };
        } else {
            return "Unknown";
        }
    } else {
        // If descriptions is a string, check the single description
        if (descriptions.includes("thunderstorm")) {
            return { condition: "Thunderstorm", imgSrc: storm };
        } else if (
            descriptions.includes("drizzle") ||
            descriptions.includes("rain")
        ) {
            return { condition: "Rainy", imgSrc: rain };
        } else if (descriptions.includes("snow")) {
            return { condition: "Snowy", imgSrc: snow };
        } else if (descriptions.includes("clear")) {
            return { condition: "Clear", imgSrc: clear };
        } else if (descriptions.includes("cloud")) {
            return { condition: "Cloudy", imgSrc: cloud };
        } else if (descriptions.includes("haze")) {
            return { condition: "Haze", imgSrc: haze };
        } else {
            return "Unknown";
        }
    }
};

/**
 * GetDateAndTime
 *
 * @description - Method to get date and time from timestamp and timezone
 * @param {Number} timestamp - Timestamp
 * @param {Number} timezone - Timezone
 * @returns {Object}
 */
export const getDateAndTime = (timestamp, timezone) => {
    // Convert timestamp to milliseconds and adjust for timezone offset
    const date = new Date((timestamp + timezone) * 1000);

    // Get day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dayOfWeekIndex = date.getUTCDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];

    // Get date, month, year
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    const day = date.getUTCDate();

    // Get hours, minutes, seconds
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return {
        date: `${day} ${monthsOfYear[month - 1]} ${year}`,
        time: `${hours}:${minutes}:${seconds}`,
        day: `${dayOfWeek}`,
    };
};

/**
 * FormatDate
 *
 * @description - Method to format a date string into Day and Month format
 * @param {String} dateString - Date string to format
 * @returns {String}
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const [day, month] = formattedDate.split(" ");
    return `${day} ${month}`;
};

/**
 * FormatForecastData
 *
 * @description - Method to format forecast data into desired format
 * @param {Object} forecast - Forecast Response object
 * @returns {Object}
 */
export const formatForecastData = (forecast) => {
    const groupedByDate = forecast.list.reduce((acc, forecastItem) => {
        const date = forecastItem.dt_txt.split(" ")[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(forecastItem);
        return acc;
    }, {});

    const dailyDataArray = Object.keys(groupedByDate).map((date) => {
        const temperatures = groupedByDate[date].map((item) => item.main.temp);
        const minTemp = Math.min(...temperatures);
        const maxTemp = Math.max(...temperatures);

        const weatherDescriptions = groupedByDate[date].map((item) =>
            item.weather[0].description.toLowerCase()
        );
        const conditions = getWeatherCondition(weatherDescriptions);

        return {
            date,
            minTemp,
            maxTemp,
            conditions,
        };
    });

    return dailyDataArray;
};

/**
 * FilterOptions
 *
 * @description - Method to filter options into desired data
 * @param {Array} data - Data Array
 * @returns {Array}
 */
export const filterOptions = (data) => {
    const filteredData = data.map(({ name, lat, lon, country }) => ({
        name,
        lat,
        lon,
        country,
    }));

    return filteredData;
};

/**
 * FilterCities
 *
 * @description - Method to filter cities from response
 * @param {Array} data - Data Array
 * @returns
 */
export const filterCities = (data) => {
    const cities = data.map((item) => `${item.name}, ${item.country}`);
    return cities;
};

/**
 * ExtractCityAndCountry
 *
 * @description - Method to extract city and country from location string
 * @param {String} locationString
 * @returns {undefined}
 */
export const extractCityAndCountry = (locationString) => {
    const [city, country] = locationString
        .split(",")
        .map((item) => item.trim());
    return { city, country };
};
