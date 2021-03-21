import { Server } from 'socket.io'
import { ChatUtils } from "./v1/modules/chat/chatUtils"
const chatUtils = new ChatUtils();
let io: any
class Socket {
    public async init(sio: any) {
        io = sio;
        io.on("connection", (socket) => {
            console.log(`Client ${socket.id} connected`);
            socket.on("join-room", (chatRoomId) => {
                socket.join(chatRoomId);
                console.log('User has joined the room', chatRoomId);
                socket.to(chatRoomId).emit("user-connected", chatRoomId);
                socket.on('message-send', (message) => {
                    console.log("=====message", message);
                    chatUtils.sendMessage(message)
                    socket.to(chatRoomId).emit("message-received", message);
                })
            })
            // socket.on("user-add", )
            socket.on('disconnect', function() {
                console.log('Got disconnect!');
            })  
        })
    }
}
export default new Socket()
// export default (io: Server) => {
// }