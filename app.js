const sheetParser = require("./sheet-parser");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3001;

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
  app.get("/", async (req, res) => {
    const bookList = await sheetParser.get_book_list();
    const bookcaseNums = sheetParser.get_bookcase_nums(bookList);

    res.render("index", {
      bookList: bookList,
      bookcaseNums: bookcaseNums,
    });
  });
/*
function managePage(req, res) {
  const bookList = sheetParser.getBookList();
  const bookcaseNums = sheetParser.getBookcaseNums(bookList);
  const manage = sheetParser.getManage();

  res.render("manage", {
    sheetNames: sheetNames,
    bookList: bookList,
    bookcaseNums: bookcaseNums,
    genre: genre,
    manage: manage,
  });
}
app.get("/manage", function (req, res) {
  res.render("check-password", { isFail: false });
});

app.post("/manage", function (req, res) {
  const manage = sheetParser.getManage()[0];
  const input = req.body.password;
  if (input !== manage.PW) {
    res.render("check-password", { isFail: true });
  } else {
    managePage(req, res);
  }
});

app.get("/map", (req, res) => {
  const num = req.query.num;
  res.render("map", {
    num: num,
  });
});
app.get("/reload", (req, res) => {
  sheetParser.reloadXlsx();
  res.redirect("/");
});

*/

app.listen(port, () => {
  console.log(`Starting server : http://localhost:${port}`);
});
