const express=require('express')
const mysql=require('mysql')
const path = require('path')
require('dotenv').config()



//variables de entorno

const dbConfig={
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
}

const conexion=mysql.createConnection(dbConfig)

conexion.connect((error)=>{
    if(error){
        console.log('error al conectar',error)
    }else{
        console.log('conexion exitosa')
    }
})

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    //res.send('<h1>hola mundo</h1>')
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.post('/envio',(req,res)=>{
  
    let username=req.body.usuario
    let password=req.body.password
    
    conexion.query('SELECT * FROM cuentas WHERE usuario = ? AND password = ?',[username,password],(error,resultado,fields)=>{
                if(error){
                    console.log('error en la consulta',error)
                }
    })



    res.send('usuario registrado')
})

app.listen(3009,()=>{
    console.log('servidor ejecutandose')
})