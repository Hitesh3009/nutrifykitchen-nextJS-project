import {promises as fs } from 'fs';
export async function POST(req) {
    try {
        const objdata = await req.json();
        const body=JSON.stringify(objdata);
        fs.appendFile(`./contactdata/${objdata.email}.json`,body+',\n');
        const file=await fs.readdir('./contactdata');
        return new Response(body, {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (err) {
        return new Response(JSON.stringify({error:'Internal Server Error'}),{
            headers:{'Content-Type': 'application/json'},
            status:404
        });
    }
}