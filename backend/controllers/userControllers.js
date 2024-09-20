const {
    getUser,
    createUser,
    loginUser,
    updateEmail,
    updateUsername,
    updatePassword,
    verifyEmail,
    resetPasswordEmail,
    resetPassword,
} = require("../services/userServices");
const { sendEmail } = require("../utils/sendMail");

const getUserController = async (req, res) => {
    try {
        const result = await getUser(req.user.id);
        res.status(200).send(result);
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(500).send({ message: "Internal Sever Error" });
    }
};

const updateEmailController = async (req, res) => {
    try {
        const newEmail = req.body.email;

        if (!newEmail) {
            return res.status(400).send({ message: "New email is missing" });
        }

        const updatedUser = await updateEmail(req.user.id, newEmail);

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in User controller : ", error);
        return res.status(400).send({ message: error.message });
    }
};

const updateUsernameController = async (req, res) => {
    try {
        const newUsername = req.body.username;

        if (!newUsername) {
            return res.status(400).send({ message: "New username is missing" });
        }

        const updatedUser = await updateUsername(req.user.id, newUsername);

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in User controller : ", error);
        return res.status(400).send({ message: error.message });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const newPassword = req.body.password;

        if (!newPassword) {
            return res.status(400).send({ message: "New password is missing" });
        }

        const updatedUser = await updatePassword(req.user.id, newPassword);

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in User controller : ", error);
        return res.status(400).send({ message: error.message });
    }
};

const createUserController = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        if (!email || !username || !password) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const result = await createUser({email, username, password});

        sendEmail(email, "Email validation - camagru", `http://localhost:5038/api/public/verification?token=${result.token}`)

        res.status(201).send(result);
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(400).send({ message: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Missing credential" });
        }

        const { token, user } = await loginUser({ email, password });

        res.status(200).send({ token, user });
    } catch (error) {
        console.error("Error in login controller : ", error.message);
        res.status(401).send({ message: error.message });
    }
};

const verifyController = async (req, res) => {
    try {
        const { token } = req.query;
    
        if (!token) {
            return res.status(400).send({ message: "Missing token" });
        };

        verifyEmail({ token });

        return res.status(200).send({ message: "Your email is now verified" });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const resetPasswordEmailController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: "Email is missing" });
        };

        resetPasswordEmail({ email });

        return res.status(200).send({ message: "Email has been sent" });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const email = req.body.email;
        const newPassword = req.body.password;

        if (!email) {
            return res.status(400).send({ message: "Email is missing" })
        }
        if (!newPassword) {
            return res.status(400).send({ message: "New password is missing" });
        }

        const updatedUser = await resetPassword(email, newPassword);

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error in User controller : ", error);
        return res.status(400).send({ message: error.message });
    }
};

module.exports = {
    getUserController,
    updateEmailController,
    updateUsernameController,
    updatePasswordController,
    createUserController,
    loginController,
    verifyController,
    resetPasswordEmailController,
    resetPasswordController,
};