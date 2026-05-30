const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const booksClient = axios.create({
  adapter: async (config) => ({
    data: books,
    status: 200,
    statusText: "OK",
    headers: {},
    config
  })
});

const getAllBooks = async () => {
  const response = await booksClient.get("/books");
  return response.data;
};

public_users.post("/register", (req,res) => {
  const username = req.body.username || req.query.username;
  const password = req.body.password || req.query.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered" });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const allBooks = await getAllBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({ message: "Unable to retrieve books" });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const allBooks = await getAllBooks();
  const book = allBooks[req.params.isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const allBooks = await getAllBooks();
  const author = req.params.author.toLowerCase();
  const results = Object.fromEntries(
    Object.entries(allBooks).filter(([, book]) => book.author.toLowerCase() === author)
  );

  if (Object.keys(results).length === 0) {
    return res.status(404).json({ message: "No books found for this author" });
  }

  return res.status(200).json(results);
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  const allBooks = await getAllBooks();
  const title = req.params.title.toLowerCase();
  const results = Object.fromEntries(
    Object.entries(allBooks).filter(([, book]) => book.title.toLowerCase() === title)
  );

  if (Object.keys(results).length === 0) {
    return res.status(404).json({ message: "No books found for this title" });
  }

  return res.status(200).json(results);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
