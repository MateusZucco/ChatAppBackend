import { socketServer } from './http';
import chatModel from './model/chat.model';
socketServer.on('connection', (connection) => {
  console.log(connection.id);
  connection.join('1234');//change valeu for a room value, crate in table contact a ro0m id
  connection.on('message', async (data) => {
    try {
      connection.to('1234').emit('message', {
        text: 'Client ' + connection.id + ' say: ' + data.text
      });
      await chatModel.create(data);
    } catch (err) {
      console.log(err);
    }
  });
});
