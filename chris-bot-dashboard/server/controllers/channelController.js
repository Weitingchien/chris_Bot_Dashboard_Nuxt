import channels from '../models/channelModel';

export async function channelController(req, res, next) {
  try {
    const ApexChannelsInfo = await channels.ApexChannels.find();
    const JTracksChannelsInfo = await channels.JTracksChannels.find();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { ApexChannelsInfo, JTracksChannelsInfo }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}
