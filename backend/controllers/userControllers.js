const { getUsers, createUser } = require("../services/userServices");

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
        const result = await createUser();
        res.send({ result });
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(500).send("Internal Sever Error");
    }
};

module.exports = {
    getUsersController,
    createUserController,
};