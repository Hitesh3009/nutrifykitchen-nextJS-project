import { promises as fs } from 'fs';
export async function POST(req) {
    try {
        const data=await req.json();
        const filePath='blogdata/recipes.json';
        fs.writeFile(filePath,JSON.stringify(data,null,4));
        return new Response('Write Successful to recipes.json', {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error', status: 404 }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}