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
    console.error('Contact get error:', error);
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

    const updates = {};
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (address !== undefined) updates.address = address;
    if (github !== undefined) updates.github = github;
    if (linkedin !== undefined) updates.linkedin = linkedin;
    if (instagram !== undefined) updates.instagram = instagram;
    if (twitter !== undefined) updates.twitter = twitter;

    contact = await Contact.update(contact.id, updates);

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Contact update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
