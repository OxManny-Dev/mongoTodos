const {Schema, model} = require('mongoose');


const todoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  // user: userSchema
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   refPath: 'fromId',
  // },
  // fromId: {
  //   type: String,
  //   // Only the values that we pass into this array
  //   // will be accepted, any other value will throw error
  //   enum: [
  //     'Admin',
  //     'Faculty'
  //   ],
  //   default: 'Admin',
  // }


}, {
  timestamps: true
});

// 2 different schemas Admin and Faculty
// when these guys send notifications
// we create that in our database
// the fromId can either be an admin or faculty

module.exports = model('Todo', todoSchema);