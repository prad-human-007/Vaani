'use client'

import React, { useState } from 'react';

const DemoPage = () => {
    const [email, setEmail] = useState('');
    const [savedEmail, setSavedEmail] = useState('');

    const handleSaveEmail = () => {
        setSavedEmail(email);
        setEmail('');
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: 'black',
                color: 'white',
            }}
        >
            <div
                style={{
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#3f3f46', // Tailwind's bg-zinc-600 equivalent
                    textAlign: 'center',
                    width: '400px',
                }}
            >
                <h1
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                    }}
                >
                    Contact Us for a Demo
                </h1>
                <p
                    style={{
                        fontSize: '18px',
                        marginBottom: '20px',
                        lineHeight: '1.5',
                    }}
                >
                    Please enter your email so we can contact you for a demo:
                </p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '100%',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                    }}
                />
                <button
                    onClick={handleSaveEmail}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        width: '100%',
                    }}
                >
                    Save Email
                </button>
                {savedEmail && (
                    <p style={{ marginTop: '20px', color: 'green' }}>
                        Thank you! We have saved your email: <strong>{savedEmail}</strong>
                    </p>
                )}
            </div>
        </div>
    );
};

export default DemoPage;