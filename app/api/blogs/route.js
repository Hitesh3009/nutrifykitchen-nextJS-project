import { promises as fs } from 'fs';
export async function POST(req) {
    try {
        // Logs all the available blogs from the api into the recipes.json file in blogdata directory 
        const data=await req.json();
        const filePath='blogdata/recipes.json';
        fs.writeFile(filePath,JSON.stringify(data,null,4));
        return new Response('Write Successful to recipes.json', {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        // return an error for any errors encountered during writing the recipes in the recipes.json file
        return new Response(JSON.stringify({ error: 'Internal Server Error', status: 500 }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}