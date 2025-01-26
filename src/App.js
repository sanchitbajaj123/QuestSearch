import React, { useState, useEffect } from 'react';
import { getData, getDoc } from './Api';
import './App.css';
import Searchinp from './Search';
function App() {
  const [pageno, setPageno] = useState(1);
  const [data, setData] = useState([]);
  const [doc, setDoc] = useState({});
  const [model, setModel] = useState(false);
  const[query,setQuery]=useState("");
  const[totalPages,setTotalPages]=useState(0);

  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      const d = await getData(query,pageno); 
            setData(d.data);
            setTotalPages(d.totalPages);
          };
    fetchData();
  }, [pageno,query]);

  const startingIndex = (pageno - 1) * itemsPerPage;

  async function handleClick(id) {
    const doc = await getDoc(id);
        setDoc(doc);
    setModel(true);
  }

  return (
    <>
      <div className='header' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{
        fontFamily: "'Roboto', Arial, sans-serif",
        textAlign: "center",
        color: "#ffffff",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        background: "linear-gradient(135deg, #4a90e2, #357ab8)",
        borderRadius: "8px",
        height: "fit-content",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}>
  QUEST SEARCH
</h1>

      <center>
      <Searchinp query={query} setQuery={setQuery}/>
      </center>
      </div>
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

      <div className="pagination">
        <button onClick={() => setPageno(pageno - 1)} disabled={pageno === 1}>
          Previous
        </button>
        <span className="page-number">{pageno}/{totalPages}</span>
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
