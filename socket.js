import { manager, on, decodeBind } from "./setup.js";
import { Decimal } from "./vendor.js";
import cors from "cors";
import express from "express";

const app = express();

const allowedOrigins = [
  "http://nanogames.zapto.org:50001",
  "http://localhost:3000", // If you're using a local React development server
  "http://127.0.0.1:50001", // For local Flask server
];

const PORT = 50002; // Choose any available port

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// SSE route
app.get(
  "/events",
  (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  },
  (req, res) => {
    // Your existing SSE setup code here
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    // Send a test event immediately
    res.write('data: {"type":"connected"}\n\n');

    // Store the response object so we can send events to this client later
    const clientId = Date.now();
    clients.set(clientId, res);

    // Remove the client when they disconnect
    req.on("close", () => {
      clients.delete(clientId);
    });
  }
);

// Store connected clients
const clients = new Map();

// Function to send SSE to all connected clients
function sendSSEToAll(data) {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

const game = manager.socket("/g/c");

game.on("connect", () => {
  game.emit("join", { roomId: "global" });
});

/**
 *
 * Note this is when the game starts.
 * if you want to do it 5seconsds before use the "pr" event
 * it is commented out at the bottom of the file. you can comment this and use that
 */
game.on(
  "bg",
  decodeBind((e) => {
    console.log("game_start ", e.gameId);
    sendSSEToAll({ type: "game_starting", data: e.gameId });
  }, on.Begin)
);

/**
 * this event is when the game ends. we do not get the gameId in this event
 * so we are using to send end signal to the frontend
 * but to store the data in the db we will instea use "st" event. which is for onSettle, that has all the desired properties
 * the onSettle is written in the file below :)
 */
game.on(
  "ed",
  decodeBind((t) => {
    const rate = new Decimal(t.maxRate).div(100).toNumber();
    const hash = t.hash;

    console.log(`game_crash `, {
      hash,
      rate,
    });

    //send last game_tick with final payout rate
    sendSSEToAll({ type: "game_tick", payout: rate.toFixed(2) });
    // send game crash message
    sendSSEToAll({ type: "game_crash" });
  }, on.End)
);

/**
 * this is the actual tick event
 */
game.on(
  "pg",
  decodeBind(({ elapsed }) => {
    const rate = Math.pow(Math.E, 6e-5 * elapsed);

    console.log("game_tick ", "Payout:", rate.toFixed(2) + "x");
    sendSSEToAll({ type: "game_tick", payout: rate.toFixed(2) });
  }, on.Progress)
);

/**
 *
 * this is the onSettle event. this has all the data necessary to add the game to our database
 */
game.on(
  "st",
  decodeBind((t) => {
    const bust = new Decimal(t.maxRate).div(100).toNumber();
    const hash = t.hash;
    const gameId = t.gameId;

    console.log("Arw, save the data to the db here - ", {
      bust,
      hash,
      gameId,
    });
  }, on.Settle)
);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`SSE Server running on port ${PORT}`);
});

/**
 *
 * here this is the commented version onPrepare.
 * use this to send game_starting message before 5 seconds
 */

//!note i have uncommented this~ but you can comment it or use it as you want :)
game.on(
  "pr",
  decodeBind(({ gameId }) => {
    console.log("game_starting ", gameId);
    sendSSEToAll({ type: "game_starting", data: gameId });
  }, on.Prepare)
);
