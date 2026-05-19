

const whiteboardHandler = (io, socket) => {

    // draw event
    socket.on("draw", ({groupId, x0, y0, x1, y1, color}) => {
        socket.to(groupId).emit("draw", {
            x0,
            y0,
            x1,
            y1,
            color
        })
    })

    // clear board 
    socket.on("clear_board", (groupId) => {
        socket.to(groupId).emit("clear_board")
    })
}

export default whiteboardHandler