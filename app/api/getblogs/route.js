import { promises as fs } from 'fs';
export async function GET(req) {
    try {
        const slug = req.nextUrl.searchParams.get('slug');
        const res=await fs.readFile(process.cwd()+'/blogdata/recipes.json','utf8');
        const parsed=await JSON.parse(re);
        const arrdata=parsed.data
        const data = new Response(arrdata, {
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


