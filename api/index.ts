import express from "express";
import config from "./config";
import cors from "cors";
import * as mongoose from "mongoose";
import artistRouter from "./routers/artist";
import albumRouter from "./routers/album";
import tracksRouter from "./routers/track";
import userRouter from "./routers/user";
import tracksHistoryRouter from "./routers/trackHistory";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static('public'));
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', tracksRouter);
app.use('/user', userRouter);
app.use('/track_history', tracksHistoryRouter);

const run = async()=>{
    await mongoose.connect('mongodb://localhost/homeWorks');
    app.listen(port,()=>{
        console.log('Listening on port ',port);
    });

    process.on('exit', ()=>{
        mongoose.disconnect();
    });
}

run().catch(console.error);