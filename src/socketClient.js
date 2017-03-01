// This module relies on the webpack cache to return the same instance of the socketIO client
import {socketURL} from "../config";
const io = require("socket.io-client")(socketURL);

export default io;
