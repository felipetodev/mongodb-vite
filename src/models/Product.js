import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  images: {
    url: String
  },
  category: {

  }
}, {
  timestamps: true,
  versionKey: false
})

ProductSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})

export default model('Product', ProductSchema)
