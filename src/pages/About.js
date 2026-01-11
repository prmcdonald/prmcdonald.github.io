import React from 'react';
import './Pages.css';

function About() {
  return (
    <div className="page-container">
      <h1>About Me</h1>
      <div className="content">
        <section>
          <h2>Who I Am</h2>
          <p>
            I'm a passionate software developer with a love for creating elegant solutions 
            to complex problems. With experience in web development, I enjoy working with 
            modern technologies and frameworks.
          </p>
        </section>
        
        <section>
          <h2>My Skills</h2>
          <ul className="skills-list">
            <li>React & JavaScript</li>
            <li>HTML & CSS</li>
            <li>Node.js</li>
            <li>Web Development</li>
            <li>Problem Solving</li>
          </ul>
        </section>
        
        <section>
          <h2>Interests</h2>
          <p>
            When I'm not coding, I enjoy learning new technologies, contributing to 
            open source projects, and staying up-to-date with the latest trends in 
            software development.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
