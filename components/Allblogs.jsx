'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
const Allblogs = () => {
    const [query, setquery] = useState('');
    const [cuisine, setcuisine] = useState('Indian');
    const [recipeData, setrecipeData] = useState([]);
    const [isDataEmpty, setisDataEmpty] = useState(false);
    const [slug, setslug] = useState('');
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
        } catch (err) {
            console.log('Some error occurred while saving recipes:', err);
        }
    };

    const getUserQuery = (e) => {
        if (e.target.value === '')
            setquery('');
        else
            setquery((e.target.value).substr(0, 1).toUpperCase() + (e.target.value).substr(1, e.target.value.length + 1).toLowerCase());
    }
    const getUserCuisine = (e) => {
        setcuisine((e.target.value).substr(0, e.target.value.length + 1).toLowerCase());
        console.log(cuisine);
    }

    useEffect(() => {
        fetchRecipes();
    }, [query, cuisine]);
    return (
        <>
            <div className="blogs flex flex-col items-center flex-wrap space-x-5 space-y-3 p-5">
                <p></p>
                <form className="recipeName flex items-center space-x-5">
                    <div className='flex flex-col text-center'>
                        <label htmlFor="recipe" className='text-xl font-bold'>Enter Recipe Name Here</label>
                        <input type="text" name="recipe" className='w-[30vw] outline-none border-2 border-black rounded-md h-9 pl-3' onChange={getUserQuery} value={query} />
                    </div>
                    {query && <div className='flex flex-col text-center'>
                        <label htmlFor="recipe" className='text-xl font-bold'>Cuisine Type</label>
                        <select name="cuisineType" onChange={getUserCuisine} className='w-[20vw] outline-none border-2 border-black rounded-md h-9'>
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
            <div className='flex flex-wrap justify-evenly p-3'>
                {
                    
                    (recipeData && !isDataEmpty) ? recipeData.map((item, index) => {
                        return (<>
                            <div className='card border-2 border-black w-[21%] h-[52vh] mb-5 flex flex-col items-center pt-5 'key={index}>
                                <div className='recipeimg w-10/12 h-[52%]'>
                                    <img src={item.recipe.image} alt='Recipe Image' className='w-full h-full' />
                                </div>
                                <div className='flex w-10/12 flex-grow'>
                                    <Link href={`/blogpost/${item.recipe.label.split(' ').join('-')}`}><span className='text-sm font-light w-full justify-start'>{item.recipe.label}</span></Link>
                                </div>
                                <div className="recipeInfo w-10/12 mb-1">
                                    <hr className='border-2 border-gray-300 w-full' />
                                    <div className='flex justify-center p-3'>
                                        <span className='relative right-5'>Calories:{Math.round(item.recipe.calories)}</span>
                                        <span>&nbsp;|&nbsp;</span>
                                        <span className='relative left-5'>Ingredients:{item.recipe.ingredients.length}</span>
                                    </div>
                                    <hr className='border-2 border-gray-300 w-full' />
                                </div>
                                <div className="recipeSource mb-2">
                                    <span className='hover:text-green-500 cursor-pointer'>{item.recipe.source}</span>
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