// import { useState, useEffect } from 'react';
// import axios from 'axios';
// interface BackendItem {
//   id: number; // or string, depending on your Spring Boot entity
//   name: string;
//   description: string;
// }
// export default function ConnectionTest() {
//   // Create state to hold the backend data and any potential connection errors
//   const [backendData, setBackendData] = useState<BackendItem[]>([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/departments')
//       .then((response) => {
//         setBackendData(response.data);
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Backend Data:</h1>
//       <ul>
//         {backendData.map((item) => (
//           // Use a unique property like item.id for the key
//           <li key={item.id}>
//             {/* Target the specific text properties of your object */}
//             <strong>{item.name}</strong>: {item.description}
//             <h1>{item.id}</h1>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
