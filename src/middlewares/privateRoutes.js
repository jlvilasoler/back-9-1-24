const privateRoutes = (req, res, next) => {
    if(!req.session.isLogged) {
        return res.redirect('/login')
    }
    console.log("SE ACCEDIÓ A UNA RUTA PRIVADA"); // si no esta logueado redirigir a Login
    next();
}; // se añado un middleware al endpoint login en viewsRouter





export default privateRoutes; 

