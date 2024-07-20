const createIoInstance =  async(httpServer) => {
    const {Server} = await import('socket.io');
    const io = new Server(httpServer);

    io.on("connection",sock => {
        sock.on("message",(msg)=> {
            sock.broadcast.emit("message",msg);
        })
    });
}

export {
    createIoInstance
};