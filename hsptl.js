
const express=require("express")
const app=express()


var user=[{
name:"john",
kidneys:[{
    healthy:false
},{
    healthy:true
}]
}]
app.get("/",function(req,res){
    const johnkidneys=user[0].kidneys;
    const numberofkidneys=johnkidneys.length
    let numofhealthykidney=0
    for(let i=0;i<johnkidneys.length;i++){
        if(johnkidneys[i].healthy)
        numofhealthykidney+=1
    }
    const numberofunhealthykidneys=numberofkidneys-numofhealthykidney
    res.json({
        numberofkidneys,
        numofhealthykidney,
        numberofunhealthykidneys
    })

})

app.use(express.json())
app.post('/',function(req,res){
    //for post req we send data in body
    const ishealthy=req.body.ishealthy;
    user[0].kidneys.push({
        healthy:ishealthy
    })
    res.json({
        msg:"done !"
    })
})

app.put('/',function(req,res){
    
    
    for(let i=0;i<user[0].kidneys.length;i++){
        user[0].kidneys[i].healthy=true;

    }
    res.json({});
})

app.delete('/',function(req,res){

    //return 411 wrong req if all healthy kidney
     if(isthereanyunhealthykidney()){

            const newkidneys=[]
            for(let i =0;i<user[0].kidneys.length;i++){
                newkidneys.push({
                    healthy:true
                })
            }
            user[0].kidneys=newkidneys

            res.json({
                msg:"done"
            })
        }
       else {
        res.status(411).json({msg:"no unhealthy kidney"})
       }     
    
})

function isthereanyunhealthykidney(){
    let atleastoneunhealthykidney=false;
    for(let i=0;i<user[0].kidneys.length;i++){
        if(!user[0].kidneys[i].healthy){
            atleastoneunhealthykidney=true;
        }
    }
    return atleastoneunhealthykidney
}
app.listen(3000)