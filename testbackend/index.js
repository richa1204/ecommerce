const express = require('express');
const app = express();

app.get('/', (req,res) =>{
    res.send(`'Hey Harsh'from Ghanasvi`)
})

let test = function(req,res) {
    console.log('this is our contact');
}
app.get('/contact',test)

const port = 3000;
app.listen(port,() => {
    console.log('server is listen');
})