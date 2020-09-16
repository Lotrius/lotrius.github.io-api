const nodemailer = require("nodemailer");

/**
 * Details for mail sending
 */
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "skim7420@gmail.com",
    clientId:
      "237051736301-k9ivtnqpls05qks7u3fkoda8eej3ibha.apps.googleusercontent.com",
    clientSecret: "ir0PjJUvFfmwOnRFy1nuEHQA",
    refreshToken:
      "1//04_0cE_x1SPh3CgYIARAAGAQSNwF-L9IrYGE5hXtoeoMCYMwH8zAuUtAZxYh6NWwf_8SAfSqToFat-l0BOULwbtoJa0V-t8il5Mc",
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
    to: "skim7420@gmail.com",
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
