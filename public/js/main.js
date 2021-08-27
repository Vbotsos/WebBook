//here fetch for px1

const searchFormTitle = document.getElementById("search-form-title");
const searchFormAuthor = document.getElementById("search-form-author");
const searchTitle = document.getElementById("title");
const searchAuthor = document.getElementById("author");
let tar;

searchFormTitle.addEventListener("submit", (e) => {
  //Get search title
  const TitleTerm = searchTitle.value;
  console.log(TitleTerm);

  //check title
  if (TitleTerm === "") {
    //show message
    showMessage("Please add a title term");
  }
  //clear input
  TitleTerm.value = "";

  //search for the title
  const url = `https://reststop.randomhouse.com/resources/titles?search=${TitleTerm}`;
  getTitles(url);

  e.preventDefault();
});

searchFormAuthor.addEventListener("submit", (e) => {
  //Get search author
  const AuthorTerm = searchAuthor.value;
  console.log(AuthorTerm);

  //check author
  if (AuthorTerm === "") {
    //show message
    showMessage("Please add an author term");
  }
  //clear input
  AuthorTerm.value = "";

  //search
  console.log(AuthorTerm);
  const url = `https://reststop.randomhouse.com/resources/titles?search=${AuthorTerm}`;
  getTitlesFromAuthor(url);

  e.preventDefault();
});

//url = "localhost:8080/MyList";
//add book to my list

document.getElementById("outTitles").addEventListener("click", (e) => {
  tar = e.target;
  AddItem("http://localhost:8080/MyList", e.target);

  reset.style.visibility = "visible";
});

document.getElementById("outAuthor").addEventListener("click", (e) => {
  tar = e.target;
  AddItem("http://localhost:8080/MyList", e.target);

  reset.style.visibility = "visible";
});

const reset = document.getElementById("reset");
reset.addEventListener("click", (e) => {
  var doc = tar.previousElementSibling;
  console.log(doc);
  var isbn;
  for (var i = 0; i < doc.childNodes.length; i++) {
    if (doc.childNodes[i].className == "isbn") {
      isbn = doc.childNodes[i].innerHTML;
    }
  }
  console.log("isbn: ", isbn);
  dellItem("http://localhost:8080/MyList", isbn);
  reset.style.visibility = "hidden";
});

let myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

let init = {
  method: "GET",
  headers: myHeaders,
};

function getTitles(url) {
  fetch(url, init)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var Info = document.getElementById("template").innerHTML;
      var template = Handlebars.compile(Info);
      var generated = template(data);
      var cont = document.getElementById("outTitles");
      cont.innerHTML = generated;
    })
    .catch((err) => console.log(err));
}

function getTitlesFromAuthor(url) {
  fetch(url, init)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var Info = document.getElementById("template").innerHTML;
      var template = Handlebars.compile(Info);
      var generated = template(data);
      var cont = document.getElementById("outAuthor");
      cont.innerHTML = generated;
    })
    .catch((err) => console.log(err));
}

function showMessage(message) {
  //create div
  const div = document.createElement("div");
  //add class
  div.className = "alert";
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const searchContainer = document.getElementById("searchContainer");
  const search = document.getElementById("search");

  searchContainer.insertBefore(div, search);
}

let myHeaders2 = new Headers();
myHeaders2.append("Content-type", "application/json");

function AddItem(url, target) {
  if (target.classList.contains("btn")) {
    var doc = target.previousElementSibling;
    console.log(doc);
    var title, author, isbn;

    for (var i = 0; i < doc.childNodes.length; i++) {
      if (doc.childNodes[i].className == "title") {
        title = doc.childNodes[i].innerHTML;
      }
      if (doc.childNodes[i].className == "author") {
        author = doc.childNodes[i].innerHTML;
      }
      if (doc.childNodes[i].className == "isbn") {
        isbn = doc.childNodes[i].innerHTML;
      }
    }
    if (title === "" || author === "" || isbn === "") {
      console.log("press +");
    } else {
      var obj = { title: title, author: author, code: isbn };
      var myJSON = JSON.stringify(obj);
    }
    let initp = {
      method: "POST",
      headers: myHeaders2,
      body: JSON.stringify({ title: title, author: author, code: isbn }),
    };
    fetch(url, initp)
      .then((res) => {
        res.json();
        console.log("success:", res.ok);
      })
      .catch((error) => console.log("Authorization failed : " + error.message));
  }
}

function dellItem(url, isbn) {
  console.log("In DeleteItem");
  let initd = {
    method: "DELETE",
    headers: myHeaders2,
    body: JSON.stringify({ code: isbn }),
  };
  fetch(url, initd)
    .then((res) => {
      res.json();
      console.log("success:", res.ok);
    })
    .catch((error) => console.log("Authorization failed : " + error.message));
}
