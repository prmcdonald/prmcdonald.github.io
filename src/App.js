import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentModeProvider } from './content/ContentModeContext';
import Home from './pages/Home';
import About from './pages/About';
import Writing from './pages/Writing';
import Post from './pages/Post';
import Projects from './pages/Projects';

export default function App() {
  return (
    <ContentModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:id" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </ContentModeProvider>
  );
}
