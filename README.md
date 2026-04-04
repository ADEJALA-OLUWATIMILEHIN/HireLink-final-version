
**HIRELINK**
HireLink | Full-Stack Job Career Platform
HireLink is a robust job portal designed to bridge the gap between employers and job seekers. Built with the PERN stack (PostgreSQL, Express, React, Node.js), it features a scalable architecture, secure authentication, and a seamless UI/UX for managing job applications and listings.

🚀 Features
For Job Seekers
Dynamic Job Discovery: Search and filter jobs by location, type, and salary range.

Application Management: Track application statuses (Pending, Reviewed, Accepted, Rejected) in real-time.

Resume Hosting: Integrated file uploads via Multer and cloud storage.

For Employers
Job Lifecycle Management: Create, update, and archive job postings.

Applicant Tracking System (ATS): Review applicant profiles and manage recruitment workflows.

Analytics: Basic insights into job view counts and application volume.

🛠️ Tech Stack
Frontend
React.js: Functional components with Hooks for state management.

Tailwind CSS: For responsive and utility-first styling.

Axios: Interceptors for handling global API configurations and JWT injection.

Backend
Node.js & Express: Clean MVC (Model-View-Controller) architecture.

Sequelize ORM: Advanced PostgreSQL modeling with associations and migrations.

JWT & Bcrypt: Secure authentication and password hashing.

Multer: Middleware for handling multipart/form-data (file uploads).

Database
PostgreSQL: Relational database for complex data integrity (Jobs ↔ Applications ↔ Users).

🏗️ Architectural Decisions
Database Normalization: Leveraged relational mapping to ensure data consistency between users and job entities.

Error Handling: Implemented a global error-handling middleware in Express to catch SequelizeDatabaseError and file upload errors gracefully.

Security: Implemented CORS policies and environment variable protection for sensitive API keys and DB credentials.

🚦 Getting Started
Prerequisites
Node.js (v16+)

PostgreSQL

Installation
Clone the repository

Bash

git clone https://github.com/ADEJALA-OLUWATIMILEHIN/HireLink.git
cd HireLink
Backend Setup

Bash

cd backend
npm install
Create a .env file in the backend folder:

Code snippet

PORT=5000
DB_NAME=hirelink_db
DB_USER=postgres
DB_PASS=yourpassword
JWT_SECRET=your_super_secret_key
Frontend Setup

Bash

cd ../frontend
npm install
npm start
📈 Future Roadmap
[ ] Real-time Notifications: Using Socket.io for application updates.

[ ] AI Job Matching: Suggested jobs based on user skills.

[ ] Advanced Analytics: Dashboard for employers to see hiring trends.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

Developed with ❤️ by ADEJALA TIMILEHIN
University of Lagos | Computer Science
