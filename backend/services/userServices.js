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

const updateEmail = async (id, email) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new Error("Invalid email");
        }

        const emailAlreadyInUse = await User.findOne({ email });
        if (emailAlreadyInUse) {
            throw new Error("Email already in use")
        }

        user.email = email;
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
};

const updateUsername = async (id, username) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        const usernameAlreadyInUse = await User.findOne({ username });
        if (usernameAlreadyInUse) {
            throw new Error("Username already in use")
        }

        user.username = username;
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
};

const updatePassword = async (id, password) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
            throw new Error("Invalid password");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
};

const createUser = async ({ email, username, password }) => {
    try {
        const emailAlreadyInUse = await User.findOne({ email });
        if (emailAlreadyInUse) {
            throw new Error("Email already in use");
        }
        const usernameAlreadyTaken = await User.findOne({ username });
        if (usernameAlreadyTaken) {
            throw new Error("Username already taken");
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
        throw error;
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
        throw error;
    }
}

module.exports = {
    getUser,
    updateEmail,
    updateUsername,
    updatePassword,
    createUser,
    loginUser,
};