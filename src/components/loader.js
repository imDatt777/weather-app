// Importing NPM Dependencies
import React from "react";

const Loader = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
            <div className='fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm'></div>
            <div className='relative'>
                <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32'></div>
            </div>
        </div>
    );
};

export default Loader;
