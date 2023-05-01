
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const socket = require("socket.io");
const multer = require("multer");
const checkAuth = require("./Api/Auth/checkAuth");

const app = express();


const usersRoutes = require('./Api/Routers/users');
const chat = require('./Api/Routers/chat');
const news = require('./Api/Routers/news');
const task = require('./Api/Routers/Task');
const SendMeEmail = require('./Api/Util/SendMeEmail');


// no Pass !
mongoose.connect("mongodb+srv://Avri:@cluster0.atcea6g.mongodb.net/ChatApp", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Mongo db Connected !");
})



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

app.use((morgan('dev')));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH ");
        return res.status(200).json({});
    }
    next();
})

app.use(express.static('public'))
app.post("/checkAuth", checkAuth, (req, res) => { return res.status(200).send("Good") })
app.use('/users', usersRoutes)
app.use('/chat', chat)
app.use('/news', news)
app.use('/Task', task)    
app.use('/SendMeEmail', SendMeEmail)
app.post("/uploads", upload.single('image'), (req, res) => {
    console.log(req.file.path);
    return res.json({ data: "Ok !" })
})

app.use((req, res, next) => {
    const error = new Error('Soory, Not Found !');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            error: error.status
        }
    })
})




const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});





io.on('connection', (socket) => {
    socket.on('chat message from clinet', (msg, comper) => {
        console.log(msg, comper);
        io.sockets.emit('chat message', msg, comper);
    });
    socket.on('alertUser', (timeAlert, user, valueAlert) => {


        setTimeout(() => {

            io.sockets.emit('alertUser', timeAlert, user, valueAlert);

        }, timeAlert - Date.now());
    });
});


