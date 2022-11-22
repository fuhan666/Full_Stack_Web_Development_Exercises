require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')

// The third argument (password) asked in the 3.12 exercise is no longer used after using the database model, however the code is still kept here.
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Wrong number of arguments.')
  console.log(process.argv)
  process.exit(1)
}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    let outputText = ['phonebook:']
    result.map(
      person => {
        outputText = outputText.concat(`${person.name} ${person.number}`)
      }
    )
    console.log(outputText.join('\n'))
    mongoose.connection.close()
  })
}
