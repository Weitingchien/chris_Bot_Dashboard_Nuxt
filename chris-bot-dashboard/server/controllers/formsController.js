import users from '../models/chrisbotDashboardModel';

export async function formsController(req, res, next) {
  console.log('觸發');
  const recommendation = {
    channelsNames: JSON.stringify(req.body.channelsNames),
    channelsTypes: JSON.stringify(req.body.channelsTypes)
  };
  const forms = await users.ChannelRecommendation.create(recommendation);
  forms.save((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: 'fail' });
    } else {
      console.log('資料回傳');
      res.status(200).json({ status: 'success', data: '表單已成功送出' });
    }
  });
}
