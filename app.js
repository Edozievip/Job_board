const express = require("express");
// require("dotenv").config();
const ejs = require("ejs");
// const session = require("express-session");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const crypto = require("crypto");
// const flash = require("express-flash");
const methodOverride = require('method-override');
const {connectDb} = require("./database/db");
// const User = require("./models/userModel");
const blogRoutes = require("./routes/blogRoutes");



// const generateSecretKey = () => {
//   return crypto.randomBytes(32).toString("hex");
// };

// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

// const port = process.env.PORT;
const app = express();
const port = 5000;
// const secretKey = generateSecretKey();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(blogRoutes)

// app.use(session({
//   secret: secretKey,
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

  // passport config
  // passport.use(new LocalStrategy((email, password, done) => {
  //   User.findOne({ email: email }, (err, user) => {
  //     if (err) return done(err.message);
  //     if (!user) return done(null, false, { message: 'Incorrect username.' });

  //     bcrypt.compare(password, user.password, (err, res) => {
  //       if (err) return done(err.message);
  //       if (!res) return done(null, false, { message: 'Incorrect password.' });

  //       return done(null, user);
  //     });
  //   });
  // }));


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
  //   // User.findById(id, (err, user) => {
  //   //   done(err, user);
  //   User.findById(id)
  //     .exec()
  //     .then((user) => {
  //       done(null, user);
  //     })
  //     .catch((err) => {
  //       done(err);
  //   });
  // });








  // creating a connection to the database and starting the server
  (async function () {
    try {
      await connectDb();
      app.listen(port, () => console.log(`Server listening on port ${port}!`));
    } catch (err) {
      console.log(err.message);
    }
    
  }) ();
