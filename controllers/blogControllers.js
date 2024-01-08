// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
// const session = require("express-session");

const User = require("../models/userModel");
const PostJobModels = require("../models/postJob");




// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }




// passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.log('User not found');
//       return done(null, false, { message: 'Incorrect email.' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       console.log('incorrect password');

//       return done(null, false, { message: 'Incorrect password.' });
//     }

//     return done(null, user);
//   } catch (error) {
//     return done(error);
//   }
// }));



// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .exec()
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => {
//       done(err);
//   });
// });





const homePage = (req, res) => {
  try {
    res.status(200).render("home");
  } catch (err) {
    console.log(err.message);
  }
};

const aboutPage = (req, res) => {
  try {
    res.status(200).render("about");
  } catch (err) {
    console.log(err.message);
  }
};

const postJobPage = (req, res) => {
  try {
    res.status(200).render("post-job");
  } catch (err) {
    console.log(err.message);
  }
};

const viewJob = async (req, res) => {
  try {
    const client = await PostJobModels.find().sort({ createdAt: -1 });
    // console.log(blogs);
    res.status(200).render("view-post", { client, messages: req.flash('messages') });
  } catch (err) {
    console.log(err.message);
  }
};

const singleRequest = async (req, res) => {
  try {
    const { category } = req.query;
    const blog = await PostJobModels.find({ category });
    res.status(200).render('single-view', {blog, query: {category} });

  } catch (err) {
    console.log(err.message);
  }
};

const updatePostPage = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);

    const blog = await PostJobModels.findOne({ name });

    console.log(blog);
    if (!blog) {
      return res.status(404).send('notfound');
    }

    res.render('update-post', { blog });
  } catch (err) {
    console.log(err.message);
  }
};

const postJob = async (req, res) => {
  try {
    if (req.body) {
      const client = new PostJobModels(req.body);
      // console.log(client);

      await client.save();
      res.render("success");
      res.status(200).redirect("/view-post");
    } else {
      res.send("error");
      res.status(500).redirect("/");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { name, email, category, job_description } = req.body;
    const updatedBlog = await PostJobModels.findOneAndUpdate(
      { name },
      { email, category, job_description },
      { new: true }
    );
    // updateclient.save();

    if (updatedBlog) {
      // If the document was found and updated
      res.render("success");
    } else {
      // If the document with the specified name was not found
      res.status(404).render("notfound");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const createAccountPage = (req, res) => {
  try {
    res.render("createAccount");
  } catch (err) {
    console.log(err.message);
  }
};

const createAccount = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const loginPage = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err.message);
  }
};

// const login = passport.authenticate('local', {
//   successRedirect: '/viewpost',
//   failureRedirect: '/login',
//   failureFlash: true,

//   successFlash: 'Login successful!',
//   failureFlash: 'Incorrect email or password',
// });

const logOut = (req, res) => {
  req.logout();
  res.redirect('/');
};

const deletePost = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    
    const deleted = await PostJobModels.findByIdAndDelete(id);
    res.status(200).redirect("/viewpost");
    // res.status(200).json({
    //   success: true,
    //   message: { redirect: '/viewPost' }
    // });
  } catch (err) {
    console.log(err.message);
  }
};

const errorHandler = (req, res) => {
  try {
  res.status(404).render('error');
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  homePage,
  aboutPage,
  postJobPage,
  viewJob,
  singleRequest,
  updatePostPage,
  postJob,
  updatePost,
  createAccountPage,
  createAccount,
  loginPage,
  // login,
  logOut,
  deletePost,
  errorHandler,
}