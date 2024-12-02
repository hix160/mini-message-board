
const messages = [
    {
        text: "Hi there!",
        user: "Mario",
        added: new Date()
    },
    {
        text: "Hello world!",
        user: "Luigi",
        added: new Date()
    }
];

const {Router} = require("express");

const indexRouter = Router();

indexRouter.get("/", (req,res) => {
    res.render("index", {messages:messages})
})

indexRouter.get("/new", (req, res) => {
    res.render("form");
})

indexRouter.post("/new", (req,res) => {
    const {user, text} = req.body;
    if(user && text) {
        messages.push({user, text, added: new Date()});
    }
    res.redirect("/");
})

indexRouter.get("/message/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (id >= 0 && id < messages.length) {
        const message = messages[id];
        res.render("message", { message });
    } else {
        res.status(404).send("Message not found");
    }
});

module.exports = indexRouter;