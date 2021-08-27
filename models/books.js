let books = [];
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

function create(title, author, id) {
  return new Book(title, author, id);
}

function findAll() {
  return [...books];
}

function findWithId(id) {
  for (var i = 0; i < books.length; i++) {
    if (id === books[i].id) {
      console.log("found it", books[i]);
      return books[i];
    } else {
      console.log("not found");
    }
  }
}

function setBook(title, author, id) {
  for (var i = 0; i < books.length; i++) {
    if (id === books[i].id) {
      books[i].title = title;
      books[i].author = author;
      console.log("found it", books[i]);
    }
  }
}

function AddList(title, author, id) {
  for (var i = 0; i < books.length; i++) {
    if (id === books[i].id) {
      console.log("it's already there!");
      return false;
    }
  }
  books.push(create(title, author, id));
  return true;
}

function updateBook(title, author, id, rate) {
  for (var i = 0; i < books.length; i++) {
    if (id === books[i].id) {
      var rat = { rate: rate };
      books.Book.splice(books[i], 0, rate);
      return;
    }
  }
}

function deleteBook(code) {
  for (var i = 0; i < books.length; i++) {
    if (code === books[i].id) {
      books.splice(i, 1);
    }
  }
  return true;
}

module.exports = {
  create: create,
  findAll: findAll,
  findWithId: findWithId,
  updateBook: updateBook,
  deleteBook: deleteBook,
  AddList: AddList,
  setBook: setBook,
};
