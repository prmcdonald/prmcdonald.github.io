import React from 'react';
import './Pages.css';

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'Personal Website',
      description: 'A React-based personal website showcasing my work and skills.',
      technologies: ['React', 'React Router', 'CSS']
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Description of your second project goes here.',
      technologies: ['JavaScript', 'HTML', 'CSS']
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Description of your third project goes here.',
      technologies: ['React', 'Node.js', 'Express']
    }
  ];

  return (
    <div className="page-container">
      <h1>Portfolio</h1>
      <div className="content">
        <p className="intro">Here are some of the projects I've worked on:</p>
        
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
