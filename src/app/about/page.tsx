import React from 'react';

const AboutPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                backgroundColor: '#000', // Black background
                color: '#fff', // White text
            }}
        >
            <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>About Us</h1>
            <p style={{ marginBottom: '15px', fontSize: '1.2rem', maxWidth: '600px' }}>
                Welcome to our company! Our core mission is to innovate and deliver exceptional solutions that empower individuals and businesses to achieve their goals.
            </p>
            <p style={{ marginBottom: '15px', fontSize: '1.2rem', maxWidth: '600px' }}>
                Our vision is to create a world where technology bridges gaps, fosters connections, and drives progress for everyone.
            </p>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
                Thank you for being a part of our journey. Together, we can make a difference.
            </p>
        </div>
    );
};

export default AboutPage;