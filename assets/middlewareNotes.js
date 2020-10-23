const express = require('express') //Require the npm module

const app = express()//Start the server
const router = express.Router()
const port = process.env.PORT || 3000 //Specify the port on which the server should run

//APPLICATION LEVEL-MIDDLEWARE
//app.use((req,res,next) => {
    //console.log(req.method, req.path)
    //next() //It is important to call this function to ensure the responses get sent
//})

router.use((req,res,next) => {
    console.log('Start execution')
    next() //It is important to call this function to ensure the responses get sent
})


//MIDLEWARE FUNCTION THAT IS BEING DECLARED
/*const auth =  (req, res, next) => {
    console.log('you were authenticated at ' + Date.now())
    next()
}*/


//A ROUTE THAT CALLS THE DECLARED MIDDLEWARE
router.get('/', (req,res, next) => {
    res.send('Hello world')
    console.log('Sweet in the middle')
    next()
})

router.use('/', (req,res,next) => {
    console.log('End execution')
    next() 
})

app.use('/', router)//Mount the router on the app


app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})

