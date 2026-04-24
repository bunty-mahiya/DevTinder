const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../model/chatSchema");

const uniqueRoomId = (loginUserId, userId) => {
  return crypto
    .createHash("sha256")
    .update([loginUserId, userId].sort().join("_"))
    .digest("hex");
};
const handleSocket = (server) => {
  const io = socket(server, {
    // attach Socket.IO to the HTTP server
    cors: {
      origin: "http://localhost:5173", // allow your frontend ,Allows your frontend URL to connect (CORS policy)
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, lastName, loginUserId, userId }) => {
      const room = uniqueRoomId(loginUserId, userId);
      console.log(firstName + lastName+ ":" + room);
      socket.join(room);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, loginUserId, lastName, userId, text }) => {
        try {
          const room = uniqueRoomId(loginUserId, userId);
          console.log(firstName +lastName, text,);
          // store message
          let Chatmessage = await Chat.findOne({       // existing chat store 
            participant: { $all: [loginUserId, userId] },
          });
          if (!Chatmessage) {
            Chatmessage = new Chat({       // if chat is not  existing  so it ematy add loginUserId and userId or message is emty
              participant: [loginUserId, userId],
              message: [],
            });
          }
          Chatmessage.message.push({    // and push all new data in mongoDB 
            senderId: loginUserId,
            text,
          });
           await Chatmessage.save()
                // Last inserted message ka createdAt nikalo
              const savedMsg = Chatmessage.message[Chatmessage.message.length - 1];

          io.to(room).emit("receiveMessage", { firstName, lastName, text , createdAt: savedMsg.createdAt,});
        } catch (err) {
          console.log(err);
        }
      },
    );
    socket.on("disconnect", () => {});
  });
};

module.exports = handleSocket;
