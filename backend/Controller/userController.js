import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';


// this is for mailtrap testing user and pass not actual user to security
var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c35a5160c3141ff1",
        pass: "4b7b641310b15ac2"
    }
});



// send email link for reset password
//router.post("/sendpasswordlink"
const sendEmailLink = async (req, res) => {
    console.log(req.body)

    const { email } = req.body;

    if (!email) {
        res.status(401).json({ status: 401, message: "Enter Your Email" })
    }

    try {
        const userfind = await User.findOne({ email: email });

        // token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
            expiresIn: "3m"
        });

        const setusertoken = await User.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });

        console.log('userToken', setusertoken);


        if (setusertoken) {
            const mailOptions = {
                from: "adib@gmail.com",
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind._id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).json({ status: 201, message: "Email sent Succsfully" })
                }
            })

        }

    } catch (error) {
        res.status(401).json({ status: 401, message: "invalid user" })
    }
};


// verify user for forgot password time
// route.get('/forgotpassword/:id/:token')
const forgotPassword = async (req, res) => {
    const { id, token } = req.params;

    try {

        const validUser = await User.findOne({ _id: id, verifytoken: token });

        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

        console.log(verifytoken);

        if (validUser && verifytoken._id) {
            res.status(201).json({ status: 201, validUser })
        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}


// change password
// route.post('/:id/:token')

const changePassword = async (req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    try {

        const validUser = await User.findOne({ _id: id, verifytoken: token });

        // const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

        if (validUser) {

            const newpassword = await bcrypt.hash(password, 12);

            const setNewPass = await User.findByIdAndUpdate({ _id: id }, { password: newpassword });

            setNewPass.save();

            res.status(201).json({ status: 201, setNewPass })

        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }


    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}