
const express=require('express');
const {isAuthneticated,isUserAuthneticated}=require('./middlewares/admin_auth')
const app=express();
const Port=3000;
app.use("/admin",isAuthneticated)
app.post("/user/login",(req,res)=>{
  res.send("User login successfully");
})
app.get("/user/getData",isUserAuthneticated,(req,res)=>{
  res.send("User data");
})
app.get("/admin/getAllData",(req,res)=>{

  res.send("All the data")
   /*const bodyToken="XYZ";
   const actualToken="XYZ1";
   if(bodyToken===actualToken){
       res.send("send all Data")
   }
   else {
    res.status(401).send("Your are not authorized")
   }
    */
   
})
app.delete("/admin/deleteData",(req,res)=>{
  res.send("Data deleted");
   /*const bodyToken="XYZ";
   const actualToken="XYZ1";
   if(bodyToken===actualToken){
       res.send(" Data Deleted")
   }
   else {
    res.status(401).send("Your are not authorized")
   }
    */
})  

app.listen(Port,()=>{
  console.log(`App is listening in Port ${Port}`)
})