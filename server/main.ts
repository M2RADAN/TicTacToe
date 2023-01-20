// Imports
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import cons from "consolidate";
import bodyParser from "body-parser";
import { Rooms } from "./models/Rooms";
import cors from "cors";
import { serverCros, corsOptions } from "./constants/cros";
import { DataBase, privateKey } from "./models/Bd";
import jwt from "jsonwebtoken";
import e from "express";

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, serverCros);
const httpIO = io.of("/");

export type TSoket = typeof httpIO;

const Games = new Rooms();
const DB = new DataBase();

app.engine("html", cons.swig);
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "html");

app.set("view engine", "express-views-dom");
app.set("views", "./frontend");
app.use(bodyParser.json());
if (process.argv[2] === "dev") app.use(cors(corsOptions));

httpIO.on("connection", (socket) => {
	const roomId = socket.handshake.query.id;
	if (!roomId) return socket.disconnect();
	const room = Games.getRoom(roomId as string);
	if (!room) return socket.disconnect();

	const [canMove, role, isObserver] = room.addClient(socket.id, roomId as string);

	socket.emit("playerConnected", {
		canMove,
		role,
		isObserver,
		board: room.board,
		winnder: room.winner,
		id: socket.id,
	});

	// Messages
	socket.on("restart", (playerId: string) => {
		if (room.id !== playerId) return;
		room.restart();
	});

	socket.on("move", (message: number[]) => {
		room.makeMove(socket.id, message);
	});

	socket.on("disconnect", () => {
		room.removeClient(socket.id);
		console.log("disconnect ", socket.id);
	});
});

app.get(
	/\.(js|css|map|png|jp[2g]|webp|tiff|jfif|jpeg(2000)?|ico|bem|gif|svg)$/,
	express.static("frontend/dist")
);

app.post("/newRoom", (req, res) => {
	try {
		const [id, observerId] = Games.createRoom(httpIO);

		res.json({ id, observerId, success: true });
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
	console.log(`App listening on port ${port}`);
});

app.post("/register", (req, res) => {
	try {
		const login = req.body.login;
		const pass = req.body.password;
		if (DB.findUser(req.body.login)) throw new Error("Пользователь уже зарегестрирован");
		if (!/\w{3,}/.test(login)) throw new Error("Не подходящий логин");
		if (!/.*(([A-Z].*\d)|(\d.*[A-Z])).*/.test(pass))
			throw new Error("Не подходящий или слабый пароль");

		const token = DB.createUser(req.body.login, req.body.password);
		res.json({ token, success: true });
		res.status(200);
	} catch (e) {
		res.json({ success: false, message: (e as Error).message });
		res.status(403);
		alert(e);
	}
});

app.post("/login", (req, res) => {
	try {
		const userL = DB.findUser(req.body.login);
		if (!(userL && DB.hmacPass(req.body.password) === userL.hashPass))
			throw new Error("Пароль или логин не верен!");

		const token = DB.createToken(userL.id);
		res.json({ token, success: true });
		res.status(200);
	} catch (e) {
		res.json({ success: false, message: (e as Error).message });
		res.status(500);
	}
});

app.post("/userInfo", (req, res) => {
	try {
		if (!req.headers.authorization) throw Error("Не верный токен");
		jwt.verify(req.headers.authorization?.split(" ")[1] || "", privateKey, (err, id) => {
			if (err) throw new Error("Не верный токен");
			res.status(200).json(DB.getUser(id?.toString() || "")?.stats);
		});
	} catch (e) {
		res.status(403).json({ success: false, message: (e as Error).message });
	}
});

app.post("/updateStats", (req, res) => {
	try {
		if (!req.headers.authorization) throw Error("Не верный токен");
		jwt.verify(req.headers.authorization?.split(" ")[1] || "", privateKey, (err, id) => {
			if (err) throw new Error("Не верный токен");
			const roomId = req.body.id;
			const winner = Games.getRoom(roomId)?.winner;
			console.log(req.body, id);
			let result: "ties" | "wins" | "loses";
			if (winner === "tie") result = "ties";
			else if (winner === req.body.role) result = "wins";
			else result = "loses";

			if (winner) {
				DB.updateUser(id as string, result);
			}
		});
	} catch (e) {
		res.status(403).json({ success: false, message: (e as Error).message });
	}
});
