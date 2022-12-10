import express, { Application } from 'express';
import reveal from 'reveal-sdk-node';
import cors from "cors";

const app: Application = express();

app.use(cors());

app.use("/", reveal());

app.listen(5111, () => {
	console.log(`Reveal server accepting http requests`);
});