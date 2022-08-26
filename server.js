const express = require('express');
const mongoose = require('mongoose');
const {User, Hobby } = require('./models');

const app = express();

const PORT = process.env.PORT || 3001;

mongoose.connect('')
  .then(() => {
    console.log('Success!!!!');
  })
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.post('/api/users', async (req, res) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
      weapons: {
        primaryWeapon: req.body.primaryWeapon,
        secondaryWeapon: req.body.secondaryWeapon,
      },
      hobbies: [req.body.hobbies],
    });

    res.json(newUser);
  } catch (error) {
    res.status(500).json({error});
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
});


app.put('/api/users/addHobby/:userId', async (req, res) => {
  try {
    //   console.log(req.body)
    // // this way takes 2 trips to the database
    // //   finds the user first
    //   const user = await User.findById(req.params.userId);
    // //   // makes the update, but it is not saved to the database
    //   user.hobbies.push(...req.body.hobby);
    // //   // this saves the updates that we made to the database
    //   await user.save();

    const newHobby = await Hobby.create(req.body);

    // 1 trip to the database, but will add duplicates
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        // delete everything that matches this element in the array
        $pull: {
          hobbyIds: '63083edf7b60103b9c1aa859',
        },
        // how to add to an array, but will add even if data is already there
        // $push: {
        //   hobbies: req.body.hobby,
        // },
        // add an element to an array but will prevent duplicates
        // $addToSet: {
        //   hobbyIds: newHobby._id,
        // },
      },
      {
        new: true,
      }
    ).populate('hobbyIds');
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
});


app.put('/api/users/:userId', async (req, res) => {
  try {
    // findByIdAndUpdate takes 3 params
    // 1st one is ID of thing we want to update
    // 2nd one is what updates we want to make
    // 3rd one is configuration   e.g  should we call schema "hooks"
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {...req.body},
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({error});
  }
});


app.delete('/api/users/:userId', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({error});
  }
});


app.listen(PORT, () => console.log('server started successfully'));
