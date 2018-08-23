var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, channel) => {
    var q = 'hello'; // declaring the queue from which we are going to consume

    channel.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    // Listening to the messages
    channel.consume(q, (message) => {
      console.log(" [x] Received %s", message.content.toString());
    }, {noAck: true});
  });
});