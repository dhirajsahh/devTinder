const express = require("express");

const app = express();

app.get("/user",[(req,res,next)=>{
  console.log("Handling the user route 1");
  //next();
  //res.send("Frist response")
  next();
},
(req,res,next)=>{
  console.log("Handling the user Route2");
 // res.send("2nd response");
  next();
},
(req,res,next)=>{
  console.log("Handling the user Route 3");
  next();
  //res.send("third response");
},
(req,res,next)=>{
  console.log("Handing the user Route 4");
  res.send("fourth Response")
 // next();
  
}]

)

/*app.use("/user",(req,res,next)=>{
  console.log("First response");
  if(req.query.userId==100){
    res.send("first Response");
  }
  else next()
},
(req,res)=>{
  console.log("second Respose");
  res.send("Second response");
},
(req,res)=>{
  
}
)
*/
app.listen(3000, () => {
  console.log("App is listening in port 3000");
});
/*
app.get(/us(er)+/, (req, res) => {
  res.send({
    fristName: "Dhiraj",
    lastName: "Mahato",
  });
});
app.get(/user/, (req, res) => {
  res.send({
    fristName: "Dhiraj",
    lastName: "Mahato",
  });
});
app.get("/us*er", (req, res) => {
  res.send({
    fristName: "Dhiraj",
    lastName: "Mahato",
  });
});
app.get("/user",(req,res)=>{
    res.send("Hello user")
    console.log(req.query);
    
})
app.get("/user",(req,res)=>{
    res.send("Hello user")
   
    
})
app.get("/user/:userId",(req,res)=>{
    res.send("Hello user")
    console.log(req.params);
    
})
app.post("/user", (req, res) => {
  res.send("User created successfully");
});
app.patch("/user", (req, res) => {
  res.send("Email updated successfully");
});
app.put("/user", (req, res) => {
  res.send("user detail is replace successfully");
});
app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});

*/