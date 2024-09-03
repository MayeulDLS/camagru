const User = require("../models/usersModel.ts");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.js")

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

        const token = generateToken(savedUser);

        return { token, userWithoutPassword };
    } catch (error) {
        console.error("Error creating user : ", error.message);
        throw new Error("Error creating user");
    }
}

const loginUser = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("No user for this email");
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new Error("Invalid password");
        }

        const token = generateToken(user);

        return { token, user };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getUsers,
    createUser,
    loginUser,
};