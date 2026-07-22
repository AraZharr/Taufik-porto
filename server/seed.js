const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');
const Hero = require('./models/Hero');
const About = require('./models/About');
const Contact = require('./models/Contact');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');

    await User.deleteMany({});
    await Hero.deleteMany({});
    await About.deleteMany({});
    await Contact.deleteMany({});

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      password: hashedPassword
    });
    console.log('Admin user created');

    await Hero.create({
      heading: 'Hello, I am',
      subheading: 'Full Stack Developer',
      ctaText: 'View My Work',
      ctaLink: '#portfolio',
      profileImage: 'uploads/default-avatar.png'
    });
    console.log('Hero content created');

    await About.create({
      description: 'Write about yourself here...',
      image: 'uploads/default-about.png',
      extraInfo: ''
    });
    console.log('About content created');

    await Contact.create({
      email: '',
      phone: '',
      address: '',
      github: '',
      linkedin: '',
      instagram: '',
      twitter: ''
    });
    console.log('Contact content created');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
