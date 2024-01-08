const router = require('express').Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const crypto = require("crypto");
const flash = require("express-flash");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const {
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
} = require('../controllers/blogControllers');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
const secretKey = generateSecretKey();



router.use(session({
  secret: secretKey,
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());



function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


// passport config
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'Incorrect email.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('incorrect password');

      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .exec()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
  });
});


// START GET FILES
router.get("/", homePage);

router.get("/about", aboutPage);

router.get("/post-job", postJobPage);

router.get("/viewpost", isAuthenticated, viewJob);

router.get('/single-view', singleRequest);

router.get("/update-post", updatePostPage);
// END GET FILES


router.post("/post", postJob);

// OPEN POST FILES
router.post("/update-post", updatePost);
// CLOSE POST FILES

// OPEN LOGIN/CREATEACCCOUNT
router.get("/create-account", createAccountPage);

router.post("/create-account", createAccount);

router.get("/login", loginPage);

router.post("/login", passport.authenticate('local', {
  successRedirect: '/viewpost',
  failureRedirect: '/login',
  failureFlash: true,

  successFlash: 'Login successful!',
  failureFlash: 'Incorrect email or password',
}));

router.get('/logout', logOut);
// CLOSE LOGIN/CREATEACCCOUNT


// OPEN DELETE POST
router.get('/delete-post/:id', deletePost);
// CLOSE DELETE POST


router.get('*', errorHandler);

module.exports = router;