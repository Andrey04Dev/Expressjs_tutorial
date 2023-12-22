const {Router} = require("express")

const router = Router();

const supermarkets = [
    {
        id:1,
        store: "Whole Foods", 
        miles:0.6
    }, 
    {
        id:2,
        store: "Buen Sabor", 
        miles:2.3
    }, 
    {
        id:3,
        store: "Burger King", 
        miles:4.2
    }, {
        id:4,
        store: "McDonals King", 
        miles:0.2
    },{
        id:5,
        store: "La Capituils", 
        miles:1.2
    },
]

router.use((req,res,next)=>{
    if (req.session.user)  next();
    else{
      res.send(401)
    }
  })

router.get("", (req,res)=>{
    //Query Parameters
    const {miles} = req.query
    const parsedMiles =  parseInt(miles)

    if (!isNaN(parsedMiles)) {
        const filteredStores = supermarkets.filter((f)=> f.miles <= parsedMiles)
        res.send(filteredStores)
    }else{
        res.send(supermarkets)
    }
    console.log(req.query)
      
})

module.exports = router