// const mongoose = require("mongoose");
const Chat = require("../models/Chat");
const jwt = require('jsonwebtoken');
const orederUsersByAbc = require('../Util/orederUsersByAbc');
const socketIO = require('socket.io');
module.exports = {
    getAllArticles: (req, res) => {
        Article.find().then((articles) => {
            res.status(200).json({ articles })
        }).catch((erorr) => {
            res.status(500).json({ erorr })
        })

    },
    getChat: (req, res) => {
        const { token, idWith } = req.body;
        let inU = jwt.verify(token, "ChatApp");
        const ifExx = inU.userName + idWith;
        Chat.find({ users: ifExx }).then((data) => {

            res.status(200).json({ chat: data })
        }).catch((erorr) => {
            res.status(500).json({ erorr })
        })

    },

    startChat: (req, res) => {
        const { token, idWith, message } = req.body;
        let inU = jwt.verify(token, "ChatApp");
        let arrUsersUnOreder = [inU.userName, idWith];
        const ifExx = orederUsersByAbc(arrUsersUnOreder);
        Chat.find({ users: ifExx }).then((data) => {
            if (data.length == 0) {
                const Account = new Chat({
                    users: ifExx,
                    messages: []

                })
                Account.save().then(() => {
                    return res.status(200).json({ message: "Chat started ! ", messages: data })
                }).catch((erorr) => {
                    return res.status(500).json({ erorr })
                })
            }
            // else if(data.length > 0)
            // {
            //     Account.updateOne(
            //         { users: ifExx },
            //         { _id: 4, "grades.grade": 85 },
            //         { $set: { "grades.$.std" : true } }
            //      )
            // }
            else if (message) {

                Chat.updateOne(
                    { users: ifExx },
                    { $push: { messages: { from: inU.userName, messages: message, timeMass: new Date().getHours() + " : " + new Date().getMinutes() } } },
                    function (err, result) {
                        if (err) {
                            return res.status(350).json({
                                message: err
                            })
                        } else {
                            return res.status(200).json({
                                message: "message sent !", messages: data
                            })
                        }
                    }
                )
            }
            else {
                const query = { users: ifExx };
                const updateDocument = {
                    $set: { "messages.$[].isRead": true }
                };
                Chat.updateMany(query, updateDocument).then((d) => {
                    console.log(d);
                })
                return res.status(200).json({
                    message: "Take it - - !", messages: data
                })
            }

        }
        ).catch((err) => {
            return res.status(500).json({
                message: err
            })
        })


    },
    UpdateArticles: (req, res) => {
        const articleId = req.params.articleId;
        res.status(200).json({ message: "Update " + articleId })
    },
    DeleteChat: (req, res) => {
        // const ChatById = req.params.DeleteChatById;
        // const ifExx = localStorage.getItem("userIDWith");


        Chat.updateOne(
            { users: ifExx },
            // אחרי הנקודה מסמן את האינדקס .. 
            { $unset: { "messages.1": 1 } }

        ).then(() => {
            Chat.updateOne(
                { users: ifExx },
                { $pull: { messages: null } },
            )
                .catch((err) => {
                    return res.status(500).json({
                        message: err
                    })
                }).then(() => {
                    return res.status(200).json({ message: "Delete " })
                })
        }).catch((err) => {
            return res.status(500).json({
                message: err
            })
        })



    }

}