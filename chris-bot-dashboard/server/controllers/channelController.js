import channels from '../models/channelModel';
//import db from '../config/mongodb';

export async function channelController(req, res, next) {
  console.log('getAllChannels');
  try {
    const ApexChannelsInfo = await channels.ApexChannels.find();
    const JTracksChannelsInfo = await channels.JTracksChannels.find();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: ApexChannelsInfo
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}
