import mongoose from 'mongoose';
//import { Nitro } from 'nitropack';
const config = useRuntimeConfig();

export default () => {
  mongoose
    .connect(config.MONGODBCONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to MongoDB!');
    })
    .catch(err => {
      console.warn(`Error occurred: ${err}`);
    });
};
