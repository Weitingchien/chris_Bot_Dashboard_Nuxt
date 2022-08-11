import users from '../models/chrisbotDashboardModel';

export async function formsController(req, res, next) {
  const recommendation = {
    channelsNames: JSON.stringify(req.body.channelsNames),
    channelsTypes: JSON.stringify(req.body.channelsTypes)
  };
  const forms = new users.ChannelRecommendation(recommendation);
  console.log(forms);
  forms.save();
  res.status(200).json({ status: 'success', data: '表單新增成功' });
}
