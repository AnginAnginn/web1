const User = require ("../models/userModel");

const onlyAdmin = async (req, res, next) => {
    const {role} = req.body

    if (role === admin) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (req.user.role === 'admin') { // Pengecekan role
                next();
            } else {
                res.status(403).json({ message: 'Access forbidden: not an admin' });
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No authorized, no token' });
    }
};

module.exports = { onlyAdmin }