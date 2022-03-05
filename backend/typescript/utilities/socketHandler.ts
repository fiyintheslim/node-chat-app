import {Socket, Server} from "socket.io"
import {message} from "./types"

function enterChat (client: Function & Socket) {
    console.log("user connected", typeof Socket, client.id)
    //client.on("enterChat", enterChat)
}

export default enterChat