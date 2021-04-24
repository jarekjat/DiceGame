var express = require('express')
const { expr} = require('jquery')
const app = express()
app.use('/views',express.static('views'))
app.use('/models',express.static('models'))
app.use('/styles', express.static('styles'))
app.use('/images', express.static('images'))
app.use('/controllers', express.static('controllers'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})