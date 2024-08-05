import { promises as fs } from 'fs';
export async function GET(req) {
    // Extracts the slug from the request url and uses this slug for finding/reading the respective recipe json file from the blogdata directory
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
        // returns an error message with status code if not successful in retrieving the recipe
        return new Response(JSON.stringify({ error: 'No such blog found',status: 404}), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

}


