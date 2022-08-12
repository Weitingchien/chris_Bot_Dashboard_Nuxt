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
      type: String,
      required: true
    },
    refresh_token: {
      type: String,
      required: true
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

const ChannelRecommendationSchema = new mongoose.Schema(
  {
    channelsNames: {
      type: String,
      required: [true, 'You must provide a channelsNames']
    },
    channelsTypes: {
      type: String,
      requried: [true, 'You must provide a channelsTypes']
    }
  },
  { timestamps: true }
);

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
  chrisbotDashboardSession,
  chrisbotDB
};
