//creating an http server

const exprss = require("express");

const app = exprss();


function sum(n){
    let s=0;
    for(let i=1;i<=n;i++){
      s+=i;
    }
    return s;
}

app.get("/", function (req, res) {
  const num= req.query.n;
  const ans=sum(num)
  res.send("hello your answer is "+ans)

});
app.listen(3001);