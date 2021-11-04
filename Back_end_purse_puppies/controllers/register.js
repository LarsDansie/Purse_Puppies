const bcrypt = require('bcrypt');
const client = require('../configs/database');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { user_name, user_email, user_password } = req.body;
        try {
            const  data = await client.query(`SELECT * FROM users WHERE user_email= $1;`, [user_email]);
            const  arr = data.rows;
        if (arr.length != 0) {
            return  res.status(400).json({ error: 'Email already there, No need to register again.',
            });
           }
        else {
            const  user  = {
            user_name,
            user_email,
            user_password,
            };
            var  flag  =  1; 

                 client.query(`INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3);`, [user.user_name, user.user_email, user.user_password], (err) => {
            if (err) {
                flag  =  0; 
                console.error(err);
                return  res.status(500).json({
                    error: 'Database error'
                })
            }
        else {
            flag  =  1;
            res.status(200).send({ message: 'User added to database' });
        }
    })
    if (flag) { const  token  = jwt.sign( 
        {
        user_email: user.user_email
        },
        process.env.SECRET_KEY
        );
    };

}}
    catch (err) {
        console.log(err);
            res.status(500).json({
                error: 'Database error while registring user!',
             });
        };
    }