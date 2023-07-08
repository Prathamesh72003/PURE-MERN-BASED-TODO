const express = require('express');
const router = express.Router();
const todoDB = require('../models/todomodel');

router.get('/', async(req, res)=>{
    try {
        const data = await todoDB.find();
        res.send(data);
    } catch (error) {
        res.json({message: error.message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const searchedtask = await todoDB.findById(req.params.id);

        if(searchedtask == null){
            res.status(404).json({mesasge: 'Task not found'});
        }

        res.send(searchedtask);
    }catch(e){
        res.json({message: e.message});
    }
});

router.post('/', async(req, res)=>{
    const sendData = new todoDB({
        title: req.body.title,
        description: req.body.description,
        // status: req.body.description
    })

    try {
        const data = await sendData.save();
        res.json(data);
    } catch (error) {
        res.json({message: error.message});
    }
});

router.patch('/:id', async(req, res)=>{
    try {
        const updatetask = await todoDB.findById(req.params.id);

        if(updatetask == null){
            res.status(404).json({ message: 'Task not found!' });
        }

        if(req.body.title != null){
            updatetask.title = req.body.title;
        }

        if(req.body.description != null){
            updatetask.description = req.body.description;
        }

        const newUpates = await updatetask.save();
        res.status(200).json({message: 'Task updated'});
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deltask = await todoDB.findById(req.params.id);
        
        if (deltask == null) {
            res.status(404).json({ message: 'Task not found!' });
        }
        
        await deltask.deleteOne();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
});


module.exports = router;