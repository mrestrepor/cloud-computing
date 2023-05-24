import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js'
import bodyParser from 'body-parser';
import cors from 'cors';


 
dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.use('/api/books/', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} and listening on PORT ${PORT}`.blue)
  })

app.get('/', (req, res) => {
    res.send('API is running...')
})

