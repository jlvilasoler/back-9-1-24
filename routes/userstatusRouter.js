import { Router } from "express";
import { getAllUsersService } from "../src/Services/UserServices.js";

const router = Router();


router.get('/', async (req, res) => {
    const users = await getAllUsersService();
    res.render('users',
        { users }
    )
});

export default router;