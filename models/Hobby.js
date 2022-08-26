const {Schema, model} = require('mongoose');

// Virtuals are values that we can calculate based on the current document that we are looking at
// these values are not saved to the database, but we can query for them when we receive the data

const hobbySchema = new Schema({
  hobby: String,
});


module.exports = model('Hobby', hobbySchema);
