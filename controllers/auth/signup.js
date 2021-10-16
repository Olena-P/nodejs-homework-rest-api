const { Conflict } = require("http-errors");

const { User } = require("../../models/user");
const { sendSuccessRes, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { uuid } = require("uuid");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Already register");
  }

  const verifyToken = uuid();
  const newUser = new User({ email, verifyToken });
  const verifyEmail = {
    to: email,
    subject: "Verify your email to finish registration",
    html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}" target="_blank">Confirm email<a>`,
  };

  const avatar = gravatar.url(
    email,
    {
      s: "250",
      d: "robohash",
    },
    true
  );

  // const newUser = new User({ email });

  newUser.setPassword(password);
  newUser.setAvatar(avatar);

  await newUser.save();
  await sendEmail(verifyEmail);

  sendSuccessRes(res, null, 201);
};

module.exports = signup;
