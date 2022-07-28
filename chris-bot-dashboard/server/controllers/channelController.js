import channel from '../models/channelModel';

export async function getAllChannels(req, res, next) {
  console.log('getAllChannels');
  try {
    const channelInfo = await channel.find();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: channelInfo
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}
