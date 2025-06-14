# Ruzan Sasuri's Personal Website

This is my personal website showcasing my projects, skills, and experience. The site includes a chatbot feature powered by AWS Lambda.

## Features

- Responsive design using Bootstrap
- Interactive chatbot using AWS Lambda
- Project showcase
- Skills and experience display
- Contact form
- Modern UI with custom styling

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- AWS Lambda for chatbot backend

## Setup

1. Clone the repository
2. Open `index.html` in your browser

## Chatbot Configuration

The chatbot is powered by AWS Lambda. To configure the chatbot:

1. Set up an AWS Lambda function with the following configuration:
   - Runtime: Node.js
   - Handler: index.handler
   - Function URL: Enable with CORS configuration
   - CORS settings:
     - Allow headers: Content-Type
     - Allow methods: POST
     - Allow origins: https://ruzansasuri.com
     - Max age: 86400

2. Update the Lambda URL in `js/stycobot.js`:
```javascript
const LAMBDA_URL = 'https://3hzsi3ljhjj7tw4tp5p5oppzoq0ebqvb.lambda-url.us-east-2.on.aws';
```

## Development

- `index.html` - Main page
- `css/styles.css` - Custom styles
- `js/stycobot.js` - Chatbot functionality
- `assets/fonts/stycobot-fonts.css` - Chatbot font configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Ruzan Sasuri - [@ruzansasuri](https://twitter.com/ruzansasuri)

Project Link: [https://github.com/ruzansasuri/ruzansasuri.com](https://github.com/ruzansasuri/ruzansasuri.com) 