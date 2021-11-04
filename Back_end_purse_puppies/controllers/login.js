const client = require('../configs/database');

exports.login = async (req, res) => {
    const { user_email, user_password } = req.body;
        try { 
                const data = await client.query(`SELECT * FROM users WHERE user_email= $1;`, [user_email]) 
                const user = data.rows;
         if (user.length === 0) {
                res.status(400).json({ 
                    error: 'User is not registered, Sign Up first',
                });
            }
        else {
            if (user_password === user[0].user_password) {
                res.status(200).json({
                    message: 'user signed in!'
                })
            } 
        else {
            if (user_password !== user[0].user_password) {
                res.status(400).json({
                    error: 'Enter correct password!',
                });
            }
        }
    }
} catch (err) {
    console.log(err);
    res.status(500).json({
    error: "Database error occurred while signing in!", //Database connection error
    });
    };
    };

