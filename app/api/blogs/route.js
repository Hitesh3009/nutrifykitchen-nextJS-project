import { promises as fs } from 'fs';

export async function GET() {
    try {
        const res = await fs.readdir('./blogdata', 'utf-8');
        let allBlogs=[];
        let myfile;
        for (let index = 0; index < res.length; index++) {
            const item= res[index];
            myfile=await fs.readFile(('./blogdata/'+ item),'utf-8');
            allBlogs.push(JSON.parse(myfile));
        }
        return new Response(JSON.stringify(allBlogs),{
            headers:{'Content-Type': 'application/json'},
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({error:'Internal Server Error',status:404}),{
            headers:{'Content-Type': 'application/json'},
        });
    }
}