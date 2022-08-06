import mongoose from 'mongoose';

const config = useRuntimeConfig();

const dbConnectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const chrisbotDB = mongoose.createConnection(
  config.MONGODBCONNECTIONSTRINGCHRISBOTDB,
  dbConnectOptions
);

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      unique: true,
      required: [true, 'A user must have a userID']
    },
    userName: {
      type: String
    },
    userAvatar: {
      type: String
    },
    access_token: {
      type: String
    },
    refresh_token: {
      type: String
    }
  },
  { timestamps: true }
);

const sessionSchema = new mongoose.Schema({
  sessionID: {
    type: String
  },
  userID: {
    type: String,
    unique: true,
    required: [true, 'A user must have a userID']
  },
  data: {
    type: String
  },
  expiresAt: {
    type: Date
  }
});

const ChannelRecommendationSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: [
      true,
      'If you want to recommend a channel, you must provide a link'
    ]
  }
});

const ChannelRecommendation = chrisbotDB.model(
  'ChannelRecommendation',
  ChannelRecommendationSchema,
  'ChannelRecommendation'
);

const chrisbotDashboardUsers = chrisbotDB.model(
  'chrisbotDashboardUsers',
  userSchema,
  'chrisbotDashboardUsers'
);

const chrisbotDashboardSession = chrisbotDB.model(
  'chrisbotDashboardSession',
  sessionSchema,
  'chrisbotDashboardSession'
);

// export model
export default {
  chrisbotDashboardUsers,
  ChannelRecommendation,
  chrisbotDashboardSession
};
