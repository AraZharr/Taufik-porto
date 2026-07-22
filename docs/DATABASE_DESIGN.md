# DATABASE DESIGN — Portfolio Website

---

## 1. Database Overview

| Property | Value |
|----------|-------|
| **Database Type** | Document (NoSQL) |
| **Database Name** | portfolio_db |
| **ODM** | Mongoose 7.x |
| **Host** | MongoDB Atlas (prod) / localhost (dev) |

---

## 2. Entity Relationship Diagram

```
┌─────────────────────┐
│       Users         │
├─────────────────────┤
│ _id      : ObjectId │
│ username : String   │
│ password : String   │
│ createdAt: Date     │
└─────────────────────┘
         │
         │ 1:1 (Single Admin)
         ▼
┌─────────────────────┐
│       Hero          │
├─────────────────────┤
│ _id         : ObjectId │
│ heading     : String   │
│ subheading  : String   │
│ ctaText     : String   │
│ ctaLink     : String   │
│ profileImage: String   │
│ updatedAt   : Date     │
└─────────────────────┘

┌─────────────────────┐
│       About         │
├─────────────────────┤
│ _id         : ObjectId │
│ description : String   │
│ image       : String   │
│ extraInfo   : String   │
│ updatedAt   : Date     │
└─────────────────────┘

┌─────────────────────┐
│      Contact        │
├─────────────────────┤
│ _id      : ObjectId   │
│ email    : String     │
│ phone    : String     │
│ address  : String     │
│ github   : String     │
│ linkedin : String     │
│ instagram: String     │
│ twitter  : String     │
│ updatedAt: Date       │
└─────────────────────┘

┌─────────────────────┐
│      Messages       │
├─────────────────────┤
│ _id      : ObjectId   │
│ name     : String     │
│ email    : String     │
│ subject  : String     │
│ message  : String     │
│ isRead   : Boolean    │
│ createdAt: Date       │
└─────────────────────┘
```

---

## 3. Collection Schema

### 3.1 Users Collection

```javascript
// models/User.js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username must not exceed 30 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

**Indexes:**
- `username`: unique index

---

### 3.2 Hero Collection

```javascript
// models/Hero.js
const heroSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Heading is required'],
    trim: true,
    maxlength: [100, 'Heading must not exceed 100 characters'],
    default: 'Hello, I am'
  },
  subheading: {
    type: String,
    required: [true, 'Subheading is required'],
    trim: true,
    maxlength: [200, 'Subheading must not exceed 200 characters'],
    default: 'Full Stack Developer'
  },
  ctaText: {
    type: String,
    trim: true,
    maxlength: [50, 'CTA text must not exceed 50 characters'],
    default: 'View My Work'
  },
  ctaLink: {
    type: String,
    trim: true,
    maxlength: [200, 'CTA link must not exceed 200 characters'],
    default: '#portfolio'
  },
  profileImage: {
    type: String,
    default: 'uploads/default-avatar.png'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

**Constraints:**
- Single document pattern (only 1 hero content)
- Auto-update `updatedAt` on save

---

### 3.3 About Collection

```javascript
// models/About.js
const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description must not exceed 2000 characters'],
    default: 'Write about yourself here...'
  },
  image: {
    type: String,
    default: 'uploads/default-about.png'
  },
  extraInfo: {
    type: String,
    trim: true,
    maxlength: [1000, 'Extra info must not exceed 1000 characters'],
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

**Constraints:**
- Single document pattern

---

### 3.4 Contact Collection

```javascript
// models/Contact.js
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    maxlength: [100, 'Email must not exceed 100 characters'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    default: ''
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone must not exceed 20 characters'],
    default: ''
  },
  address: {
    type: String,
    trim: true,
    maxlength: [300, 'Address must not exceed 300 characters'],
    default: ''
  },
  github: {
    type: String,
    trim: true,
    maxlength: [200, 'GitHub URL must not exceed 200 characters'],
    default: ''
  },
  linkedin: {
    type: String,
    trim: true,
    maxlength: [200, 'LinkedIn URL must not exceed 200 characters'],
    default: ''
  },
  instagram: {
    type: String,
    trim: true,
    maxlength: [200, 'Instagram URL must not exceed 200 characters'],
    default: ''
  },
  twitter: {
    type: String,
    trim: true,
    maxlength: [200, 'Twitter URL must not exceed 200 characters'],
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

**Constraints:**
- Single document pattern
- Email format validation

---

### 3.5 Messages Collection (Fase Mendatang)

```javascript
// models/Message.js
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name must not exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  subject: {
    type: String,
    trim: true,
    maxlength: [200, 'Subject must not exceed 200 characters'],
    default: 'No Subject'
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [5000, 'Message must not exceed 5000 characters']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

**Indexes:**
- `isRead`: index for filtering unread messages
- `createdAt`: index for sorting

---

## 4. Single Document Pattern

Hero, About, dan Contact menggunakan **Single Document Pattern** — hanya ada 1 document per collection.

### Implementation

```javascript
// Service layer example
class HeroService {
  static async get() {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({}); // Create with defaults
    }
    return hero;
  }

  static async update(data) {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(data);
    } else {
      Object.assign(hero, data);
      await hero.save();
    }
    return hero;
  }
}
```

---

## 5. Seed Data

### Initial Admin User

```javascript
// seed.js
{
  username: "admin",
  password: "$2b$10$..." // hashed "admin123"
}
```

### Default Content

```javascript
// Hero default
{
  heading: "Hello, I am",
  subheading: "Full Stack Developer",
  ctaText: "View My Work",
  ctaLink: "#portfolio",
  profileImage: "uploads/default-avatar.png"
}

// About default
{
  description: "Write about yourself here...",
  image: "uploads/default-about.png",
  extraInfo: ""
}

// Contact default
{
  email: "",
  phone: "",
  address: "",
  github: "",
  linkedin: "",
  instagram: "",
  twitter: ""
}
```

---

## 6. Database Configuration

```javascript
// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 7.x doesn't need these options
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Environment Variables

```env
# .env
MONGODB_URI=mongodb://localhost:27017/portfolio_db
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio_db
```

---

*Document created: 2026-07-22*
*Status: Waiting for Approval*
