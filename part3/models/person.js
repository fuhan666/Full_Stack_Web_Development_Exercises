const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// create Person pattern
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Name required'],
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: number => {
        return /^\d{2,3}-\d*$/.test(number)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phone number required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
