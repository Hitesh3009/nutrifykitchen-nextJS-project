    import {promises as fs} from 'fs';
    export async function POST(){
        try {
            // Reads the recipes.json file which contains all the recipes and then iterates it and writes individual recipe to their respective slug.json file into the blogdata directory
            const jsonData=await fs.readFile('./blogdata/recipes.json', 'utf8');
            const parsed=await JSON.parse(jsonData);
            for (let i=0;i<parsed.length;i++){
                const ele=parsed[i];
                fs.writeFile(`blogdata/${ele.slug}.json`,JSON.stringify(ele.recipe,null,4));
            }
            return new Response(JSON.stringify({success:true}),{
                headers: { 'Content-Type': 'application/json' },
                status: 200
            })
        } catch (err) {
            // return an error if any error occurred during posting blog
            return new Response(JSON.stringify({error:'Internal Server Error',status: 500}),{
                headers: { 'Content-Type': 'application/json' }
            })
        }
    }