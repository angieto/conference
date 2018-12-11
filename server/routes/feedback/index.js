const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { feedbackService } = param;

    router.get('/', async (req, res, next) => {
        try {
            const feedbackList = await feedbackService.getList();
            return res.render('feedback', {
                page: 'Feedback',
                feedbackList
            });
        } catch (err) {
            return err;
        }
    });

    router.post('/', (req, res, next) => {
        return res.render();
    });
    
    return router;
};