const User = require("../models/usersModel.ts");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.js")

const getUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

const createUser = async ({ email, username, password }) => {
    try {
        const userAlreadyExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userAlreadyExists) {
            throw new Error("Email or Username already in use");
        }

        if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
            throw new Error("Invalid password");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email, username, password: hashedPassword
        });

        const savedUser = await newUser.save();

        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        const token = generateToken(savedUser);

        return { token, user: userWithoutPassword };
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
    getUser,
    createUser,
    loginUser,
};