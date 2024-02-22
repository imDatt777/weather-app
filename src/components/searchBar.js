// Importing NPM Dependencies
import React, { useState, useEffect } from "react";

// Importing Helper Methods
import {
    extractCityAndCountry,
    filterCities,
    filterOptions,
} from "../utilities/helperMethods";

// Importing Assets
import search from "../assets/search.png";

// Importing API URLs
import API_URLS from "../utilities/apiUrl";

const SearchBar = (props) => {
    const { fetchWeather = () => {}, fetchForecast = () => {} } = props;
    const [inputValue, setInputValue] = useState("");
    const [prevInputValue, setPrevInputValue] = useState("");
    const [cities, setCities] = useState([]);
    const [options, setOptions] = useState([]);
    const [showList, setShowList] = useState(false);

    /**
     * FetchCities
     *
     * @description - Method to fetch cities on user search
     * @returns {undefined}
     */
    const fetchCities = async () => {
        try {
            const response = await fetch(
                API_URLS.FETCH_CITIES_LIST(inputValue)
            );
            const data = await response.json();

            setCities(filterCities(data));
            setOptions(filterOptions(data));
            setShowList(true);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    /**
     * HandleCitySelect
     *
     * @description - Method to handle city selection done by user from dropdown
     * @param {String} option - Option selected
     * @returns {undefined}
     */
    const handleCitySelect = async (option) => {
        setInputValue(option);
        setShowList(false);

        const { city, country } = extractCityAndCountry(option);
        const selectedCityObj = options.filter(
            (item) => item.name === city && item.country === country
        );
        await fetchWeather(selectedCityObj[0]?.lat, selectedCityObj[0]?.lon);
        await fetchForecast(selectedCityObj[0]?.lat, selectedCityObj[0]?.lon);
    };

    useEffect(() => {
        if (inputValue.trim() !== "" && inputValue !== prevInputValue) {
            const delayTimer = setTimeout(() => {
                fetchCities();
                setPrevInputValue(inputValue);
            }, 500); // Adjust the delay time as needed

            return () => clearTimeout(delayTimer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, prevInputValue]);

    return (
        <div className='max-w-md mx-auto h-[200px]'>
            <div className='search relative'>
                <input
                    className={`border-none focus:outline-none py-[5px] px-[10px] w-full rounded-t-xl
                            ${!showList && "rounded-xl"}`}
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Type to search...'
                    maxLength={30}
                />
                <img
                    className='absolute h-[20px] w-[20px] top-[7px] right-[10px]'
                    src={search}
                    alt='Search'
                />
            </div>
            <ul className='bg-white rounded-b-lg'>
                {showList &&
                    cities.map((city, idx) => (
                        <li
                            className='px-[5px] cursor-pointer border-solid border-b-[1px] last:border-none'
                            key={idx}
                            onClick={handleCitySelect.bind(this, city)}
                        >
                            {city}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default SearchBar;
