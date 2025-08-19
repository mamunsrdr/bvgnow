# BVG Now - Real-time Berlin Transit Information

A React-based web application that provides real-time departure information for Berlin's public transport system (BVG). Search for stops with autocomplete functionality and get live departure times for buses, trams, subways, and more.

## ✨ Features

- 🔍 **Smart Search**: Autocomplete search for BVG stops
- 🚌 **Real-time Departures**: Live departure times for all transport types
- 💾 **Local Storage**: Remembers your last searched location
- 📱 **Responsive Design**: Works on desktop and mobile
- 🚫 **Smart Notifications**: Shows helpful messages when no departures are available

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your system

### Docker Deployment
```bash
# Clone and navigate to the project
git clone <repository-url>
cd bvgnow

# Run the deployment script
./deploy.sh
```

The app will be available at http://localhost:3080

## 🛠 Development Setup

### Prerequisites
- Node.js 18+ and npm

### Local Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
