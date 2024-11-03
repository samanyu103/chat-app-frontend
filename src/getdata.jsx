// GetData.jsx
import { useState, useEffect } from 'react';
// import './getdata.css'; 

function GetData() {
  const [store, setStore] = useState([]);

  const getdata = async () => {

    const response = await fetch("http://127.0.0.1:8000/user/getdata", {
      method: 'GET',
    });
    const data = await response.json();
    setStore(data);
    console.log(data);
  };

  useEffect(() => {
    // Fetch the data when this component is rendered
    getdata();
  }, []);

  return (
    <div className="GetData">
      <ul>
        {store.map((item, index) => (
          <li key={index}>{item.email}</li>

        ))}
      </ul>
    </div>
  );
}

export default GetData;
