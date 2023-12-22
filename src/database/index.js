const  mongoose =  require("mongoose")

mongoose.connect("mongodb://localhost:27017/expressjs_tutorial")
.then(()=> console.log("CONNECTED DE DB"))
.catch(()=> console.log("We have a error conexion"))
