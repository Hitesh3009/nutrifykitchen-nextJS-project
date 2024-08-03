import { promises as fs } from 'fs';
export async function GET() {
    try {
        const res=await fs.readFile(process.cwd()+'/blogdata/recipes.json','utf8');
        const parsed=await JSON.parse(res);
        const arrdata=parsed.data
        console.log(arrdata)
        const data = new Response(JSON.stringify(arrdata), {
            headers: {
                'Content-Type': 'application/json',
                status: 200
            }
        });
        return data;
    } catch (err) {
        // console.log(err);
        return new Response(JSON.stringify({ error: 'No such blog found',status: 404}), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

}


