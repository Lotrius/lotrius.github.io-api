const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'FFF',
    clientId:
      'FFF',
    clientSecret: 'FFF',
    refreshToken: 'FFF'
  }
});

const send = (req, res) => {
  const { email, name, text, subject } = req.body;

  const from = name && email ? `${name} <${email}>` : `${name || email}`;

  const message = {
    from,
    to: 'FFF',
    subject: `New message from ${from} - ${subject}`,
    text,
    replyTo: from
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};

module.exports = {
  send: send
};