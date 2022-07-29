import channels from '../models/channelModel';
//import db from '../config/mongodb';

export async function channelController(req, res, next) {
  console.log('getAllChannels');
  try {
    console.log('getAllChannels enter');
    //console.log(`ApexChannels: ${channels.ApexChannels}`);
    const channelInfo = await channels.ApexChannels.find();
    console.log(channelInfo);
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
