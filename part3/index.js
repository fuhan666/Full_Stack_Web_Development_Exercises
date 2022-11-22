require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan((tokens, req, res) => {
    let format = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ]
    if (req.method === 'POST') format.push(JSON.stringify(req.body))
    return format.join(' ')
  })
)

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  const timeString = new Date().toString()
  Person.estimatedDocumentCount({})
    .then(res =>
      response.send(
        `<p>Phonebook has info for ${res} people</p><p>${timeString}</p>`
      )
    )
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  Person.findOne({ name: name })
    .then(person => {
      if (person) {
        return response.status(400).json({ error: 'name must be unique' })
      } else {
        const newPeople = new Person({
          name: name,
          number: number,
        })
        newPeople
          .save()
          .then(res => {
            response.status(201).json(res)
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  Person.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
  })
    .then(newPersonInfo => response.json(newPersonInfo))
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
