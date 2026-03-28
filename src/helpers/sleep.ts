export const sleep = (seconds = 1)=> {
    return new Promise ((result)=> {
        setTimeout(()=>{
            result(true);
        }, seconds * 1000)
    })
}