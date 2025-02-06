import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";

const albumRouter = express.Router();

albumRouter.get('/', async(req, res, next) => {
    try{
        const albums = await Album.find();
        return res.send(albums);
    }catch (error){
        next(error);
    }
})

albumRouter.get('/:id', async(req, res, next) => {
    try{
        const albums = await Album.findById(req.params.id);
        return res.send(albums);
    }catch (error){
        next(error);
    }
})

albumRouter.post('/', auth, imagesUpload.single('image'),  async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        if (!user) {
            res.status(403).send({error: 'Unauthorized'});
        }

        const albumMutation = {
            name: req.body.name,
            artist: req.body.artist,
            date: new Date(),
            image: req.file ? req.file.filename : null,
        };

        
        const albums = new Album(albumMutation);
        await albums.save();

        return res.send(albums);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

albumRouter.patch('/:id/togglePublished', auth, permit('admin'), async(req, res, next)=>{
    try{
        const album = await Album.findById(req.params.id);
        await Album.findByIdAndUpdate(req.params.id, {isPublished: !album?.isPublished});
        return res.send(album);
    }catch(e){
        next(e);
    }
});

albumRouter.delete('/:id', auth, permit('admin'), async(req, res, next)=>{
    try{
        const album = await Album.findByIdAndDelete(req.params.id);
        return res.send(album);
    }catch(e){
        next(e);
    }
});

export default albumRouter;