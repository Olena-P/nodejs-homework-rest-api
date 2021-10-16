const { Conflict } = require("http-errors");

const { User } = require("../../models/user");
const { sendSuccessRes } = require("../../helpers");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Already register");
  }

  const avatar = gravatar.url(
    email,
    {
      s: "250",
      d: "robohash",
    },
    true
  );

  const newUser = new User({ email });

  newUser.setPassword(password);
  newUser.setAvatar(avatar);

  await newUser.save();

  sendSuccessRes(res, null, 201);
};

module.exports = signup;
