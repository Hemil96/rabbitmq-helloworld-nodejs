const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  console.log('RabbitMQ server connected')
  conn.createChannel((err, channel) => {
    var q = 'hello'; // 'hello' = queue name

    channel.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    channel.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });

  // Closing the connection 
  setTimeout(() => {
    conn.close(); process.exit(0)
  }, 500);
});
