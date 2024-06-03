import React from 'react';
import './About.css';

export const About = () => {
  return (
    <div className="about-container">
      <div className="story">
        <h2>Our Story</h2>
        <p>
          EthnoVisionAI was founded with the goal of revolutionizing the way people perceive and understand diversity. Our team of experts developed a cutting-edge AI system that can accurately recognize the ethnicity of individuals in images, helping to promote inclusivity and break down stereotypes.
        </p>
        <p>
          We believe that by providing this technology, we can empower individuals and organizations to better understand and celebrate the rich tapestry of human diversity. Join us on this journey as we work towards a more inclusive and equitable future.
        </p>
      </div>
      <div className="pricing">
        <h2>Pricing</h2>
        <div className="pricing-card">
          <span className="price">$9/mo</span>
          <h3>Basic</h3>
          <p>Perfect for individuals and small teams.</p>
          <ul>
            <li>Unlimited image recognition</li>
            <li>Basic reporting and analytics</li>
            <li>Email support</li>
          </ul>
          <div className="button-wrapper">
            <button className="button">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};
