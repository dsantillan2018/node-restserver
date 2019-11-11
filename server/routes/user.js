const express = require('express');
const bcrypt = require('bcrypt');

// Standard name of undercore function is "_"
const _ = require('underscore');

// Importing of the model (User is with capital letter because it is standard)
const User = require('../models/user');

//Importing auth class
const { verifyToken, verifyAdmin_Role } = require('../middlewares/auth');

const app = express();

app.get('/user', verifyToken, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    //Function that search all registers
    User.find({ state: true }, 'name email role state google img')
        .skip(from) // number of register from that you want to see
        .limit(limit) // number of registers that you want to see
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ state: true }, (err, counter) => {
                res.json({
                    ok: true,
                    users,
                    counter
                });
            });
        });
})

app.post('/user', [verifyToken, verifyAdmin_Role], function(req, res) {
    let body = req.body;
    // Creating object schema user
    let user = new User({
        name: body.name,
        email: body.email,
        // Encripting password using bcrypt
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
})

app.put('/user/:id', [verifyToken, verifyAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
})

app.delete('/user/:id', [verifyToken, verifyAdmin_Role], function(req, res) {
    let id = req.params.id;

    // Method that erase completely a register
    // User.findByIdAndRemove(id, (err, userErased) => {
    //     if (err) {
    //         res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!userErased) {
    //         res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'User did not found'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         user: userErased
    //     });
    // });

    // Method that change state to false
    User.findByIdAndUpdate(id, { state: false }, { new: true }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
})

module.exports = app;