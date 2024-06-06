const { EventEmitter } = require('events');
class PublishMessages extends EventEmitter { };
const publishMessagesEventObj = new PublishMessages();

module.exports = publishMessagesEventObj;