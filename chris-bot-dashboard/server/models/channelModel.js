import mongoose from 'mongoose';

const config = useRuntimeConfig();

const dbConnectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const ytChannelDB = mongoose.createConnection(
  config.MONGODBCONNECTIONSTRINGYTCHANNEL,
  dbConnectOptions
);

const channel = {
  videoID: {
    type: String,
    unique: true,
    required: [true, 'A channel must have a videoID']
  },
  videoTitle: {
    type: String
  },
  videoLink: {
    type: String,
    required: [true, 'A channel must have a videoLink']
  },
  videoImage: {
    type: String
  },
  videoStatus: {
    type: String
  }
};

const ApexChannelSchema = new mongoose.Schema(channel, {
  collection: 'ApexVideos'
});

const JTracksChannelSchema = new mongoose.Schema(channel, {
  collection: 'JTracksVideos'
});

//const usersSchema = new mongoose.Schema(user);

// create model from the schema

//The third parameter can be used to remove the s at the end of the DB name
const ApexChannels = ytChannelDB.model(
  'ApexVideos',
  ApexChannelSchema,
  'ApexVideos'
);
const JTracksChannels = ytChannelDB.model(
  'JTracksVideos',
  JTracksChannelSchema,
  'JTracksVideos'
);

// export model
export default {
  ApexChannels,
  JTracksChannels
};
