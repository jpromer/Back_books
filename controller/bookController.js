import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";
import { dynamoClient } from "../config/db.js";
import books from "../data/books.js";
import {
  QueryCommand,
  ScanCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";

const getBooksById = asyncHandler(async (req, res) => {
  const params = {
    TableName: "Books",
    KeyConditionExpression: "#attr = :value",
    ExpressionAttributeNames: {
      "#attr": "id",
    },
    ExpressionAttributeValues: {
      ":value": { S: req.params.id },
    },
  };

  try {
    const data = await dynamoClient.send(new QueryCommand(params));
    const items = data.Items.map((item) => unmarshall(item));
    res.send(items);
  } catch (err) {
    res.status(500).json({ message: "Error get book" });
  }
});

const getBooks = asyncHandler(async (req, res) => {
  const params = {
    TableName: "Books",
  };
  try {
    const data = await dynamoClient.send(new ScanCommand(params));
    const items = data.Items.map((item) => unmarshall(item));
    res.send(items);
  } catch (err) {
    res.status(500).json({ message: "Error get books" });
  }
});

const postBooks = asyncHandler(async (req, res) => {
  const bookData = req.body;

  const params = {
    TableName: "Books",
    Item: marshall(
      {
        id: uuid(),
        name: bookData.name,
        image: bookData.image,
        author: bookData.author,
        description: bookData.description,
        countInStock: bookData.countInStock,
        price: bookData.price,
      },
      { removeUndefinedValues: true }
    ),
  };

  try {
    await dynamoClient.send(new PutItemCommand(params));
    res.status(201).json({ message: "Book created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating book" });
  }
});

export { getBooksById, getBooks, postBooks };
