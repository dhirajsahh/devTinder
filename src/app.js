const express = require("express");

const app = express();
app.get('/user',(req,res)=>{
    res.send({
      "fristName":"Dhiraj",
      "lastName":"Mahato"
    })
   
    
})
app.post("/user",(req,res)=>{
    res.send("User created successfully")
})
app.patch("/user",(req,res)=>{
    res.send("Email updated successfully")
})
app.delete("/user",(req,res)=>{
    res.send("User deleted successfully");
})
app.listen(3000, () => {
  console.log("App is listening in port 3000");
});
