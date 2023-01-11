
// Imports
import express from 'express';
import http, { createServer } from 'http';
import {Server} from 'socket.io';
import path from 'path';
import cons from "consolidate";
import { createRoom } from './rooms.js';
import  bodyParser from "body-parser";

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server , {});
const httpIO = io.of("/")


let rooms = [];
    
app.engine('html', cons.swig)
app.set('views', path.join(path.resolve(), 'views'));
app.set('view engine', 'html');

app.set("view engine", "express-views-dom");
app.set("views", "./frontend");
app.use(bodyParser.json());

httpIO.on("connection", (socket) => {
 rooms.forEach(el => console.log(el.uid))
 const playerRoom = rooms.find(el => el.uid === socket.handshake.query.uid);
 if (!playerRoom) return;
  
  playerRoom.addClient(socket.id)

  console.dir(socket.id, " is connected to room number ", playerRoom.uid);

  socket.on("message", (message) => {
    console.log("msg: ", message);
  })

  socket.on("disconnect", () => {
    console.log("disconnect ", socket.id);
  })

})

app.get(
    /\.(js|css|map|png|jp[2g]|webp|tiff|jfif|jpeg(2000)?|ico|bem|gif|svg)$/,
    express.static("frontend/dist")
  );
  
app.post("/room", (req, res) => {
  try {
   
    const newRoom = createRoom(httpIO);
    
    rooms.push(newRoom);
    res.json({id: newRoom.uid, success: true})
    res.status(200)
  } catch(e) {
    res.json({success: false})
    res.status(500)
  }
})



app.post("/notify", (req, res) => {

    rooms.find(el => el.uid === req.body.uid)?.emitSubscribers("tictac", "emitSubscribers notifyyyy");
    res.sendStatus(200)
})

app.get("/all", (req, res) => {
  res.json(rooms.map(el => {
  return el.toString();
    
  }))
  res.status(200)
} )

app.patch("/setMove", () => {
  //TODO : set move api
})


app.get('/', (req, res) => {
  res.render(path.resolve(path.resolve(), "frontend/dist/index.html"))
})

app.get('/room', (req, res) => {
  res.render(path.resolve(path.resolve(), "frontend/dist/pages/room/index.html"))
})



server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
