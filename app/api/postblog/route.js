import {promises as fs} from 'fs';
export async function POST(){
    try {
        const jsonData=await fs.readFile('./blogdata/recipes.json', 'utf8');
        const parsed=await JSON.parse(jsonData);
        console.log(parsed);
        for (let i=0;i<parsed.length;i++){
            const ele=parsed[i];
            fs.writeFile(`blogdata/${ele.slug}.json`,JSON.stringify(ele.recipe));
        }
        return new Response(JSON.stringify('res'),{
            headers: { 'Content-Type': 'application/json' },
            status: 200
        })
    } catch (err) {
        return new Response(JSON.stringify({error:'Internal Server Error'}),{
            headers: { 'Content-Type': 'application/json' },
            status: 404
        })
    }
}