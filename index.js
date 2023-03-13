// config incial
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/Person')

// forma de ler JSON - middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({message: '2023 é meu ano!!'})
})

app.post('/person', async (req, res) => {
  const {name, salary, approved} = req.body
  const person = {name, salary, approved}
  
  try{
    await Person.create(person)
    res.status(201).json({message: 'pessoa inserida com sucesso'})
  } catch(error){
    res.status(500).json({error: error})
  }
})

app.get('/person', async (req, res) => {
  try{
    const people = await Person.find()
    res.status(200).json(people)
  } catch(error) {
    res.status(500).json({error: error})
  }
})

app.get('/person/id', async (req, res) => {
  const id =  req.params.id

  try{
    const person = await Person.findOne({_id: id})

    if(!person) {
      res.status(422).json({message: 'o usuario não foi encontrado'})
      return
    }

    res.status(200).json(person)
  } catch(error) {
    res.status(500).json({error: error})  
  }
})

app.delete('/person', async (req, res) => {
  const {name} = req.body

  const user = await Person.deleteOne({name: name})

  if(user === name) {
    res.status(422).json({message: 'o usuario não foi encontrado'})
    }
    
  try {
      await Person.deleteOne({name: name})
      res.status(200).json({message: 'usuario deletado'})
    }catch(error){
    res.status(500).json({error: error}) 
  }
})

// entregar uma porta
mongoose.connect('cria uma sua')
.then(() => {
  console.log('DB CONECTADO')
  app.listen(3000)
})
.catch((err) => {
  console.log(err)
})
