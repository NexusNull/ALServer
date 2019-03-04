const Server = new require('socket.io');
const Character = require("./Character");
var io = new Server(9090);
var clientCount = 0;
var entities = [];
var sockets = [];


io.sockets.on('connection', function (socket) {
    var limit = 0;
    var clientId = clientCount;
    clientCount++;
    var character = null;

    setInterval(function(){
        limit--;
    },100);
    function checkLimit(){
        limit++;
        if(limit > 100){
            socket.disconnect();
        }
    }
    sockets.push(socket);
    socket.emit("welcome", {
        "map": "main",
        "in": "main",
        "x": 0,
        "y": 0,
        "region": "EU",
        "name": "II",
        "pvp": false,
        "gameplay": "normal",
        "info": {}
    });
    var name = "";

    socket.on("myName", function (data) {
        name = data.name;
    })
    setTimeout(function () {
        socket.emit("simple_eval", {
            code:
            "pulling_all=true;" +
            "first_entities=false;" +
            "character_to_load=1;" +
            "stage.removeChild(character);" +
            "old_character = character;" +
            "socket.emit(\"myName\",{name:old_character.id})"
        });
        var players = [];

        for (var id in entities) {
            var player = entities[id];
            players.push(player.getData());
        }
        socket.emit("entities", {
            type: "all",
            players: players,
            monsters: []
        });
    }, 100);


    socket.on("auth", function () {
        character = new Character(name);
        socket.emit("start", character.getData());
        entities.push(character);
    });

    socket.on("disconnect", function () {
        sockets.splice(sockets.indexOf(socket), 1);
        for (var i in sockets) {
            let oSocket = sockets[i];
            oSocket.emit("disappear", {"id": character.id, "to": null, "s": 0});
        }
    });
    socket.on("send_updates", function () {
        checkLimit()
        var players = [];

        for (var id in entities) {
            var player = entities[id];
            players.push(player.getData());
        }
        socket.emit("entities", {
            type: "all",
            players: players,
            monsters: []
        });
    });
    socket.on("move", function (data) {
        checkLimit()
        if (character) {
            var move = character.move(data.x, data.y, data.going_x, data.going_y);
            for (var i in sockets) {
                let oSocket = sockets[i];
                oSocket.emit("entities", {
                    type: "xy",
                    players: [move],
                    monsters: [],
                });
            }
        } else {
            console.log("No character")
        }
    });
    socket.on("say", function (data) {
        checkLimit()
        if (character) {
            if(data.message.length > 100){
                return;
            }
            for (var i in sockets) {
                let oSocket = sockets[i];
                oSocket.emit("chat_log", {
                    owner: character.getData().id,
                    message: data.message,
                    id: character.getData().id
                });
            }
        } else {
            console.log("No character")
        }
    });

});