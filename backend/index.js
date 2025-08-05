            
import express, { json } from 'express';
import slowDown from 'express-rate-limit';
import cors from 'cors';
// import fetch from 'node-fetch';
import axios from 'axios';
import dotenv from 'dotenv';
// require('dotenv').config();
dotenv.config();
const app = express();

const apiKey = process.env.API_KEY;
const catUrl = "https://api.thecatapi.com/v1/images/";
const stoicUrl = "https://stoic.tekloon.net/stoic-quote";

const speedLimiter = slowDown({
  windowMs: 1 * 2 * 1000,
  delayAfter: 1,
  delayMs: (hits) => hits * 1000,
});
app.use(speedLimiter);

app.use(cors());
app.use(json());

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.get('/api/stoicquote', async(req, res, next) => {
     try {
    const response = await axios.get(stoicUrl);
    console.log(response);

    res.status(200).json(response.data);

    } catch (err) {
        res.status(400).send(err);
    }
})

app.get('/api/catimage', async(req, res, next) => {
     try {
    const response = await axios.get(`${catUrl}search?api_key=${apiKey}&has_breeds=1`);
    console.log(response.data);

    res.status(200).json(response.data);

    } catch (err) {
        res.status(400).send(err);
    }
})

app.listen(3000);