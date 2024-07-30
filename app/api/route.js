export async function GET(){
    const data={
        name:'Hitesh',
        age:'22'
    };

    const response = new Response(JSON.stringify(data),{
        headers:{
            "Content-Type": "application/json"
        }
    });

    return response;
}