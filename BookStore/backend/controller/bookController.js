import asyncHandler from 'express-async-handler'
import BookModel from '../models/bookModel.js';

// Create a new book
const createBook = async (req, res) => {
  try {
    const { name, image, author, description, countInStock, price } = req.body;
    const book = new BookModel({
      name,
      image,
      author,
      description,
      countInStock,
      price,
    });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a book by ID
const getBooks = async (req, res) => {
  try {
    const book = await BookModel.getAll();
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a book by ID
const getBooksById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.getById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, author, description, countInStock, price } = req.body;
    const book = await BookModel.getById(id);
    if (book) {
      book.name = name;
      book.image = image;
      book.author = author;
      book.description = description;
      book.countInStock = countInStock;
      book.price = price;
      const updatedBook = await book.update();
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.getById(id);
    if (book) {
      await book.delete();
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createBook, getBooksById, deleteBook, getBooks }