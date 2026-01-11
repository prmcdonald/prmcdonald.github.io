# Personal Website

A modern, responsive personal website built with React featuring multiple pages to showcase professional information, portfolio, resume, and blog posts.

## Features

- **Home Page**: Welcoming landing page with introduction
- **About Me**: Personal information, skills, and interests
- **Portfolio**: Showcase of projects with descriptions and technologies
- **Resume**: Professional experience, education, and skills
- **Blog**: Articles and thoughts on web development
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Client-Side Routing**: Fast navigation using React Router
- **Modern UI**: Clean design with smooth animations

## Technologies Used

- React 19.2.3
- React Router DOM 7.12.0
- Create React App
- CSS3 with custom styling
- GitHub Pages ready

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/prmcdonald/prmcdonald.github.io.git
cd prmcdonald.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`

Deploys the application to GitHub Pages.\
First runs the build script, then publishes to the gh-pages branch.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.js    # Navigation bar
│   └── Navigation.css
├── pages/              # Page components
│   ├── Home.js
│   ├── About.js
│   ├── Portfolio.js
│   ├── Resume.js
│   ├── Blog.js
│   └── Pages.css
├── App.js              # Main app component with routing
├── App.css
├── index.js            # App entry point
└── index.css           # Global styles
```

## Customization

To customize the website for your own use:

1. **Update Content**: Edit the page components in `src/pages/` to add your personal information
2. **Modify Styles**: Update the CSS files to match your preferred color scheme and design
3. **Add Projects**: Edit `Portfolio.js` to showcase your own projects
4. **Update Resume**: Modify `Resume.js` with your education and experience
5. **Add Blog Posts**: Update `Blog.js` with your articles

## Deployment

This project is configured for deployment to GitHub Pages:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch of your repository.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [React Router documentation](https://reactrouter.com/)

## License

This project is open source and available under the MIT License.
