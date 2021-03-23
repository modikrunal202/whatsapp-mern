import { Server } from 'socket.io'
import { ChatUtils } from "./v1/modules/chat/chatUtils"
const chatUtils = new ChatUtils();
let io: any
class Socket {
    public async init(sio: any) {
        io = sio;
        io.on("connection", async (socket) => {
            console.log(`Client ${socket.id} connected`);
            socket.on("join-room", (chatRoomId) => {
                socket.join(chatRoomId);
                console.log('User has joined the room', chatRoomId);
                socket.to(chatRoomId).emit("user-connected", chatRoomId);
                socket.on('message-send', async (message) => {
                    console.log("=====message", message);
                    const newMessage = await chatUtils.sendMessage(message)
                    await this.emitSendMessageEvent(socket, newMessage, chatRoomId);
                })
            })
            // socket.on("user-add", )
            socket.on('disconnect', function() {
                console.log('Got disconnect!');
            })  
        })
    }
    public emitAddUserSocket = async(user) => {
        console.log('user------', user);
        io.emit("contact-add", user)
    }
    public emitSendMessageEvent = async(socket, message, chatRoomId) => {
        console.log('message-received fired');
        socket.to(chatRoomId).emit("message-received", message);
    }
}
export default new Socket()
// export default (io: Server) => {
// }