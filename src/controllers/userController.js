const getUser = (req, res) => {
    res.send("get user");
}

const createUser = (req, res) => {
    res.send("create user");
}


//commonjs 
module.exports = {
    getUser,
    createUser
}