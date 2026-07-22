const Hero = require('../models/Hero');

exports.get = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    res.json({
      success: true,
      data: hero
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
    const { heading, subheading, ctaText, ctaLink, profileImage } = req.body;

    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }

    if (heading !== undefined) hero.heading = heading;
    if (subheading !== undefined) hero.subheading = subheading;
    if (ctaText !== undefined) hero.ctaText = ctaText;
    if (ctaLink !== undefined) hero.ctaLink = ctaLink;
    if (profileImage !== undefined) hero.profileImage = profileImage;

    await hero.save();

    res.json({
      success: true,
      message: 'Hero updated successfully',
      data: hero
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
