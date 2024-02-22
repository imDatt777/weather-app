// Importing NPM Dependencies
import React from "react";

// Importing Helper Method
import { formatDate, getDateAndTime } from "../utilities/helperMethods";

const Forecast = (props) => {
    const { forecastData = [], currentWeather = {} } = props;

    /**
     * ActiveDay
     *
     * @description - Method to get active day from the forecast
     * @param {String} currDate - Current Date
     * @returns {Boolean}
     */
    const activeDay = (currDate) => {
        if (
            getDateAndTime(
                currentWeather?.dt,
                currentWeather?.timezone
            )?.date.includes(currDate)
        ) {
            return true;
        }

        return false;
    };

    return (
        <div className='forecast flex justify-between mt-[30px] tablet:justify-center tablet:mt-[50px]'>
            {forecastData.map((item, idx) => (
                <div
                    className={`m-[5px] rounded-[10px] px-[5px] py-[10px] flex flex-col items-center w-[12%] tablet:px-[10px] tablet:py-[15px] 
                    tablet:min-w-[100px] desktop:py-[30px] ${
                        activeDay(formatDate(item?.date)) ? "bg-[#303134]" : ""
                    }`}
                    key={idx}
                >
                    <p className='text-white text-[10px] tablet:text-[12px] desktop:text-[16px]'>
                        {formatDate(item?.date)}
                    </p>
                    <img
                        className='h-[25px] w-[25px] mt-[5px] tablet:h-[50px] tablet:w-[50px] desktop:h-[60px] desktop:w-[60px] desktop:mt-[10px]'
                        src={item?.conditions?.imgSrc}
                        alt='Weather'
                    />
                    <p className='text-white text-[12px] font-medium mt-[5px] tablet:text-[16px] desktop:text-[20px] desktop:mt-[10px]'>
                        {item?.conditions?.condition}
                    </p>
                    <p className='text-white text-[10px]  mt-[5px] desktop:text-[16px] desktop:mt-[10px]'>
                        {Math.round(item?.maxTemp)} °C /{" "}
                        {Math.round(item?.minTemp)} °C
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Forecast;
