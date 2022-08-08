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

const collectionsNames = [];
const collections = ytChannelDB.collections;

Object.keys(collections).forEach((el, index, array) => {
  collectionsNames.push(el);
});

const ApexChannelsDocuments = documents(ApexChannels);
const JTracksChannelsDocuments = documents(JTracksChannels);

async function documents(type) {
  const documents = await type.find({});
  return documents;
}

// export model
export default {
  ApexChannels,
  JTracksChannels,
  collectionsNames,
  ApexChannelsDocuments,
  JTracksChannelsDocuments
};
