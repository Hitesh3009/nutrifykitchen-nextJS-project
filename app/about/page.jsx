"use client";
import React, { useEffect, useState } from 'react'

const AboutPage = () => {
    const[isCompMounted,setCompMounted] =useState(false);

    useEffect(()=>{
        setCompMounted(true);
    },[]);

    if(!isCompMounted){
        return null;
    }
    return (
        <>
            <div className='flex justify-center mainContainer'>
                <div className='text-white flex flex-col w-[70vw] md:w-[50vw] text-justify space-y-7 mt-5 mb-5'>

                    <h1 className='text-3xl md:text-4xl underline'>Introduction</h1>
                    <p className='text-base md:text-xl pl-5'>Welcome to Nutrify Kitchen, your go-to destination for discovering a wide variety of recipes, complete with detailed nutritional information and source links for full recipes. Our mission is to make cooking easier and healthier by providing you with all the information you need to prepare delicious meals right at your fingertips.</p>

                <ul className='space-y-5'>
                    <h1 className='text-3xl md:text-4xl underline'>Services</h1>
                    <li className='text-2xl md:text-3xl pl-2 list-disc'>Explore a World of Recipes</li>
                    <p className='text-base md:text-xl pl-5'>At Nutrify Kitchen, you can explore a vast collection of recipes from different cuisines. Simply enter the recipe name or specify a cuisine type, with the default option set to Indian. Whether you're in the mood for a traditional dish or something new, we've got you covered.</p>

                    <li className='text-2xl md:text-3xl pl-2 list-disc'>Detailed Ingredient Lists</li>
                    <p className='text-base md:text-xl pl-5'>For each recipe, we provide a comprehensive list of ingredients, ensuring you have everything you need to recreate the dish in your own kitchen. Our clear and concise ingredient lists make shopping and preparation a breeze.</p>

                    <li className='text-2xl md:text-3xl pl-2 list-disc'>Nutritional Information</li>
                    <p className='text-base md:text-xl pl-5'>Eating healthy is important, and that's why we offer detailed nutritional values for each recipe. You can easily see the breakdown of nutrients to help you make informed decisions about your meals.</p>

                    <li className='text-2xl md:text-3xl pl-2 list-disc'>Source Links</li>
                    <p className='text-base md:text-xl pl-5'>Want to see the full recipe in detail? Each of our recipes includes a source link, allowing you to visit the original recipe page for more information, step-by-step instructions, and additional tips.</p>

                    <p>At Nutrify Kitchen, we're committed to helping you find and create meals that are both delicious and nutritious. Start exploring our recipe collection today and elevate your cooking experience!</p>
                </ul>
                </div>
            </div>
        </>
    )
}

export default AboutPage