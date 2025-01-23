import React, { useState, useEffect } from 'react';
import { getData, getDoc } from './Api';
import './App.css';

function App() {
  const [pageno, setPageno] = useState(1);
  const [data, setData] = useState([]);
  const [doc, setDoc] = useState({});
  const [model, setModel] = useState(false);

  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const d = await getData(pageno); 
      setData(d);
    };
    fetchData();
  }, [pageno]);

  const startingIndex = (pageno - 1) * itemsPerPage;

  async function handleClick(id) {
    const doc = await getDoc(id);
    console.log(doc);
    setDoc(doc);
    setModel(true);
  }

  return (
    <>
      {/* Main Content */}
      <div className="datap" style={{ filter: model ? 'blur(4px)' : 'none' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Type</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr onClick={() => handleClick(item._id)} key={item._id}>
                <td>{startingIndex + index + 1}</td>
                <td>{item.type}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPageno(pageno - 1)} disabled={pageno === 1}>
          Previous
        </button>
        <span className="page-number">{pageno}</span>
        <button
          onClick={() => setPageno(pageno + 1)}
          disabled={data.length < itemsPerPage}
        >
          Next
        </button>
      </div>
      {model && (
          <div className="model">
            <div className="model-content">
              <span className="close" onClick={() => setModel(false)}>X</span>
              <h2>Document Details</h2>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <ul>
                  {Object.entries(doc).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default App;
