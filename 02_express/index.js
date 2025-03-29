// require('dotenv').config()
import 'dotenv/config'
import express from 'express';

const app=express();
const port=process.env.PORT || 3000;//yaha dikkat he isko environment variable me dalna padega 
//nhi kiya to deploy nhi hoga digital ocean pe 
//then add it in environment vRIABLES OF THE DEPLOYED ONE
app.use(express.json());



//accepting data
app.use(express.json());//means we accept all the data in json format
let teaData = []
let nextId=1
app.post('/teas',(req,res)=>{
    const {name,price}=req.body;//basically we are destructuring it it is req.body.name and req.body.price
    const newTea={id:nextId++,name,price};//hamne req se liya
    teaData.push(newTea);//array me dala
    res.status(201).send(newTea);//response me wapas bhej diya
})

//getting all the tea 
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
})

//getting any tea
app.get('/teas/:id',(req,res)=>{//special syntax
    const tea=teaData.find(t=>t.id==parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("404 tea not found")
    }else 
    res.status(200).send(tea);//params comes from url (anything in url is params just like anything in body comes in body) also anything in params is string 
    
})
//same route pe do type ki request bhi bana sakte he 


//update tea
app.put('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id==parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("404 tea not found")
    }else {//need more data
        const {name,price}=req.body;
        tea.name=name;
        tea.price=price;
    res.status(200).send(tea);//params comes from url (anything in url is params just like anything in body comes in body) also anything in params is string 
}
})

//deleting tea
app.delete('/teas/:id',(req,res)=>{
    const teaIdx=teaData.findIndex(t=>t.id==parseInt(req.params.id));
    if(teaIdx==-1){
        return res.status(404).send("404 tea not found")
    }else {
        teaData.splice(teaIdx,1);
        res.status(200).send('deleted');//params comes from url (anything in url is params just like anything in body comes in body) also anything in params is string 
    }

})


app.listen(port,()=>{
    console.log(`Server is running at port ${port} ...`)
})