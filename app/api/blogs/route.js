import { promises as fs } from 'fs';
const app_key = 'd9bbd69b35f8f302f6953af554b647ba%09';
const app_id = '41e85f0c';
export async function GET(req) {
    try {
        const user_query=req.nextUrl.searchParams.get('q');
        const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${user_query}&app_id=${app_id}&app_key=${app_key}`);
        const dataObj = await res.json();
        const jsonData=JSON.stringify(dataObj, null, 4);
        fs.writeFile('./blogdata/recipes.json', jsonData);
        return new Response(jsonData, {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error', status: 404 }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}