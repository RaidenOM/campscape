# Campscape

Campscape is a full-stack web application where users can discover, create, edit, delete and review campgrounds. It features user authentication, campground management, and a dynamic review system.

[![Campscape](https://i.postimg.cc/t4MnPMzr/Screenshot-2024-08-20-151632.png)](https://postimg.cc/yD0NCnt9)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and registration using Passport.js.
- **Campground Management:** Users can create, edit, and delete campgrounds.
- **Review System:** Users can submit, and delete reviews for campgrounds.
- **Flash Messages:** Informative feedback for user actions.
- **Form Validation:** Server-side validation using Joi.
- **Session Management:** Persistent user sessions stored in MongoDB.
- **Responsive Design:** Mobile-friendly design using EJS templating and Bootstrap.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js, Passport-Local-Mongoose
- **Templating:** EJS, EJS-Mate
- **Styling:** Bootstrap, Custom CSS
- **Environment Management:** dotenv

## Usage

- **Register or log in:** Create an account or log in using your credentials.
- **Explore campgrounds:** Browse the list of available campgrounds.
- **Create a new campground:** Add a new campground with details such as title, location, image, and description.
- **Review a campground:** Submit a review with a rating and comments.
- **Manage your campgrounds:** Edit or delete your campgrounds and reviews.

## Environment Variables

- `DB_URL`: The MongoDB connection string.
- `CLOUDINARY_CLOUD_NAME` : The Cloudinary cloud name
- `CLOUDINARY_KEY` : The Cloudinary API key
- `CLOUDINARY_SECRET` : The Cloudinary API Secret key
- `MAPTILER_API_KEY` : The API key for MapTiler

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.

---
