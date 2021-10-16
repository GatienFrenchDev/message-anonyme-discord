const express = require('express')
const { Webhook } = require('discord-webhook-node')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()


const config_file = require('./config/config.json')

const url_webhook = config_file.webhook
const pfp = config_file.pfp
const port = config_file.port
const username = config_file.username

app.use('/', express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () =>{
    console.log(`WEBSITE : http://127.0.0.1:${port}`)
})

app.post('/envoie', function(req, res){
    if (req.body.message === null){
        res.send('Tu dois envoyé un message')
        return
    }
    const message = req.body.message
    const hook = new Webhook(url_webhook);
    hook.setUsername(username);
    hook.setAvatar(pfp);
    hook.send(message);
    res.send('votre message a bien été envoyé !')
})