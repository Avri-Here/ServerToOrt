const CreateAccount = require("../models/usersCreate");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { json } = require("express");
module.exports = {
    getAllUsers: (req, res) => {
        CreateAccount.find({}).then((dataArr) => {
            const arrUser = [];
            dataArr.forEach((item) => {
                arrUser.push(item);
            })
            return res.status(200).json({ message: arrUser })
        })

    },
    signIn: (req, res) => {
        const { userName, password } = req.body;
        CreateAccount.find({ userName }).then((data) => {


            let temp1 = Number(password);
            let temp2 = Number(data[0].password)
            if (temp1 === temp2) {
                const token = jwt.sign({ userName: data[0].userName }, "ChatApp",
                    {
                        expiresIn: "10H"
                    });
                return res.status(200).json({ message: data[0].userName, token })

            }
            else {
                return res.status(500).json({ message: "The Username or Password is incorrect !" })
            }


        }).catch(e => res.status(400).json(e))

    },
    signUp: (req, res) => {
        const { userName, password, photoUser } = req.body;
        CreateAccount.find({ userName: userName }).then((dataFun) => {
            if (dataFun.length == 0) {
                const Account = new CreateAccount({
                    userName: userName,
                    password: password,
                    photoUser: photoUser
                })
                Account.save().then(() => {
                    res.status(200).json({ message: "Created !  " })
                }).catch((erorr) => {
                    res.status(500).json({ erorr })
                })
            }
            else {
                res.status(209).json({ message: "Conflit !  " + dataFun[0].userName + " Is exsist !" })
            }

        })


    },
    Updateusers: (req, res) => {
        const userName = { userName: req.tokenData.userName };
        const newPass = { password: req.body.newPass };
        CreateAccount.findOneAndUpdate(userName, newPass).then(() => {
            return res.status(200).json({ res: "Update !" })
        }).catch((err) => {
            return res.status(500).json({ res: err })
        })
    },
    deleteUser: (req, res) => {
        const userName = req.tokenData.userName;
        console.log(req);
        CreateAccount.find({ userName }).then((user) => {

            return user;

        })
            .then((user) => {
                if (user.length < 1) {
                    return res.status(404).json({
                        message: 'user not found'
                    })

                }
                CreateAccount.deleteOne({ userName: userName }).then((user) => {
                    res.status(200).json({
                        message: "user _id:" + userName + " Deleted ! " + JSON.stringify(user)
                    })
                })

            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    Erorr: error.message
                })
            });

    }

}