const About = require('../models/About');

exports.get = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { description, image, extraInfo } = req.body;

    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }

    if (description !== undefined) about.description = description;
    if (image !== undefined) about.image = image;
    if (extraInfo !== undefined) about.extraInfo = extraInfo;

    await about.save();

    res.json({
      success: true,
      message: 'About updated successfully',
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
