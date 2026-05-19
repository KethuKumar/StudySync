import userModel from "../models/user.model.js";

export const getTutors = async (req, res) => {
  try {
    const tutors = await userModel.find({
      isTutor: true,
    }).select("name hourlyRate skills");

    res.json(tutors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTutorProfile =
  async (req, res) => {

    try {

      const {
        hourlyRate,
        skills,
        bio
      } = req.body;

      const user =
        await userModel.findById(
          req.user
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found"
        });
      }


      user.isTutor = true;

      user.hourlyRate =
        hourlyRate;

      user.skills = skills;

      user.bio = bio;

      await user.save();

      res.json(user);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };