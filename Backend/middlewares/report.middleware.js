const reportQuery = (req,res, next)=>{
    const url=req.url;
    const body=req.body;
    let message= `Today ${new Date()} a request has been received to the route ${url} `;
    if(body && JSON.stringify(body)!='{}') message+= `with the body ${JSON.stringify(body)}`
    console.log(message);
        next()
}
module.exports = { reportQuery }