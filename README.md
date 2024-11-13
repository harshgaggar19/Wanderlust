![Lading Page](/Client/src/assets/landing_page.png)
# Wanderlust 🌍  
**Wanderlust** is a full-stack web application inspired by Airbnb. It allows users to explore unique stays and manage their own listings.  

## Features ✨  
- **User Authentication**: Secure login and registration using JWT.  
- **Listings Management**: Users can add, edit, and delete their listings.  
- **Explore Listings**: Browse and filter listings by categories such as:  
  - 🏔️ Mountains  
  - 🏰 Castles  
  - 🏊 Pools  
  - 🏖️ Beaches  
- **Map Integration**: View the location of listings on an interactive map.  
- **Cloud Image Storage**: Images are securely stored and retrieved via Cloudinary.  

## Tech Stack 💻  
- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Tokens)  
- **Image Storage**: Cloudinary  
- **Map Integration**: [Specify if you used a particular API, e.g., Google Maps, Mapbox]  

## Getting Started 🚀  

### Prerequisites  
- Node.js installed on your machine  
- MongoDB set up locally or using a cloud provider (e.g., MongoDB Atlas)  

### Installation  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/harshgaggar/Wanderlust1.git  
   cd wanderlust  
2. Install dependencies:
    ```bash
    npm install  
    cd client  
    npm install  
3. Set up environment variables:
    Create a .env file in the root directory and add the following:

    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=cloudinary_api_key
    CLOUD_API_SECRET=cloudinary_api_secret
    MAP_TOKEN=mapbox_token
    JWT_SECRET=your_jwt_secret
    MONGO_URL=your_mongodb_connectionstring
4. Run the application:
    ```bash
    //Run the backend  
    npm run server  

    //Run the frontend  
    cd client  
    npm start  
5. Visit the application in your browser: http://localhost:5173