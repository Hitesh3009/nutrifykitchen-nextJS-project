import { promises as fs } from 'fs';

export async function GET() {
    try {
        const res = await fs.readdir('./blogdata', 'utf-8');
        // console.log(res);
        const data = new Response(JSON.stringify(res), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
        return data;
    } catch (error) {
        return new Response(JSON.stringify({error:'Internal Server Error'}),{
            headers:{'Content-Type': 'application/json'},
            status:404
        });
    }
}