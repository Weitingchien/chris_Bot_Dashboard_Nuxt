import channels from '../models/channelModel';

async function documents(type) {
  const documents = await type.find({});
  return documents;
}

export function collectionsnames(req, res, next) {
  res.status(200).json({ status: 'success', data: channels.collectionsNames });
}

export async function getAllDocuments(req, res, next) {
  const ApexChannelsDocuments = await documents(channels.ApexChannels);
  const JTracksChannelsDocuments = await documents(channels.JTracksChannels);
  const allDocuments = ApexChannelsDocuments.concat(JTracksChannelsDocuments);

  //console.log(allDocuments);
  res.status(200).json({
    status: 'success',
    data: allDocuments
  });
}
