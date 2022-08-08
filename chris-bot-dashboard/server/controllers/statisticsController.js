import channels from '../models/channelModel';

export function collectionsnames(req, res, next) {
  console.log(channels.collectionsNames);
  res.status(200).json({ status: 'success', data: channels.collectionsNames });
}
