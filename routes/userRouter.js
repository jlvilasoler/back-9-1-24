import { Router } from "express";
import { userModel } from "../src/dao/models/user.model.js";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";


const router = Router();


//registrar el usuario en la base de datos
router.post('/signup', publicRoutes, async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body; // leemos los datos que llegan de formulario
        let role = "user"; // Usamos let en lugar de const para permitir la reasignación

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            // Asigna un rol de "admin" a las credenciales específicas si lo deseas
            role = "admin";

        }



        const userExist = await userModel.findOne({ email }); // buscamos si el usuario existe

        if (userExist) {
            return res.send("you are already registered");
        }

        const user = await userModel.create({
            first_name, last_name, email, age, password, role,
        });

        req.session.first_name = first_name;
        req.session.last_name = last_name;
        req.session.email = email;
        req.session.age = age;

        req.session.isLogged = true;

        res.redirect('/profile'); // lo redirigimos a profile
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in user registration");
    }
});



router.post('/login', publicRoutes,   async (req, res) => {
    const { email, password } = req.body; // leemos los datos que llegan de formulario
    const user = await userModel.findOne( {email, password} ).lean();

    if(!user) {
        return res.send("The username or password is not valid");
    }

    req.session.first_name = user.first_name;
    req.session.last_name = user.last_name;
    req.session.email = user.email;
    req.session.age = user.age;
    req.session.role = user.role;

    req.session.isLogged = true;

    res.redirect('/profile'); //antes decia profile
});

export default router;