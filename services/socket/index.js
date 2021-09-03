export const initializingSocket = (io) => {
    //initializing the socket io connection 
    io.on("connection", (socket) => {
      //register online userName
      socket.join(socket.handshake.query.username);
    
      //user sending message
      socket.on("chat", ({originUsername, destinationUsername, text}) => {
        io.to(destinationUsername).emit("message", {
            originUsername,
            text,
        });
      });
    });
}