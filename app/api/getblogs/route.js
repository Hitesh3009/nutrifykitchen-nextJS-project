import { promises as fs } from 'fs';
export async function GET(req) {
    const slug=req.nextUrl.searchParams.get('slug');
    try {
        const res=await fs.readFile(`./blogdata/${slug}.json`,'utf8');
        const data = new Response(res, {
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


