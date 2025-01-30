import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import User from "../models/User";
import auth, { RequestWithUser } from "../middleware/auth";

const tracksHistoryRouter = express.Router();


tracksHistoryRouter.get('/', auth, async(req, res, next)=>{
    try{
        const user = (req as RequestWithUser).user;  
        
        if (user) {
            const tracks = await TrackHistory.find({user: user._id});
            return res.send(tracks);
        }

        return res.status(401).send({error: 'Unauthorized'});

    }catch(e){
        next(e)
    }
})

tracksHistoryRouter.post('/',  async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        if (!headerValue){
            return res.status(401).send({error: 'Unauthorized'});
        }
        const [_bearer, token] = headerValue.split(' ');
        const user = await User.findOne({token});
        if (!user){
            return res.status(401).send({error: 'Unauthorized'});
        }
        const userHistory = {
            user: user._id,
            track: req.body.track,
            date: new Date().toISOString(),
        };

        const trackHistory = new TrackHistory(userHistory);
        await trackHistory.save();

        return res.send(userHistory);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default tracksHistoryRouter;