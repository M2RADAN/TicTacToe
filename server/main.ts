// Imports
import express from "express";
import http, { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import cons from "consolidate";
import bodyParser from "body-parser";
import { Rooms } from "./models/Rooms";

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {});
const httpIO = io.of("/");

export type TSoket = typeof httpIO;

const Games = new Rooms();

app.engine("html", cons.swig);
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "html");

app.set("view engine", "express-views-dom");
app.set("views", "./frontend");
app.use(bodyParser.json());

httpIO.on("connection", (socket) => {
	const roomId = socket.handshake.query.roomId;
	if (!roomId) return;
	const game = Games.getRoom(roomId as string);
	if (!game) return;
	game.addClient(socket.id);

	// Messages
	socket.on("message", (message: string) => {});

	socket.on("move", (message: number[]) => {
		game.makeMove(socket.id, message);
	});

	socket.on("disconnect", () => {
		console.log("disconnect ", socket.id);
	});
});

app.get(
	/\.(js|css|map|png|jp[2g]|webp|tiff|jfif|jpeg(2000)?|ico|bem|gif|svg)$/,
	express.static("frontend/dist")
);

app.post("/newRoom", (req, res) => {
	try {
		const newRoom = Games.createRoom(httpIO);

		res.json({ id: newRoom, success: true });
		res.status(200);
	} catch (e) {
		res.json({ success: false });
		res.status(500);
	}
});

app.get("/**", (req, res) => {
	res.render(path.resolve(path.resolve(), "frontend/dist/index.html"));
});

server.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
