const http = require("http");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const MemoryStore = require("memorystore")(session);

const app = express();
const server = http.createServer(app);
const PORT = 5000;

app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
        store: new FileStore(), // 파일 스토어 혹은 메모리 스토어 둘 중 하나 선택해서 사용
    })
);

app.get("/", (req, res) => {
    console.log(req.session);
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }

    res.send(`View: ${req.session.num}`);
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});