import dotenv from "dotenv";
import { createServer } from "http";

import { createApp } from "./app";

dotenv.config();

const app = createApp();
const httpServer = createServer(app);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
