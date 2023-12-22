const express = require('express');
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/markets');
const authRoute = require("./routes/auth")
const cookieParser = require("cookie-parser")
const session =  require("express-session")
require("./database/index")

const app = express();
const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use(session({
  secret: "APOSUTVE64565646ÑJSKSJISKJ", 
  resave: false, 
  saveUninitialized: false,
}))



app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

//La ruta de api de login debe de ir antes de la autorizacón.
app.use('/api/v1/auth', authRoute);
//middleware para iniciar sesión
app.use((req,res,next)=>{
  if (req.session.user)  next();
  else{
    res.send(401)
  }
})
app.use('/api/v1/groceries', groceriesRoute);
app.use('/api/v1/markets', marketsRoute);


app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));



