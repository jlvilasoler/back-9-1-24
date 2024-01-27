import { Router } from "express";
import { userModel } from "../src/dao/models/user.model.js";
import privateRoutes from "../src/middlewares/privateRoutes.js";
import publicRoutes from "../src/middlewares/publicRoutes.js";
import bcrypt from "bcrypt"
import passport from "passport";
import { deleteController, getAllUsersController, getUserByIdController } from "../src/Controllers/UserController.js";

const router = Router();



// En la ruta GET, debe devolver el usuario indicado 
router.get('/users/:uid', privateRoutes, getUserByIdController);

// En la ruta DELETE, debe eliminar el usuario indicado
router.delete('/users/:uid', privateRoutes, deleteController);

router.post('users/premium/:uid', async (req, res) => {
  if(!user) {}
  if(user.rol === 'user') {
    user.role = 'premium'
  }
  await user.updateUser(uid, user)
}) 

router.post('users/:uid/documents', async (req, res, next) => {
  try{
      const {uid} = req.params;
      const user = await userController.updateUser(uid)
      if(!user) {return res.status(404).send('Usuario no encontrado');}

      if(!req.body.multer) {
        req.body.multer = {}
      }  req.body.multer.userId = uid;
      next();
  } catch(error) {
    console.error(error); 
  }
  upload.fields([
    {name: "profileImage", maxCount: 1},
    {name: "productImage", maxCount: 1},
    {name: "document"}
  ]),
  (req, res) => {
    const {uid} = req?.params;
    const userId = req.body.multer?.userId;
    res.send("Uploaded Files")
  }
}) 




  //registrar el usuario en la base de datos
  router.post('/signup', passport.authenticate('register',
    { failureRedirect: '/failregister' }), async (req, res) => {
      res.redirect('/login'); // en vez de redirigirlo a profile , lo redirigimos a login
    });

    router.post('/login', passport.authenticate('login', { failureRedirect: '/failogin' }), async (req, res) => {
      if (!req.user) {
        res.status(400).send();
      }
    
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        cart: req.user.cart,
        role: req.user.role,
      };
    
      // Agregar la lógica de redireccionamiento según el rol del usuario
      if (req.user.role === "admin") {
        res.redirect('/profileadmin');
      } else {
        res.redirect('/profile');
      }
    });

router.post('/recover', async (req, res) => {
  const { email, password } = req.body; // leemos los datos que llegan de formulario
  const user = await userModel.findOne({ email }).lean();

  if (!user) {
    return res.send("The email is not valid");
  }

  user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await userModel.updateOne({ email }, user);
  res.redirect('/login');
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] })); // nos lleva a github

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      cart: req.user.cart,
      role: req.user.role,
    }
    req.session.isLogged = true;

    res.redirect('/profile');
  }
);

export default router;


