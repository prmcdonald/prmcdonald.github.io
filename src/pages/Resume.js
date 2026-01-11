import React from 'react';
import './Pages.css';

function Resume() {
  return (
    <div className="page-container">
      <h1>Resume</h1>
      <div className="content resume-content">
        <section className="resume-section">
          <h2>Education</h2>
          <div className="resume-item">
            <h3>Bachelor of Science in Computer Science</h3>
            <p className="institution">University Name</p>
            <p className="date">2018 - 2022</p>
          </div>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          <div className="resume-item">
            <h3>Software Developer</h3>
            <p className="institution">Company Name</p>
            <p className="date">2022 - Present</p>
            <ul>
              <li>Developed and maintained web applications using React</li>
              <li>Collaborated with cross-functional teams</li>
              <li>Implemented responsive designs and user interfaces</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>JavaScript</li>
                <li>HTML/CSS</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools</h3>
              <ul>
                <li>Git</li>
                <li>npm</li>
                <li>VS Code</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Resume;
