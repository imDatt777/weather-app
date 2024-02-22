// Importing NPM Dependencies
import React from "react";

// Importing Helper Methods
import {
    getDateAndTime,
    getWeatherCondition,
} from "../utilities/helperMethods";

const CurrentWeather = (props) => {
    const { currentWeather = {} } = props;

    return (
        <div className=' flex justify-between p-[10px] m-[10px]'>
            <div className='flex'>
                <img
                    className='h-[40px] w-[40px] tablet:h-[100px] tablet:w-[100px]'
                    src={
                        getWeatherCondition(
                            currentWeather?.weather[0]?.description
                        ).imgSrc
                    }
                    alt='Weather'
                />
                <div className=' flex ml-[10px] tablet:ml-[20px]'>
                    <div className='temp-condn'>
                        <p className='curr-temp text-white text-[16px] tablet:text-[28px]'>
                            {Math.round(currentWeather?.main?.temp)}
                            <span className='text-[12px] align-top tablet:text-[16px]'>
                                °C
                            </span>
                        </p>
                        <p className='weather-type text-white text-[16px]'>
                            {
                                getWeatherCondition(
                                    currentWeather?.weather[0]?.description
                                ).condition
                            }
                        </p>
                    </div>
                    <div className='ml-[20px]'>
                        <p className='humidity text-white text-[10px] tablet:text-[12px]'>
                            Humidity : {currentWeather?.main?.humidity}%
                        </p>
                        <p className='wind text-white text-[10px] tablet:text-[12px]'>
                            Wind : {currentWeather?.wind?.speed} m/s
                        </p>
                    </div>
                </div>
            </div>
            <div className='name-date'>
                <h3 className='city font-bold text-white text-[16px] leading-5 tablet:text-[20px] tablet:leading-6 '>
                    {currentWeather?.name}
                </h3>
                <p className='text-white text-[10px] tablet:text-[12px]'>
                    {
                        getDateAndTime(
                            currentWeather?.dt,
                            currentWeather?.timezone
                        )?.date
                    }
                </p>
                <p className='text-white text-[10px] tablet:text-[12px]'>
                    {
                        getDateAndTime(
                            currentWeather?.dt,
                            currentWeather?.timezone
                        )?.time
                    }
                </p>
                <p className='text-white text-[10px] tablet:text-[12px]'>
                    {
                        getDateAndTime(
                            currentWeather?.dt,
                            currentWeather?.timezone
                        )?.day
                    }
                </p>
            </div>
        </div>
    );
};

export default CurrentWeather;
