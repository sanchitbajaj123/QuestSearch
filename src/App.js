import React, { useState, useEffect } from 'react';
import { getData } from './Api';
import './App.css';

function App() {
  const [pageno, setPageno] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const d = await getData(pageno);
      setData(d);
    };
    fetchData();
  }, [pageno]);

  return (
    <>
      <div className="datap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.type}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => setPageno(pageno - 1)} disabled={pageno === 1}>
          Previous
        </button>
        <span className='page-number'>{pageno}</span>
        <button onClick={() => setPageno(pageno + 1)}>Next</button>
      </div>
    </>
  );
}

export default App;
