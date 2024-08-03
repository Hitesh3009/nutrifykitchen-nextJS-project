'use client';
import React, { useEffect, useState } from 'react';
// const fs=require('fs');
const Allblogs = () => {
    const app_key = 'd9bbd69b35f8f302f6953af554b647ba%09';
    const app_id = '41e85f0c';
    const cuisineArr = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']
    const [query, setquery] = useState('');
    const [cuisine, setcuisine] = useState('Indian');
    const [recipeData, setrecipeData] = useState([]);
    const fetchRecipes = async () => {
        const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&cuisineType=${cuisine}&app_id=${app_id}&app_key=${app_key}`);
        const dataObj = await res.json();
        console.log(dataObj.hits);
        setrecipeData(dataObj.hits);
        console.log(dataObj.hits);
        // const jsonData = JSON.stringify(dataObj, null, 4);
        // fs.promises.writeFile('./blogdata/recipes.json', jsonData);
    }
    const getUserQuery = (e) => {
        if (e.target.value === '')
            setquery();
        else
            setquery((e.target.value).substr(0, 1).toUpperCase() + (e.target.value).substr(1, e.target.value.length + 1).toLowerCase());
    }
    const getUserCuisine = (e) => {
        setcuisine((e.target.value).substr(0, e.target.value.length + 1).toLowerCase());
        console.log(cuisine);
    }

    useEffect(() => {
        fetchRecipes();
    }, [query,cuisine]);
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
                            <option disabled selected>Select Cuisine Type</option>
                            {
                                cuisineArr.map((val, index) => {
                                    return (<>
                                        <option value={val} key={index}>{val}</option>
                                    </>)
                                })
                            }
                        </select>
                    </div>}
                    {/* <button className='bg-gray-700 text-white px-4 py-2 rounded-lg'>Search</button> */}
                </form>
                {/* {
                    allBlogs.length > 0 && allBlogs.map((blogItem) => {
                        return (<div className="blogsItems border-2 border-black p-5 w-5/12 h-40" key={blogItem.slug}>
                            <div>
                                <Link href={`blogpost/${blogItem.slug}`}><h4 className="text-lg font-bold cursor-pointer">{blogItem.title}</h4></Link>
                                <p>{blogItem.description.substr(0, 155) + '.....'}</p>
                            </div>
                        </div>);
                    })
                } */}
            </div>
            {
                recipeData && recipeData.map((item, index) => {
                    return ((<div className='flex border-2 border-black'>
                        <img src={item.recipe.image} alt="" />
                    </div>))
                })
            }
        </>
    )
}

export default Allblogs