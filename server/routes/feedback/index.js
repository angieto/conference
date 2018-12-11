const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { feedbackService } = param;

    router.get('/', async (req, res, next) => {
        try {
            const feedbackList = await feedbackService.getList();
            return res.render('feedback', {
                page: 'Feedback',
                feedbackList,
                success: req.query.success
            });
        } catch (err) {
            return err;
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            console.log(req.body);
            const fbName = req.body.fbName.trim();
            const fbTitle = req.body.fbTitle.trim();
            const fbMessage = req.body.fbMessage.trim();
            const feedbackList = await feedbackService.getList();
            // handle form errors
            if (!fbName || !fbTitle || !fbMessage) {
                return res.render('feedback', {
                    page: 'Feedback',
                    error: true,
                    fbName,
                    fbTitle,
                    fbMessage,
                    feedbackList
                })
            }
            // store the data to the page
            await feedbackService.addEntry(fbName, fbTitle, fbMessage);
            return res.redirect('/feedback?success=true');
        } catch (err) {
            return next(err);
        }
    });
    
    return router;
};