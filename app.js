// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI Constructor
function UI() {

}

function Store() {
  let books;

      // check local storage
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
}

function addBook(book) {
  const books = Store();
  books.push(book);

      localStorage.setItem('books', JSON.stringify(books));
}

document.addEventListener('DOMContentLoaded', function(){
  const books = Store();
  books.forEach(function(book){
    const ui = new UI;

    // add book to list
    ui.addBookToList(book);
  });
});

function removeBook(isbn) {
  const books = Store();
  books.forEach(function(book, index){
    if(book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

localStorage.setItem('books', JSON.stringify(books));
}

// add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // create tr element
  const row = document.createElement('tr');
  // insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;

  list.appendChild(row);
}

// show alert
UI.prototype.showAlert = function(message, className) {
  // creat div
  const div = document.createElement('div');
  // Add class
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));

  // get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form);

  // timeout in 3 secs
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

  // Delete book
  UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// DOM load event


// Event listener for add new
document.getElementById('book-form').addEventListener('submit', function(e) {
  // get form vars
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  // instantiate book
  const book = new Book(title, author, isbn);
  
  
  // instantiate UI
  const ui = new UI();

  const store = new Store();
  // validate
  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in the field', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // add to local store
    addBook(book);
    // show success
    ui.showAlert('Book Added!', 'success')
    
    // clear field
    ui.clearFields();
  }
  e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  // instantiate UI
  const ui = new UI();
  const store = new Store();
  // delete book
  ui.deleteBook(e.target);
  removeBook(e.target.parentElement.previousElementSibling.textContent);
  //show message
  ui.showAlert('Book remove!', 'success');
  e.preventDefault();
});