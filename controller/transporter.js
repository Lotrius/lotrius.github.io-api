const nodemailer = require('nodemailer');

// Details for mail sending
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'skim7420@gmail.com',
    clientId:
      '237051736301-k9ivtnqpls05qks7u3fkoda8eej3ibha.apps.googleusercontent.com',
    clientSecret: '92_HvLH1trwJqvanl77e3v9p',
    refreshToken: '1/1lk2wyRKzba9yHuC_Hpxs99-kK7YVDSkuB7f2ni8bY0'
  }
});

// Send mail
const send = (req, res) => {
  const { email, name, text, subject } = req.body; // Destructure body

  // Get where message is from
  const from = name && email ? `${name} <${email}>` : `${name || email}`;

  // Actual message
  const message = {
    from,
    to: 'skim7420@gmail.com',
    subject: `New message from ${from} - ${subject}`,
    text,
    replyTo: from
  };

  // Send mail and return promise
  return new Promise((resolve, reject) => {
    transport.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};

module.exports = {
  send: send
};