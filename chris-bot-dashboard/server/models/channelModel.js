import mongoose from 'mongoose';

const ChannelRecommendationSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: [
      true,
      'If you want to recommend a channel, you must provide a link'
    ]
  }
});

const apexChannelSchema = new mongoose.Schema(
  {
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
    },
    videoViews: {
      type: String
    },
    videoChannelName: {
      type: String
    },
    videoUploadedTime: {
      type: String
    }
  },
  { collection: 'ApexVideos' }
);

const JTracksChannelSchema = new mongoose.Schema(
  {
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
    },
    videoViews: {
      type: String
    },
    videoChannelName: {
      type: String
    },
    videoUploadedTime: {
      type: String
    }
  },
  { collection: 'JTracksVideos' }
);

// create model from the schema
const ChannelRecommendation = mongoose.model(
  'ChannelRecommendation',
  ChannelRecommendationSchema,
  'ChannelRecommendation'
); //The third parameter can be used to remove the s at the end of the DB name
const ApexChannels = mongoose.model('ApexVideos', apexChannelSchema);
const JTracksChannels = mongoose.model('JTracksVideos', JTracksChannelSchema);

// export model
export default { ChannelRecommendation, ApexChannels, JTracksChannels };
/*
test
const testApexChannel = new ApexChannel({
  videoID: 'sadasd',
  videoLink: 'http://erewrwerew'
});

testApexChannel
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(err);
  });
*/
