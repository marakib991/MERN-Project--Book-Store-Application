import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

//Middleware for handling CORS Policy
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5500',
//   methods: ['GET','POST','PUT','DELETE'],
//   allowedHeaders:['Content-type'],
// })
// );

app.get('/', (req, res)=>{
  console.log(req);
  return res.status(234).send('Welcome to the server');
});

app.use('/books', booksRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
  console.log('App is connected to database');
  app.listen(PORT, () =>{
    console.log(`App is listening on Port: ${PORT}`);
  });
})
.catch((err)=>{
  console.log(err);
});