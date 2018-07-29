module.exports = (req, res, nest) => {
    if (!req.user){
        return res.status(401).send("You need to log in first!");
    }

    nest();
};