'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
const Allblogs = () => {
    const [query, setquery] = useState('');
    const [cuisine, setcuisine] = useState('Indian');
    const [recipeData, setrecipeData] = useState([]);
    const [isDataEmpty, setisDataEmpty] = useState(false);
    const [isCompMounted, setisCompMounted] = useState(false);
    const app_key = 'd9bbd69b35f8f302f6953af554b647ba%09';
    const app_id = '41e85f0c';
    const cuisineArr = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']
    const fetchRecipes = async () => {
        try {
            const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&cuisineType=${cuisine}&app_id=${app_id}&app_key=${app_key}`);
            const dataObj = await res.json();
            console.log(dataObj.hits);
            setrecipeData(dataObj.hits);
            console.log(dataObj.hits);
            if (dataObj.hits.length === 0) {
                setisDataEmpty(true);
            } else {
                setisDataEmpty(false);
                const recipesWithSlug = dataObj.hits.map(item => ({
                    recipe: item.recipe,
                    slug: item.recipe.label.replace(/[ ,:;]+/g, '-')
                }));
                await saveRecipes(recipesWithSlug);
                await postRecipe();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const saveRecipes = async (recipes) => {
        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipes)
            });
            if (!res.ok) {
                throw new Error('Failed to save recipes'); // Added error handling
            }
        } catch (err) {
            console.log('Some error occurred while saving recipes:', err);
        }
    };
    const postRecipe = async () => {
        const res = await fetch('api/postblog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        return data;
    }
    const getUserQuery = (e) => {
        if (e.target.value === '')
            setquery('');
        else
            setquery((e.target.value).substr(0, 1).toUpperCase() + (e.target.value).substr(1, e.target.value.length + 1).toLowerCase());
    }
    const getUserCuisine = (e) => {
        setcuisine((e.target.value).substr(0, e.target.value.length + 1).toLowerCase());
    }

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
                    (recipeData && !isDataEmpty) ? recipeData.map((item) => {
                        return (<>
                            <div className="card border-4 border-white w-[15rem] md:h-96 sm:w-64 flex flex-col mb-4 mt-10 text-white" key={item.recipe.uri}>
                                <div className='flex p-5 flex-col items-center'>
                                    <div className="imageContainer flex justify-center sm:w-1/3 ">
                                        <img src={item.recipe.images.REGULAR.url} alt="Recipe Image" className='max-w-56 max-h-48 sm:max-w-60 sm:max-h-44' />
                                    </div>
                                    <div className="imageContainer flex justify-center flex-col">
                                        <Link href={`/blogpost/${item.recipe.label.replace(/[ ,:;]+/g, '-')}`}><span className='text-xs sm:text-sm text-center font-semibold md:text-[0.9rem] flex-grow'>{item.recipe.label}</span></Link>
                                    </div>
                                </div>
                                <div className='mb-2 mx-1 my-auto'>
                                    <hr className='border-2 border-gray-300' />
                                    <div className='flex justify-evenly items-center my-1 sm:my-1.5 md:my-2'>
                                        <span className='text-xs sm:text-sm md:text-base'>Calories : {Math.round(item.recipe.calories)}</span>
                                        <span>&nbsp;|&nbsp;</span>
                                        <span className='text-xs sm:text-sm md:text-base'>Ingredients : {item.recipe.ingredients.length}</span>
                                    </div>
                                    <hr className='border-2 border-gray-300' />
                                    <div className="source flex justify-center mt-1">
                                        <span className='text-xs sm:text-sm md:text-base font-bold cursor-pointer hover:underline text-blue-500'><a href={item.recipe.url}>{item.recipe.source}</a></span>
                                    </div>
                                </div>
                            </div>
                        </>)
                    }) : (<>
                        <div className='flex items-center justify-center mt-16'>
                            <p className='font-bold text-2xl'>No Recipe found</p>
                        </div>
                    </>)
                }
            </div>
        </>
    )
}

export default Allblogs