import React, {useState} from 'react';
import './About.css';


const PaymentPopup = ({handleClose}) => {
    const [purchased, setPurchased] = useState(false);

    return (
        <div className="payment">

            {
                !purchased
                    ? (
                        <div className="payment-form">
                            <div className="payment-close" onClick={handleClose}>x</div>
                            <h2>Payment</h2>
                            <form>
                                <label htmlFor="card-number">Card Number</label>
                                <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456"/>
                                <label htmlFor="expiry-date">Expiry Date</label>
                                <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY"/>
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" placeholder="123"/>
                                <button className="button" type="submit" onClick={() => setPurchased(true)}>Submit</button>
                            </form>
                        </div>
                    )
                    : (
                        <div>
                            <h2>Thank you for your purchase!</h2>
                            <p>You will receive an email confirmation shortly.</p>
                            <button className="button" onClick={handleClose}>Close</button>
                        </div>
                    )
            }
        </div>
    );
};


export const About = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="about-container">
            {isOpen && <PaymentPopup handleClose={() => setIsOpen(false)}/>}
            <div className="pricing">
                <h2>Pricing</h2>
                <div className="pricing-items">
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
                            <button className="button" onClick={() => setIsOpen(true)}>Get Started</button>
                        </div>
                    </div>
                    <div className="pricing-card">
                        <span className="price">$49/mo</span>
                        <h3>Pro</h3>
                        <p>Ideal for teams and businesses.</p>
                        <ul>
                            <li>Unlimited image recognition</li>
                            <li>Advanced reporting and analytics</li>
                            <li>Priority email and phone support</li>
                        </ul>
                        <div className="button-wrapper">
                            <button className="button" onClick={() => setIsOpen(true)}>Get Started</button>
                        </div>
                    </div>
                    <div className="pricing-card">
                        <span className="price">Custom</span>
                        <h3>Enterprise</h3>
                        <p>Tailored for large organizations.</p>
                        <ul>
                            <li>Unlimited image recognition</li>
                            <li>Dedicated account manager</li>
                            <li>Custom integrations and API access</li>
                        </ul>
                        <div className="button-wrapper">
                            <button className="button">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="story">
                <h2>Our Story</h2>
                <p>
                    EthnoVisionAI was founded with the goal of revolutionizing the way people perceive and understand
                    diversity. Our team of experts developed a cutting-edge AI system that can accurately recognize the
                    ethnicity of individuals in images, helping to promote inclusivity and break down stereotypes.
                </p>
                <p>
                    We believe that by providing this technology, we can empower individuals and organizations to better
                    understand and celebrate the rich tapestry of human diversity. Join us on this journey as we work
                    towards a more inclusive and equitable future.
                </p>
            </div>
        </div>
    );
};
