import React from 'react';
import './Pages.css';

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React',
      date: 'January 10, 2026',
      excerpt: 'Learn the basics of React and how to build your first component...',
      content: 'React is a powerful JavaScript library for building user interfaces. In this post, we explore the fundamentals.'
    },
    {
      id: 2,
      title: 'Building a Personal Website',
      date: 'January 8, 2026',
      excerpt: 'A guide to creating your own personal website with React Router...',
      content: 'Creating a personal website is a great way to showcase your work and skills to potential employers.'
    },
    {
      id: 3,
      title: 'Web Development Best Practices',
      date: 'January 5, 2026',
      excerpt: 'Essential tips and tricks for modern web development...',
      content: 'Following best practices ensures your code is maintainable, scalable, and efficient.'
    }
  ];

  return (
    <div className="page-container">
      <h1>Blog</h1>
      <div className="content">
        <p className="intro">Thoughts, tutorials, and insights on web development</p>
        
        <div className="blog-posts">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-post">
              <h2>{post.title}</h2>
              <p className="blog-date">{post.date}</p>
              <p className="blog-excerpt">{post.excerpt}</p>
              <p className="blog-content">{post.content}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
