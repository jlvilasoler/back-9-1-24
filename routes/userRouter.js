import { Router } from "express";
import { userModel } from "../src/dao/models/user.model.js";

const router = Router();


//registrar el usuario en la base de datos
router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body; // leemos los datos que llegan de formulario

    const userExist = await userModel.findOne( {email} ); // buscamos si el usuario existe 

    if(userExist) {
        return res.send("you are already registered")
    }

    const user = await userModel.create({
        first_name, last_name, email, age, password,
    });

    req.session.first_name = first_name;
    req.session.last_name = last_name;
    req.session.email = email;
    req.session.age = age;

    req.session.isLogged = true;

    res.redirect('/profile'); // lo redirigimos a profile
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body; // leemos los datos que llegan de formulario
    const user = await userModel.findOne( {email, password} ).lean();

    if(!user) {
        return res.send("El usuario o la contraseña no son validas");
    }

    req.session.first_name = user.first_name;
    req.session.last_name = user.last_name;
    req.session.email = user.email;
    req.session.age = user.age;

    req.session.isLogged = true;

    res.redirect('/profile');
});

export default router;