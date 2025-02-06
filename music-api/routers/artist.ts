import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";

const artistRouter = express.Router();

artistRouter.get('/', async(req, res, next) => {
    try{
        const artists = await Artist.find();
        return res.send(artists);
    }catch (error){
        next(error);
    }
})

artistRouter.get('/:id', async(req, res, next) => {
    try{
        const artist = await Artist.findById(req.params.id);
        return res.send(artist);
    }catch (error){
        next(error);
    }
})

artistRouter.post('/', auth, imagesUpload.single('image'),  async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        
        if (!user) {
            res.status(403).send({error: 'Unauthorized'});
        }
        
        const artistMutation = {
            name: req.body.name,
            description: req.body.description ? req.body.description : null,
            image: req.file ? req.file.filename : null,
            isPublished: false,
        };
        
        const artist = new Artist(artistMutation);
        
        await artist.save();
        return res.send(artist);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

artistRouter.patch('/:id/togglePublished', auth, permit('admin'), async(req, res, next)=>{
    try{
        const artist = await Artist.findById(req.params.id);
        await Artist.findByIdAndUpdate(req.params.id, {isPublished: !artist?.isPublished});
        return res.send(artist);
    }catch(e){
        next(e);
    }
});

artistRouter.delete('/:id', auth, permit('admin'), async(req, res, next)=>{
    try{
        const artist = await Artist.findByIdAndDelete(req.params.id);
        return res.send(artist);
    }catch(e){
        next(e);
    }
});

export default artistRouter;