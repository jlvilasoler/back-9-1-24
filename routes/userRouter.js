import { Router } from "express";
import { userModel } from "../src/dao/models/user.model.js";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";
import bcrypt from "bcrypt"
import passport from "passport";

const router = Router();


//registrar el usuario en la base de datos
router.post('/signup', passport.authenticate('register',
{failureRedirect: '/failregister'}), async (req, res) => {
        res.redirect('/profile'); // lo redirigimos a profile
});



router.post('/login', passport.authenticate('login', {failureRedirect: '/failogin'}) ,  async (req, res) => {
  if(!req.user) {
    res.status(400).send();
  }

  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
  };
  console.log("logueado")
  console.log(req.session)
  res.redirect('/profile')
});







router.post('/recover',   async (req, res) => {
    const { email, password } = req.body; // leemos los datos que llegan de formulario
    const user = await userModel.findOne( {email} ).lean();

    if(!user) {
        return res.send("The email is not valid");
    }

    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await userModel.updateOne({email}, user);

    res.redirect('/login'); //antes decia profile
});



export default router;