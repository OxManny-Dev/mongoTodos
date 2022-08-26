const {Schema, model} = require('mongoose');

// Virtuals are values that we can calculate based on the current document that we are looking at
// these values are not saved to the database, but we can query for them when we receive the data

// Creates the blueprint for our collection
const userSchema = new Schema({
  firstName: String,
  lastName: {
    type: String,
    trim: true,
    // if we want a custom error message when the user forgets to give this
    // value we can use this syntax
    required: [true, 'We need your last name friend!'],
  },
  username: {
    type: String,
    minLength: [10, 'my error message'],
  },
  email: {
    type: String,
    lowercase: true,
  },
  age: Number,
  weapons: {
    primaryWeapon: {
      type: String,
      default: 'Baseball bat',
    },
    secondaryWeapon: {
      type: String,
      default: 'Baseball',
    }
  },
  hobbyIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Hobby',
      default: [],
    }
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// by default mongoose creates an id virtual for us automatically

// here we create our virtual, this property isn't saved to the database, but we can make up its value based on
// the information of the current document
// virtual takes 1 parameter, what is the name of this field when we get the documents
userSchema.virtual('fullName').get(function() {
//   this = 1 document   or 1 user
  return `${this.firstName} ${this.lastName}`;
});

// userSchema.virtual('hobbyCount').get(function() {
// //   this = 1 document   or 1 user
//   return this.hobbyIds.length;
// });
//


// We can make our own Queries attached to a model
userSchema.statics.findByFirstName = async function(firstName) {
  return await this.find({ firstName });
}

// We can make our own instance functions for a single document within a collection
userSchema.methods.sayGreeting = function() {
  console.log(`
    Hi my name is ${this.firstName} ${this.lastName} and my weapons are ${this.weapons.primaryWeapon} and ${this.weapons.secondaryWeapon}
  `)
}

// Create and export the collection so that we can use it in other files
module.exports = model('User', userSchema);