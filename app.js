const express = require("express");
const ejs = require("ejs");
const db = require("./database/db");
// const Client = require('./models/postJob');
const PostJobModels = require("./models/postJob");

const app = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// START GET FILES
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/post-job", (req, res) => {
  try {
    res.status(200).render("post-job");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/viewpost", async (req, res) => {
  try {
    const client = await PostJobModels.find().sort({ createdAt: -1 });
    // console.log(blogs);
    res.status(200).render("view-post", { client });
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/update_post", async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);

    const blog = await PostJobModels.findOne({ name });

    console.log(blog);
    res.status(200).render("update-post", { blog, query: { name } });
  } catch (err) {
    console.log(err.message);
  }
});
// END GET FILES

// START CREATE POST
// app.post('/post', async (req, res) => {
//     try {
//       const client = new PostJobModels(req.body);
//   // console.log(client);

//       await client.save();
//     //   res.render('success')
//       res.status(200).redirect('/');
//     } catch (err) {
//       console.log(err.message);
//     }
//   });

app.post("/post", async (req, res) => {
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
});

// edit post
app.post("/update_post", async (req, res) => {
  try {
    const { name } = req.query;
    const updateclient = await PostJobModels.findOneAndUpdate(
      { name },
      req.body
    );
    // updateclient.save();

    res.render("success");
  } catch (err) {
    console.log(err.message);
  }
});
// END CREATE POST


// login/createAccount start


app.get('/create-account', (req, res) => {
  try {
    res.render('createAccount');
  }
  catch (err) {
    console.log(err.message);
  }
});

app.post('/create-account', (req, res) => {
  const { name, email, password } = req.body;
  // Implement account creation logic here using name, email, and password
  users.push({ name, email, password });
  res.send('Account created successfully');
});

app.get('/login-or-create', (req, res) => {
  try {
    res.render('loginOrCreate');
  }
  catch (err) {
    console.log(err.message);
  }
  res.render('');
});
// login/createAccount stop

// creating a connection to the database and starting the server
async function connectDbs() {
  try {
    await db;
    console.log("Connected to MongoDB!");

    app.listen(port, () => {
      console.log(`Server listening on port ${port}!`);
    });
  } catch (err) {
    console.log(err);
  }
}
connectDbs();
