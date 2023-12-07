import { Router } from 'express';
import sendMail from '../src/Services/mail.service.js';

const router = Router();

router.get("/", async (req, res) => {
    res.render('settings', {});
});


export default router;