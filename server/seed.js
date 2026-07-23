const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');
const Hero = require('./models/Hero');
const About = require('./models/About');
const Contact = require('./models/Contact');

const seedDB = async () => {
  try {
    console.log('Starting Supabase seeding...');

    // Clear existing data
    await User.deleteAll();
    await Hero.deleteAll();
    await About.deleteAll();
    await Contact.deleteAll();
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      password: hashedPassword
    });
    console.log('✓ Admin user created (username: admin, password: admin123)');

    // Create hero content
    await Hero.create({
      heading: 'Hello, I am',
      subheading: 'Full Stack Developer',
      ctaText: 'View My Work',
      ctaLink: '#portfolio',
      profileImage: 'default-avatar.png'
    });
    console.log('✓ Hero content created');

    // Create about content
    await About.create({
      description: 'Write about yourself here...',
      image: 'default-about.png',
      extraInfo: ''
    });
    console.log('✓ About content created');

    // Create contact content
    await Contact.create({
      email: '',
      phone: '',
      address: '',
      github: '',
      linkedin: '',
      instagram: '',
      twitter: ''
    });
    console.log('✓ Contact content created');

    console.log('\n✅ Database seeded successfully');
    console.log('\nNext steps:');
    console.log('1. Create Supabase Storage bucket: portfolio-images (public)');
    console.log('2. Upload default images to bucket');
    console.log('3. Start server: npm run dev');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

seedDB();
