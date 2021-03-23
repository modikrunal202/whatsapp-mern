import io from 'socket.io-client';
let socket;

export const initiateSocket = () => {
    socket = io('http://192.168.43.54:5000');
    console.log(`Connecting socket...`);
    // if (socket && room) socket.emit('join-room', room);
}

export const joinRoomSocket = (room) => {
    console.log('joinRoomSocket-----');
    if (!socket) {
        console.log('insdieeeee');
    };
    if (socket && room) socket.emit('join-room', room);
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
    initiateSocket()
}

export const subscribeToChat = (cb) => {
    if (!socket) return (true);
    socket.on('user-connected', msg => {
        console.log('Websocket event received!');
        return cb(null, msg);
    });
}
export const sendMessageEvent = (message) => {
    console.log(`sendMessageEvent call...`);
    if (!socket) return (true);
    socket.emit("message-send", message)
}

export const receiveMessageEvent = (cb) => {
    if (!socket) return (true);
    socket.on('message-received', msg => {
        console.log('msg event received!', msg);
        return cb(null, msg);
    });
}

export const contactAddEvent = (cb) => {
    if (!socket) return (true);
    socket.on('contact-add', contact => {
        console.log('contact event received!', contact);
        return cb(null, contact);
    });
}