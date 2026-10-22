import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ConnectionTest() {
  // Create state to hold the backend data and any potential connection errors
  const [backendData, setBackendData] = useState('Connecting to backend...');
  const [error, setError] = useState('');

  // useEffect runs automatically when the webpage loads in the browser
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/test-connection')
      .then((response) => {
        // Save the JSON "message" string from Spring Boot into our state
        setBackendData(response.data.message);
      })
      .catch((err) => {
        console.error('Connection failed:', err);
        setError('Could not connect to Spring Boot.');
      });
  }, []); // The empty array ensures this runs exactly once on load

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Full-Stack Integration Test</h1>

      <div
        style={{
          border: '2px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: error ? '#fff0f0' : '#f0fff4',
        }}>
        <h3>Backend Status:</h3>
        {error ? (
          <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
        ) : (
          <p style={{ color: 'green', fontWeight: 'bold', fontSize: '18px' }}>
            {backendData}
          </p>
        )}
      </div>
    </div>
  );
}
