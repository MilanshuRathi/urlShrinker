require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const validator = require('validator');
const { response } = require('express');
const app=express();
const port=process.env.port||3000;
const URL=require(`${__dirname}/models/urlModel.js`);
app.use(express.urlencoded({extended:false}));
mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('Connected to DB successfully'));
app.set('view engine','ejs');
app.get('/',async(request,response)=>{           
    response.render('homePage.ejs');
});
app.get('/getData',async(request,response)=>{
    const shortUrls=await URL.find();        
    response.status(200).json({
        status:'success',
        shortUrls
    })
});
app.post('/shrinkUrl',async(request,response)=>{
    const longUrl=request.body.long;
    let finalObject; 
    console.log(request.headers);   
    if(longUrl&&!await URL.findOne({long:longUrl}))
        finalObject=await URL.create({long:longUrl}); 
    else
        return response.status(400).json({status:'fail',message:'Not valid'});
    response.status(201).json({
        status:'success',
        data:finalObject
    });
});
app.get('/:shrinkedUrl',async(request,response)=>{
    const fetchUrl=await URL.findOne({shrinkedUrl:request.params.shrinkedUrl});
    if(fetchUrl==null) return response.sendStatus(404);        
    response.redirect(fetchUrl.long);
});
app.listen(port,()=>console.log(`Server running on port:${port}`));