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
    console.error('Hero get error:', error);
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

    const updates = {};
    if (heading !== undefined) updates.heading = heading;
    if (subheading !== undefined) updates.subheading = subheading;
    if (ctaText !== undefined) updates.ctaText = ctaText;
    if (ctaLink !== undefined) updates.ctaLink = ctaLink;
    if (profileImage !== undefined) updates.profileImage = profileImage;

    hero = await Hero.update(hero.id, updates);

    res.json({
      success: true,
      message: 'Hero updated successfully',
      data: hero
    });
  } catch (error) {
    console.error('Hero update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
