export const initializingSocket = (io) => {
    //initializing the socket io connection 
    io.on("connection", (socket) => {
      //register online userId
      socket.join(socket.handshake.query.id);
    
      //user sending message
      socket.on("chat", ({originId, destinationId, text}) => {
        originId = String(originId)
        destinationId = String(destinationId)
        const timestamp = Date.now()

        io.to(String(destinationId)).emit("message", {
            originId,
            text,
            timestamp
        });
        socket.emit("message", {
          originId,
          destinationId,
          text,
          timestamp
        });
      });
    });
}