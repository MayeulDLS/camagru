const { getUsers, createUser, loginUser } = require("../services/userServices");

const getUsersController = async (req, res) => {
    try {
        const result = await getUsers();
        res.send({ result });
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(500).send("Internal Sever Error");
    }
};

const createUserController = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        if (!email || !username || !password) {
            return res.status(400).send("Missing required fields");
        }

        const result = await createUser({email, username, password});

        res.status(201).send({ result });
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(500).send("Internal Sever Error");
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Missing credential");
        }

        const { token, user } = await loginUser({ email, password });

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error in login controller : ", error.message);
        res.status(401).send("Authentication failed", error.message);
    }
};

module.exports = {
    getUsersController,
    createUserController,
    loginController,
};