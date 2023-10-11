import passport from "passport";
import local from 'passport-local';
import { userModel } from "../dao/models/user.model.js";
import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import GithubStrategy from 'passport-github2';

const initializePassport = () => {
    passport.use('register', 
    new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'}, 
        async (req, username, password, done) => {

            const { first_name, last_name, email, age } = req.body; // leemos los datos que llegan de formulario
            let role = "user"; // Usamos let en lugar de const para permitir la reasignación
    
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                // Asigna un rol de "admin" a las credenciales específicas si lo deseas
                role = "admin";
            }
    
            const userExist = await userModel.findOne({ email }); // buscamos si el usuario existe
    
            if (userExist) {
                return done(null, false);
            }

            const user = await userModel.create({
                first_name, last_name, email, age, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), role,
            });
            return done(null, user);
    })
    );









    passport.use('login', new LocalStrategy({usernameField: 'email'}, 
    async(username, password, done) => {
        try {
            const user = await userModel.findOne( {email: username} ).lean();
            console.log(user)
            if(!user) {
                return done(null, false);
            }
        
            if(!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }
    
            return done(null, user);

        } catch(error) {
            return done(error);
        }
        

    }))



    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.710443330002733b',
            clientSecret: '80ee343de62298a1d331fec4b4e4f04e5d9936e5',
            callbackURL: 'http://localhost:8080/api/githubcallback',
            scope: ['user:email'],
        }, async (accessToken, refreshToken, profile, done) => {
            try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({email});

            if(!user) {
                const newUser = await userModel.create({
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    password: '',
                    email,
                    role: "user",
                });

                return done(null, newUser);
            } else {
                done(null, user);
            }
        }catch(error) {
            done(error)
        }
        }
        )
        );

        passport.serializeUser((user, done) => {
            done(null, user._id);
        });
        passport.deserializeUser(async (id, done) => {
            const user = await userModel.findById(id);
            done(null, user);
        });
};


export default initializePassport;