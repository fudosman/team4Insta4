const User = require("../models/users");

// list all users
exports.findFriends = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};


// follow user
exports.follow = async (req, res) => {
  console.log("following");

  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.body.userId },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};

//  unfollow user
exports.unfollow = (req, res) => {
  console.log("unfollowing");
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.body.userId },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
};
