'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Component to display all the available blogs
const Allblogs = () => {
    const [query, setquery] = useState(''); // Get the user query for the recipe name
    const [cuisine, setcuisine] = useState('Indian'); // Get the user query for the cuisine type
    const [recipeData, setrecipeData] = useState([]); // Gets the recipe data from the api as an array
    const [isDataEmpty, setisDataEmpty] = useState(false); // Checks whether the array of recipes is empty
    const [isCompMounted, setisCompMounted] = useState(false); // Checks whether the component is mounted
    const app_key = 'd9bbd69b35f8f302f6953af554b647ba%09';
    const app_id = '41e85f0c';
    const cuisineArr = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']

    // Fetches the recipes from the api
    const fetchRecipes = async () => {
        try {
            const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&cuisineType=${cuisine}&app_id=${app_id}&app_key=${app_key}`);
            const dataObj = await res.json();
            setrecipeData(dataObj.hits);
            if (dataObj.hits.length === 0) {
                setisDataEmpty(true);
            } else {
                setisDataEmpty(false);

                // Creates an object which contains recipes along with their slug which further helps to access the respective blog
                const recipesWithSlug = dataObj.hits.map(item => ({
                    recipe: item.recipe,
                    slug: item.recipe.label.replace(/[ ,:;]+/g, '-')
                }));

                // Saves the recipes with their respective slug
                await saveRecipes(recipesWithSlug);

                // Post the blogs in the file system as an when the user searches for any query
                await postRecipe();
            }
        } catch (err) {
            console.error('Error Occured while fetching recipes',err); // Returns any error while fetching the api
        }
    }

    // Function to save the recipes in one file in file system
    const saveRecipes = async (recipes) => {
        try {
            // Fetches the /api/blogs from the file system which post the recipes in recipes.json file with their slug
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipes)
            });
            if (!res.ok) {
                throw new Error('Failed to save recipes'); // error handling
            }
        } catch (err) {
            console.error('Some error occurred while saving recipes:', err); // Returns any error while writing the file
        }
    };

    // Function to post the blogs by creating json files for the respective recipes named by their slug
    const postRecipe = async () => {
        // Fetches the /api/blogs from the file system
        const res = await fetch('api/postblog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        return data;
    }

    // This function is used to get the recipe name from the user and set the recipe name state accordingly to re render the blogs
    const getUserQuery = (e) => {
        if (e.target.value === '')
            setquery('');
        else
            setquery((e.target.value).charAt(0).toUpperCase() + (e.target.value).substr(1, e.target.value.length + 1).toLowerCase());
    }

    // This function is used to get the cuisine type from the user and set the available recipes blogs accordingly to be re rendered
    const getUserCuisine = (e) => {
        setcuisine((e.target.value).substr(0, e.target.value.length + 1).toLowerCase());
    }

    // This hook ensures whether the component is mounted and then re renders the components based on the dependencies here:recipe name and cuisine type
    useEffect(() => {
        fetchRecipes();
        setisCompMounted(true);
    }, [query, cuisine]);

    if(!isCompMounted){
        return null;
    }

    return (
        <>
            <div className="blogs flex flex-col items-center flex-wrap p-5">
                <p></p>
                <form className="recipeName flex flex-col md:flex-row items-center md:space-x-5 md:space-y-0 space-y-6">
                    <div className='flex flex-col text-center'>
                        <label htmlFor="recipe" className='text-base md:text-xl font-bold text-white'>Enter Recipe Name Here</label>
                        <input type="text" name="recipe" className='max-w-[70vw] sm:w-[40vw] md:w-[28.5vw] lg:w-[25vw] outline-none border-2 border-black rounded-md h-9 pl-3 mt-2' onChange={getUserQuery} value={query} />
                    </div>
                    {query && <div className='flex flex-col text-center'>
                        <label htmlFor="recipe" className='text-base md:text-xl font-bold text-white'>Cuisine Type</label>
                        <select name="cuisineType" onChange={getUserCuisine} className='mt-2 max-w-[60vw] sm:w-[40vw] md:w-[23vw] lg:w-[20vw] outline-none border-2 border-black rounded-md h-9'>
                            <option selected>Indian</option>
                            {
                                // Iterates the available cuisines and displays them in the dropdown
                                cuisineArr.map((val, index) => {
                                    return (<>
                                        <option value={val} key={index}>{val}</option>
                                    </>)
                                })
                            }
                        </select>
                    </div>}
                </form>
            </div>

            <div className='flex flex-wrap flex-col items-center pl-5 pt-3 space-y-4 md:space-y-6 mx-16 md:flex-row md:justify-evenly mb-5'>
                {
                    // Checks whether the blogs data is available for the provided recipe name and cuisine and returns the o/p accordingly
                    (recipeData && !isDataEmpty) ? recipeData.map((item) => {
                        return (<>
                            <div className="card border-4 border-gradient w-[15rem] md:h-96 sm:w-72 flex flex-col mb-4 mt-10 text-white" key={item.recipe.uri}>
                                <div className='flex p-5 flex-col items-center'>
                                    <div className="imageContainer flex justify-center sm:w-1/3 ">
                                        <img src={item.recipe.images.REGULAR.url} alt="Recipe Image" className='max-w-56 max-h-48 sm:max-w-60 sm:max-h-44' />
                                    </div>
                                    <div className="imageContainer flex justify-center flex-col">
                                        {/*Redirects to the route based on the label(title) for the recipe */}
                                        <Link href={`/blogpost/${item.recipe.label.replace(/[ ,:;]+/g, '-')}`}><span className='text-xs sm:text-sm text-center font-semibold md:text-[0.9rem] flex-grow'>{item.recipe.label}</span></Link>
                                    </div>
                                </div>
                                <div className='mb-2 mx-1 my-auto'>
                                    <hr className='border-2 border-yellow-400' />
                                    <div className='flex justify-evenly items-center my-1 sm:my-1.5 md:my-2'>
                                        <span className='text-xs sm:text-sm md:text-base'>Calories : {Math.round(item.recipe.calories)}</span>
                                        <span>&nbsp;|&nbsp;</span>
                                        <span className='text-xs sm:text-sm md:text-base'>Ingredients : {item.recipe.ingredients.length}</span>
                                    </div>
                                    <hr className='border-2 border-yellow-400' />
                                    <div className="source flex justify-center mt-1">
                                        <span className='text-xs sm:text-sm md:text-base font-bold cursor-pointer hover:underline text-blue-500 overflow-x-auto scrollbar-hide'><a href={item.recipe.url}>{item.recipe.source}</a></span>
                                    </div>
                                </div>
                            </div>
                        </>)
                    }) : (<>
                        <div className='flex items-center justify-center mt-16 flex-col'>
                            <p className='font-bold text-2xl text-white my-2'>No Recipe found :&#40;</p>
                            <p className='font-bold text-2xl text-white my-2'> Maybe you can find it changing cuisine type.</p>
                        </div>
                    </>)
                }
            </div>
        </>
    )
}

export default Allblogs