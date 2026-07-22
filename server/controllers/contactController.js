const Contact = require('../models/Contact');

exports.get = async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({});
    }
    res.json({
      success: true,
      data: contact
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
    const { email, phone, address, github, linkedin, instagram, twitter } = req.body;

    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({});
    }

    if (email !== undefined) contact.email = email;
    if (phone !== undefined) contact.phone = phone;
    if (address !== undefined) contact.address = address;
    if (github !== undefined) contact.github = github;
    if (linkedin !== undefined) contact.linkedin = linkedin;
    if (instagram !== undefined) contact.instagram = instagram;
    if (twitter !== undefined) contact.twitter = twitter;

    await contact.save();

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
