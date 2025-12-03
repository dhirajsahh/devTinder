const isAuthneticated = (req, res, next) => {
  const bodyToken = "XYZ";
  const actualToken = "XYZ";
  console.log("I am from admin middleware");

  if (bodyToken != actualToken) {
    res.status(401).send("You are not authorized");
  } else next();
};
const isUserAuthneticated=(req,res,next)=>{
    const bodyToken="ABC";
    const actualToken="ABC";
    if(bodyToken!=actualToken){
         res.status(401).send("You are not authorized");
    }
    else {
        next();
    }
}
module.exports = { isAuthneticated,isUserAuthneticated };
