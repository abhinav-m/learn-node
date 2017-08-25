/* 
Events are a common pattern in programming, known more widely as the 'observer pattern' or 'pub/sub' (publish/subscribe). Whereas callbacks are a one-to-one relationship between the thing waiting for the callback and the thing calling the callback, events are the same exact pattern except with a many-to-many API.

The easiest way to think about events is that they let you subscribe to things. You can say 'when X do Y', whereas with plain callbacks it is 'do X then Y'. */

//If we were trying to write a module that connects to a chat server using only callbacks it would look like this:

var chatClient = require('my-chat-client')

function onConnect() {
    // have the UI show we are connected
}

function onConnectionError(error) {
    // show error to the user
}

function onDisconnect() {
    // tell user that they have been disconnected
}

function onMessage(message) {
    // show the chat room message in the UI
}

chatClient.connect(
    'http://mychatserver.com',
    onConnect,
    onConnectionError,
    onDisconnect,
    onMessage
)


//Using publisher suscriber pattern or events of node :



var chatClient = require('my-chat-client').connect()

chatClient.on('connect', function() {
    // have the UI show we are connected
})

chatClient.on('connectionError', function() {
    // show error to the user
})

chatClient.on('disconnect', function() {
    // tell user that they have been disconnected
})

chatClient.on('message', function() {
    // show the chat room message in the UI
})


//This approach is similar to the pure-callback approach but introduces the .on method, which subscribes a callback to an event. 
//This means you can choose which events you want to subscribe to from the chatClient. You can also subscribe to the same event multiple times with different callbacks:

var chatClient = require('my-chat-client').connect()
chatClient.on('message', logMessage)
chatClient.on('message', storeMessage)

function logMessage(message) {
    console.log(message)
}

function storeMessage(message) {
    myDatabase.save(message)
}