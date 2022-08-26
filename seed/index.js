const {User, Todo} = require('../models');
const todos = require('./todos');
const users = require('./users');
const mongoose = require("mongoose");


const seeder = async () => {
  await mongoose.connect('mongodb+srv://manny:E0oUeGZUG7FFEIaK@cluster0.sunqecq.mongodb.net/mannysTodos?retryWrites=true&w=majority');

  await Todo.deleteMany();
  await User.deleteMany();

  const newUsers = await User.insertMany(users);


  // console.log(JSON.stringify(newUsers, null, 2));
  //
  todos.forEach((todo, index) => {
    if (index === 0 || index === 1) {
      todo.userId = newUsers[0]._id;
    }

    if (index === 2 || index === 3) {
      todo.userId = newUsers[1]._id;
    }

    if (index === 4 || index === 5) {
      todo.userId = newUsers[2]._id;
    }
  });

  await Todo.insertMany(todos);


  // const foundTodos = await Todo.find().populate({
  //   path: 'userId',
  //   populate: {
  //     path: 'createdById',
  //   }
  // });

  // const foundTodos = await Todo.find().populate([
  //   {
  //     path: 'userId',
  //     populate: {
  //       path: 'createdById',
  //     }
  //   },
  //   {
  //     path: 'authorId',
  //     populate: {
  //       path: 'createdById',
  //     }
  //   },
  //   {
  //     path: 'lastUpdatedById',
  //     populate: {
  //       path: 'createdById',
  //     }
  //   },
  // ]);

  const foundTodos = await Todo.find(
    {
      $or: [
        {
          userId: newUsers[1]._id,
        },
        {
          userId: newUsers[2]._id,
        },
        {
          todo: 'Finish homework 14'
        }
      ]
    }
    // {
    //   userId: {
    //     $in: [newUsers[1]._id, newUsers[2]._id]
    //   }
    // }
  ).populate({
    path: 'userId',
    select: '-email -age'
  });


  const angies = await User.findByFirstName('Angie');


  newUsers.forEach(user => {
    user.sayGreeting();
  });


  process.exit(0);

};

seeder();