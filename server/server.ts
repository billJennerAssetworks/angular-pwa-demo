
import * as express from 'express';
import {Application} from "express";
import {readAllLessons} from "./read-all-lessons.route";
import {addPushSubscriber} from "./add-push-subscriber.route";
import {sendNewsletter} from "./send-newsletter.route";
const bodyParser = require('body-parser');

const webpush = require('web-push');


const vapidKeys = {
    publicKey: "BGF1258Gs9S8d6syVpYhk9RCPN4eGmwF34r-T17f2I0gSOzBDtyiV8TlSwaBuj7sjmHxsBc9CGn2-02-p3CmqUE",
    privateKey: "0OeFAV04EfUTx_A1EZtvUdUIxx02cVXCyDQsIoLqI_I"
};


webpush.setVapidDetails(
    'mailto:bill.jenner@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);



const app: Application = express();


app.use(bodyParser.json());


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);



// launch an HTTP Server
const httpServer:any = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});









