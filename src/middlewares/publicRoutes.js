const publicRoutes = (req, res, next) => {
    if(req.session.isLogged) {
        return res.redirect('/profile')
    }
    console.log("SE ACCEDIÓ A UNA RUTA PUBLICA"); // si ya esta logueado redirigir a products
    next();
}; // se añado un middleware al endpoint login en viewsRouter

export default publicRoutes; 

