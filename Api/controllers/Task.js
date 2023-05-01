const Task = require("../models/Task");
module.exports = {
    NewTask: ((req, res) => {
        const { taskName, description, priority, timeEnd } = req.body;
        console.log(req.body);
        Task.find({ user: req.body.userName }).then((data) => {
            if (data.length === 0) {
                const taskSon = new Task({
                    user: req.body.userName,
                    Tasks: [{ taskName, description, priority, timeStart: new Date().getHours() + " : " + new Date().getMinutes(), timeEnd }]

                })
                taskSon.save().then(() => {
                    return res.status(200).json({ message: "Task Saved ! " })
                }).catch((erorr) => {
                    return res.status(500).json({ erorr })
                })
            }
            else {
                Task.updateOne({ user: req.body.userName },
                    { $push: { Tasks: { taskName, description, priority, timeStart: new Date().getHours() + " : " + new Date().getMinutes(), timeEnd } } },
                    function (err, result) {
                        if (err) {
                            return res.status(350).json({
                                message: err
                            })
                        } else {
                            return res.status(200).json({
                                message: "new Task In !", messages: result
                            })
                        }
                    }
                )
            }

        }).catch((err) => {
            console.log(err);
            res.status(408).json({ err })
        })

    }),
    deleteAll: ((req, res) => {
        Task.deleteOne({ user: req.body.userName }).then((re) => {
            console.log(re);
            return res.status(200).json(re)
        }).catch((Err) => {
            res.status(404).json({
                err: Err
            })
        })
    }),
    getAllTask: ((req, res) => {
        Task.find({ user: req.body.userName }).then((re) => {
            return res.status(200).json(re)
        }).catch((Err) => {
            res.status(404).json({
                err: Err
            })
        })
    }),
}


