// DiseaseDetails.jsx
import React, { useEffect, useState } from 'react';

const DiseaseDetails = () => {
  const [diseaseDetails, setDiseaseDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiseaseDetails = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/disease_details'); // Change to your FastAPI URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDiseaseDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDiseaseDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Disease Details</h1>
      <ul>
        {diseaseDetails.map((disease) => (
          <li key={disease.id}>
            <h2>{disease.name}</h2>
            <p>{disease.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiseaseDetails;
