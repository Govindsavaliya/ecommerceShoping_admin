const passport = require('passport')
const passportLocal = require('passport-local')
const MainAdmin = require('../model/mainAdmin.model')
const localStrategy = passportLocal.Strategy;

passport.use(new localStrategy({
    usernameField: "email"
},
    async (email, password, cb) => {
        try {
            const user = await MainAdmin.findOne({ email })
            if (user) {
                if (user.password == password) {
                    return cb(null, user);
                } else {
                    console.log("wrong password")
                    return cb(null, false);
                }
            } else {
                console.log("wrong email");
                return cb(null, false);
            }
        } catch (err) {
            return cb(err)
        }
    }
))

passport.serializeUser(async (user, cb) => {
    try {
        return cb(null, user.id)
    } catch (err) {
        return cb(err)
    }

})

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await MainAdmin.findById(id)
        if (user) {
            return cb(null, user)
        } else {
        }
    } catch (err) {
        return cb(err)
    }
})