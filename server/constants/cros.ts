import { CorsOptions, CorsOptionsDelegate } from "cors";

let serverCros:
	| {
			cors: {
				origin: string;
				methods: string[];
			};
	  }
	| undefined;

let corsOptions: CorsOptions | CorsOptionsDelegate | undefined;

if (process.argv[2] === "dev") {
	serverCros = {
		cors: {
			origin: "http://192.168.3.103:5173",
			methods: ["GET", "POST"],
		},
	};

	corsOptions = {
		origin: function (origin, callback) {
			callback(null, true);
		},
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	};
}

export { serverCros, corsOptions };
