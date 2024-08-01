import { promises as fs } from 'fs';
export async function GET(req) {
    try {
        const slug = req.nextUrl.searchParams.get('slug');
        const res = await fs.readFile(`./blogdata/${slug}.json`, 'utf-8')
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


