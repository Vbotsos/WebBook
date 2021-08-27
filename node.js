const express = require("express");
const path = require("path");
const books = require("./models/books");
const exphbs = require("express-handlebars");
const { create, findAll } = require("./models/books");
var bodyParser = require("body-parser");
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
const port = 8080;

//handlebars middle
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // parse url-encoded content from body
app.use(express.urlencoded({ extended: false }));

// // parse application/json content from body
app.use(express.json());

/* 
    Serve static content from directory "public",
    it will be accessible under path /static, 
    e.g. http://localhost:8080/static/index.html
*/
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`server running on port ${port}`));

app.get("/MyList", (req, res) => {
  let list = books.findAll();
  res.render("list-books", {
    style: "list.css",
    script: "script.js",
    Title: "favourite books",
    list,
  });
});

app.get("/MyList/:code/edit", (req, res) => {
  let book = books.findWithId(req.params.code);
  res.render("edit-books", {
    style: "edit.css",
    script: "script.js",
    Title: "EDIT BOOK",
    book,
  });
});

// serve index.html as content root
app.get("/", function (req, res) {
  var options = {
    root: path.join(__dirname, "public"),
  };

  res.sendFile("index.html", options, function (err) {
    console.log(err);
  });
});

app.post("/MyList", urlencodedParser, (req, res) => {
  const add = books.AddList(req.body.title, req.body.author, req.body.code);
  if (add) {
    res.json(books.findAll());
  } else {
    res.status(400);
    res.json({ msg: `already added with id ${req.body.code}` });
  }
});

app.delete("/MyList", urlencodedParser, (req, res) => {
  const found = books.deleteBook(req.body.code);
  if (found) {
    res.json({
      msg: "Member deleted successfully",
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.body.code}` });
  }
});

app.post("/MyList/:code", urlencodedParser, (req, res) => {
  const id = req.params.code;
  res.redirect(`/MyList/${id}/edit`);
});

app.post("/MyList/:code/edit", urlencodedParser, (req, res) => {
  const id = req.params.code;

  var title = req.body.title;
  var author = req.body.author;
  var rate = req.body.rate;
  if (rate === "") {
    books.setBook(title, author, id);
    console.log(1);
  } else {
    books.updateBook(title, author, id, rate);
    console.log(rate);
    console.log(books.findAll());
  }
  res.redirect("/MyList");
});

app.post("/MyList/:code/delete", urlencodedParser, (req, res) => {
  const id = req.params.code;
  books.deleteBook(id);
  res.redirect("/MyList");
});
