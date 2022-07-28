import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
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
    required: [true, 'A channel must have a vvideoLink']
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
});

const ApexChannel = mongoose.model('ApexChannel', channelSchema);

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

export default ApexChannel;
