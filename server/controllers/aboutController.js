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
    console.error('About get error:', error);
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

    const updates = {};
    if (description !== undefined) updates.description = description;
    if (image !== undefined) updates.image = image;
    if (extraInfo !== undefined) updates.extraInfo = extraInfo;

    about = await About.update(about.id, updates);

    res.json({
      success: true,
      message: 'About updated successfully',
      data: about
    });
  } catch (error) {
    console.error('About update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
