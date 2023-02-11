// Bookshelf
let myLibrary = [];

// Example Books
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Read");
let book2 = new Book("1984", "George Orwell", 328, "Not Read");
let book3 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1216, "Read");
let book4 = new Book("The Kite Runner", "Khaled Hosseini", 372, "Read");
let book5 = new Book("The Da Vinci Code", "Dan Brown", 454, "Not Read");
let book6 = new Book("The Alchemist", "Paulo Coelho", 197, "Read");
myLibrary.push(book1,book2,book3,book4,book5,book6);


renderBooks();

// Add Book
const addButton = document.querySelector(".addBook");
addButton.addEventListener("click", addBook);

function addBook(event) {
  event.preventDefault();
  const bookName = document.querySelector("#bookName").value;
  const author = document.querySelector("#author").value;
  const pageNumber = document.querySelector("#pageNumber").value;
  let status = document.querySelector("#status").checked;
  if (status === true) {
    status = "Read";
    
  } else {
    status = "Not Read";
  }

  if (bookName === "" || author === "" || pageNumber === "") {
    alert("You need to fill all the fields");
  } else {
    document.querySelector("#bookName").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pageNumber").value = "";
    document.querySelector("#status").value = "true";

    let newBook = new Book(bookName, author, pageNumber, status);
    myLibrary.push(newBook);
  }

  renderBooks();
}

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// Remove Book
function removeItem(event) {
  toRemove = event.currentTarget.parentElement.getAttribute("data-index");
  myLibrary.splice(toRemove, 1);
  renderBooks();
}

// Change read status
function changeStatus(event) {
  const child = event.currentTarget;
  const parent = child.parentElement;
  if (child.innerText == "Read") {
    child.innerText = "Not read";
  } else {
    child.innerText = "Read";
  }
  parent.classList.toggle("read");
}

// Book Render
function renderBooks() {
  const bookShelf = document.querySelector(".bookShelf");

  while (bookShelf.hasChildNodes()) {
    bookShelf.removeChild(bookShelf.firstChild);
  }

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    if (book.status === "Read") {
      bookCard.classList.add("read");
    }
    bookCard.setAttribute("data-index", index);
    bookShelf.appendChild(bookCard);

    const bookName = document.createElement("h2");
    bookName.classList.add("name");
    bookName.innerText = book.title;
    bookCard.appendChild(bookName);

    const bookAuthor = document.createElement("h3");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = book.author;
    bookCard.appendChild(bookAuthor);

    const bookPage = document.createElement("p");
    bookPage.classList.add("page");
    bookPage.innerHTML = `Page: ${book.pages}`;
    bookCard.appendChild(bookPage);

    const statusButton = document.createElement("button");
    statusButton.classList.add("status");
    statusButton.innerText = book.status;
    statusButton.addEventListener("click", changeStatus);
    bookCard.appendChild(statusButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", removeItem);
    bookCard.appendChild(removeButton);
  });
}
