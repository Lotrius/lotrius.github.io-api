const nodemailer = require("nodemailer");

/**
 * Details for mail sending
 */
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "xxxx",
    user: "xxxxx",
    clientId: "xxx",
    clientSecret: "xxx",
    refreshToken: "xxxxxx",
  },
});

/**
 * Send mail
 *
 * @param {*} req the request
 * @param {*} res the response
 *
 */
const send = (req) => {
  const { email, name, message, subject } = req.body; // Destructure body

  // Get where message is from
  const from = name && email ? `${name} <${email}>` : `${name || email}`;

  // Actual message
  const fullEmail = {
    from, // Gmail will auto revert this to the authenticated user and there's nothing you can do
    to: "xxxxx",
    subject: `New message from ${from} - ${subject}`,
    text: message,
    replyTo: from,
  };

  /**
   * Send mail and return promise
   */
  return new Promise((resolve, reject) => {
    transport.sendMail(fullEmail, (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};

// Export send
module.exports = {
  send: send,
};
