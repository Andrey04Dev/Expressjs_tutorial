const{Router}= require("express")

const router =  Router()

const groceryList = [
    {
      item: "milk",
      quantity: 2,
    },
    {
      item: "Cereal",
      quantity: 2,
    },
    {
      item: "Tomatoes",
      quantity: 2,
    },
  ];

  router.use((req,res,next)=>{
    if (req.session.user)  next();
    else{
      res.send(401)
    }
  })

router.get("/", (req, res) => {
  // res.cookie("Visited", true, {
  //   maxAge: 60000,
  // });
    res.send(groceryList);
  });
  
  router.get("/:item", (req, res) => {

    console.log(req.cookies)
    //Para jalar por ID en nodejs
    const {item} = req.params
    console.log(req.params.item);
    const groceryItem = groceryList.find((r)=>r.item === item)
    res.send(groceryItem);
  });
  router.post("/", (req, res) => {
    console.log(req.body);
    groceryList.push(req.body);
    res.send(201);
  });

  router.get("/shopping/cart", (req,res)=>{
    //gettin de values from session
    const { cart} = req.session
    if (!cart) {
      res.send("You have no a cart session ")
    } else {
      res.send(cart)
    }
  })

  router.post("/shopping/cart/item", (req,res)=>{
    const {item,quantity} = req.body
    const cartItem = {item,quantity}
    const{cart} = req.session
    if (cart) {
      const {items} = cart
      //items.push(cartItem)
      req.session.cart.items.push(cartItem)
    } else {
      req.session.cart = {
        items: [cartItem]
      }
    }

    res.send(201)
  })
  module.exports = router