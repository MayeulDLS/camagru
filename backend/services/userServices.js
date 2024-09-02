const User = require("../models/usersModel.ts");
const bcrypt = require("bcrypt");

const getUsers = async () => {
    const result = await User.find();
    return result;
};

const createUser = async ({ email, username, password }) => {
    try {
        const userAlreadyExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userAlreadyExists) {
            throw new Error("Email or Username already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email, username, password: hashedPassword
        });

        const savedUser = await newUser.save();

        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        return userWithoutPassword;
    } catch (error) {
        console.error("Error creating user : ", error.message);
        throw new Error("Error creating user");
    }
}

module.exports = {
    getUsers,
    createUser,
};