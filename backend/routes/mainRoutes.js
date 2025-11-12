import express from 'express'
import {inputFIle,quoteOfTheDay} from '../controllers/inputFile.js';

const routes = express.Router();

routes.post("/PostRes", inputFIle)
routes.post("/PostQuote",quoteOfTheDay)
export default routes;