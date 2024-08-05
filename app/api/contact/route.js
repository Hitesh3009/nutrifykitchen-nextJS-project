import {promises as fs } from 'fs';
export async function POST(req) {
    try {
        // Creates the json file inside contactdata directory for each user for their complaints via contact form and the name of the json file will be users_email.json
        const objdata = await req.json();
        const body=JSON.stringify(objdata);
        fs.appendFile(`./contactdata/${objdata.email}.json`,body+',\n');
        await fs.readdir('./contactdata');
        return new Response(body, {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (err) {
        // return an error for any error encountered during logging the user complaints to contactdata directory
        return new Response(JSON.stringify({error:'Internal Server Error',status:500}),{
            headers:{'Content-Type': 'application/json'}
        });
    }
}