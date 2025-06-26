# 🚀 BLOGIFY - A Modern Blogging Platform

A full-stack blog application built with Node.js, Express, MongoDB, and Handlebars. BLOGIFY provides a complete blogging platform with user authentication, blog management, and interactive features.

![BLOGIFY](https://img.shields.io/badge/BLOGIFY-Blogging%20Platform-blue)
![Node.js](https://img.shields.io/badge/Node.js-14+-green)
![Express](https://img.shields.io/badge/Express-4.18+-yellow)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-orange)
![Handlebars](https://img.shields.io/badge/Handlebars-8.0+-red)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 User Management
- **User Registration & Login** - Secure authentication system
- **JWT Token Authentication** - Stateless authentication
- **Password Encryption** - bcrypt hashing for security
- **User Profiles** - Personal user information management

### 📝 Blog Management
- **CRUD Operations** - Create, Read, Update, Delete blogs
- **Rich Text Content** - Support for formatted blog posts
- **Categories & Tags** - Organize content effectively
- **Search & Filter** - Find blogs easily

### 🎯 Interactive Features
- **Like/Unlike System** - User engagement features
- **Real-time Updates** - Dynamic content loading
- **Responsive Design** - Works on all devices
- **Sample Blogs** - Showcase featured content

### 🛡️ Security Features
- **Protected Routes** - Authorization middleware
- **Input Validation** - Data sanitization
- **Error Handling** - Comprehensive error management
- **Session Management** - Secure user sessions

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management

### Frontend
- **Handlebars** - Server-side templating engine
- **CSS3** - Custom styling and responsive design
- **JavaScript** - Client-side interactions
- **Bootstrap** - UI framework (optional)

### Development Tools
- **nodemon** - Development server with auto-restart
- **Morgan** - HTTP request logger
- **Body Parser** - Request body parsing

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v7.0 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/blogify.git
cd blogify
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
TOKEN_SECRET=your-super-secret-jwt-key-here
MONGODB_URI=mongodb://localhost:27017/blog123
NODE_ENV=development
```

### Step 4: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Step 5: Run the Application
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### Step 6: Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## 📖 Usage

### For Users
1. **Register/Login** - Create an account or sign in
2. **Browse Blogs** - Explore existing blog posts
3. **Create Content** - Write and publish your own blogs
4. **Interact** - Like, comment, and engage with content
5. **Manage Profile** - Update your personal information

### For Developers
1. **API Integration** - Use RESTful endpoints
2. **Custom Styling** - Modify CSS in `public/stylesheets/`
3. **Database Queries** - Extend models in `model/` directory
4. **Add Features** - Extend controllers and services

## 📁 Project Structure

```
BLOGIFY/
├── app.js                    # Main application entry point
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
├── .env                      # Environment variables (create this)
├── .gitignore               # Git ignore file
│
├── controllers/              # Request handlers
│   ├── blog.controller.js    # Blog CRUD operations
│   ├── user.controller.js    # User authentication
│   ├── about.controller.js   # About page logic
│   └── index.js             # Controller exports
│
├── models/                   # Database schemas
│   ├── blog.js              # Blog model
│   ├── user.model.js        # User model
│   └── index.js             # Model exports
│
├── services/                 # Business logic layer
│   ├── blog.service.js      # Blog business logic
│   ├── user.service.js      # User business logic
│   ├── about.service.js     # About page data
│   └── index.js             # Service exports
│
├── routes/                   # Route definitions
│   ├── index.js             # Main routes
│   ├── user.route.js        # User routes
│   └── blog/                # Blog routes
│       └── index.js         # Blog route handlers
│
├── middlewares/              # Custom middleware
│   ├── auth.middleware.js    # Authentication middleware
│   ├── authorization.middleware.js # Authorization
│   ├── loggedIn.middleware.js # Login status check
│   └── index.js             # Middleware exports
│
├── helper/                   # Utility functions
│   ├── token.helper.js      # JWT token utilities
│   ├── db.helper.js         # Database helper functions
│   └── index.js             # Helper exports
│
├── views/                    # Handlebars templates
│   ├── layouts/             # Layout templates
│   │   └── layout.hbs       # Main layout
│   ├── partials/            # Reusable components
│   │   └── header.hbs       # Header component
│   ├── pages/               # Page templates
│   │   ├── blogs.hbs        # Blog listing page
│   │   └── profile.hbs      # User profile page
│   ├── form/                # Form templates
│   │   ├── login.hbs        # Login form
│   │   ├── signup.hbs       # Registration form
│   │   ├── add-blog.hbs     # Blog creation form
│   │   └── edit-blog.hbs    # Blog editing form
│   ├── index.hbs            # Home page
│   ├── about.hbs            # About page
│   ├── sampleblogs.hbs      # Sample blogs page
│   └── error.hbs            # Error page
│
└── public/                   # Static assets
    ├── stylesheets/         # CSS files
    │   └── style.css        # Main stylesheet
    └── images/              # Image assets
        ├── akash.png
        ├── aman.jpg
        ├── harsh.jpg
        ├── kshitiz.png
        └── download.jpg
```

## 🔌 API Endpoints

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/signup` | Register a new user |
| POST | `/user/login` | User login |
| GET | `/user/profile` | Get user profile |
| POST | `/user/logout` | User logout |

### Blog Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blog` | Get all blogs |
| GET | `/blog/:id` | Get specific blog |
| POST | `/blog` | Create new blog |
| PUT | `/blog/:id` | Update blog |
| DELETE | `/blog/:id` | Delete blog |
| POST | `/blog/like/:id` | Like/unlike blog |

### Other Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/about` | About page |
| GET | `/sampleblogs` | Sample blogs page |

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  title: String,
  content: String,
  author: ObjectId (ref: User),
  likes: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

### Authentication
- **JWT Tokens** - Secure stateless authentication
- **Password Hashing** - bcrypt with salt rounds
- **Token Expiration** - Configurable token lifetime

### Authorization
- **Protected Routes** - Middleware-based access control
- **Role-based Access** - User permission system
- **Input Validation** - Data sanitization and validation

### Data Protection
- **Environment Variables** - Sensitive data protection
- **Error Handling** - Secure error messages
- **Session Management** - Secure user sessions

## 🧪 Testing

### Running Tests
```bash
# Install test dependencies
npm install --save-dev jest supertest

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── e2e/           # End-to-end tests
```

## 🚀 Deployment

### Environment Variables
Set these environment variables for production:
```env
NODE_ENV=production
PORT=3000
TOKEN_SECRET=your-production-secret
MONGODB_URI=your-production-mongodb-uri
```

### Deployment Options
1. **Heroku** - Easy deployment with Git integration
2. **Vercel** - Serverless deployment
3. **AWS** - Scalable cloud deployment
4. **DigitalOcean** - VPS deployment

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Express.js** - Web framework
- **MongoDB** - Database
- **Handlebars** - Templating engine
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📞 Support

If you have any questions or need help:

- **Issues** - Create an issue on GitHub
- **Email** - contact@blogify.com
- **Documentation** - Check the docs folder

## 🔄 Version History

- **v1.0.0** - Initial release with basic CRUD operations
- **v1.1.0** - Added authentication and authorization
- **v1.2.0** - Enhanced UI and user experience
- **v1.3.0** - Added like system and interactive features

---

**Made with ❤️ by the BLOGIFY Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/blogify)](https://github.com/yourusername/blogify/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/blogify)](https://github.com/yourusername/blogify/network)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/blogify)](https://github.com/yourusername/blogify/issues)
[![GitHub license](https://img.shields.io/github/license/yourusername/blogify)](https://github.com/yourusername/blogify/blob/master/LICENSE) 