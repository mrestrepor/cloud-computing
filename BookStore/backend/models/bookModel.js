import dynamodb from '../config/db.js';

// Define the BookModel
class BookModel {
  constructor({ id, name, image, author, description, countInStock, price }) {
    this.id = id || uuidv4();
    this.name = name;
    this.image = image;
    this.author = author;
    this.description = description;
    this.countInStock = countInStock;
    this.price = price;
  }

  // Save a book to the DynamoDB table
  async save() {
    const params = {
      TableName: 'Books', // Update with your DynamoDB table name
      Item: {
        id: this.id,
        name: this.name,
        image: this.image,
        author: this.author,
        description: this.description,
        countInStock: this.countInStock,
        price: this.price,
      },
    };

    try {
      await dynamodb.put(params).promise();
      return this;
    } catch (error) {
      throw new Error('Error saving book:', error);
    }
  }

  // Get a book by its ID
  static async getById(id) {
    const params = {
      TableName: 'Books', // Update with your DynamoDB table name
      Key: {
        id,
      },
    };

    try {
      const { Item } = await dynamodb.get(params).promise();
      return Item ? new BookModel(Item) : null;
    } catch (error) {
      throw new Error('Error getting book by ID:', error);
    }
  }

  // Get all books
  static async getAll() {
    const params = {
      TableName: 'Books', // Update with your DynamoDB table name
    };

    try {
      const { Items } = await dynamodb.scan(params).promise();
      return Items.map((item) => new BookModel(item));
    } catch (error) {
      throw new Error('Error getting all books:', error);
    }
  }

  // Update a book
  async update() {
    const params = {
      TableName: 'Books', // Update with your DynamoDB table name
      Key: {
        id: this.id,
      },
      UpdateExpression: 'SET #name = :name, #image = :image, #author = :author, #description = :description, #countInStock = :countInStock, #price = :price',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#image': 'image',
        '#author': 'author',
        '#description': 'description',
        '#countInStock': 'countInStock',
        '#price': 'price',
      },
      ExpressionAttributeValues: {
        ':name': this.name,
        ':image': this.image,
        ':author': this.author,
        ':description': this.description,
        ':countInStock': this.countInStock,
        ':price': this.price,
      },
    };

    try {
      await dynamodb.update(params).promise();
      return this;
    } catch (error) {
      throw new Error('Error updating book:', error);
    }
  }

  // Delete a book
  async delete() {
    const params = {
      TableName: 'Books', // Update with your DynamoDB table name
      Key: {
        id: this.id,
      },
    };

    try {
      await dynamodb.delete(params).promise();
      return this;
    } catch (error) {
      throw new Error('Error deleting book:', error);
    }
  }
}

export default BookModel;
