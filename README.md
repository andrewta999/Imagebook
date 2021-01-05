# Imagebook - Shopify 2021 developer challenge

Imagebook is a web platform that allows users to store and access their images securely and easily. Users can create accounts and start uploading images to the platform. They can choose to allow public access of private access to their images. Furthermore, an user can view other people's public images, but only an owner can delete his or her images. All images are stored persistently on a database. 

## Demo

The project is deployed on Heroku for a quick demo. Link [here](https://imagebook1.herokuapp.com/). You can create a new account or use these credentials to login if you just want to quick test: 
- username: andrew
- password: 12345 

Upon login, you can view all of your images or view public images of other people. Visit 'Home' tab on the navbar to view all public images and your images. Click on an image to view its details. Visit 'Upload' tab on the navbar to upload an image. You can also delete an image by clicking on the image and then press 'Delete' button. Below are some images of the demo. You can try it out on the link above.

#### Login
![login](https://github.com/andrewta999/Imagebook/blob/master/img/login.png)

#### Home
![home](https://github.com/andrewta999/Imagebook/blob/master/img/home.png)

#### Upload
![upload](https://github.com/andrewta999/Imagebook/blob/master/img/upload.png)

#### Delete
![delete](https://github.com/andrewta999/Imagebook/blob/master/img/delete.png)

## Development

I you want to run this project locally, follow the following steps

1. Clone this repositoy

### Backend Development

2. Run this command to install all dependencies
```
npm instal
```

3. Create a .env file on the root directory with the following credentials: 
```
JWT_SECRET="Any string you want"
MONGODB="URI to a mongodb database"
PORT=3001
```

4. Run this command to start the backend in development mode
```
npm run dev
```

5. Build and run the backend in production
```
npm run build
npm start
```

### Frontend Development
6. cd into the frontend folder
```
cd frontend
```

7. Install all dependencies for frontend development
```
npm install
```

8. Start frontend development server 
```
npm start
```

9. Vist http://localhost:3000 to access the platform
