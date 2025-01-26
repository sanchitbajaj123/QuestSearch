import React, { useState, useEffect } from 'react';
import { getData, getDoc } from './Api';
import './App.css';
import Searchinp from './Search';

function App() {
  const [pageno, setPageno] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [doc, setDoc] = useState({});
  const [model, setModel] = useState(false);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('');

  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const d = await getData(query, pageno);
      setData(d.data);
      setTotalPages(d.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [pageno, query]);

  useEffect(() => {
    if (searchType === 'ALL' || !searchType) {
      setFilteredData(data);  // Show all data when 'ALL' or empty is selected
    } else {
      setFilteredData(data.filter((item) => item.type === searchType));
    }
  }, [data, searchType]);

  const startingIndex = (pageno - 1) * itemsPerPage;

  async function handleClick(id) {
    const doc = await getDoc(id);
    setDoc(doc);
    setModel(true);
  }

  return (
    <>
      <div className="header">
        <h1
          style={{
            fontFamily: "'Roboto', Arial, sans-serif",
            textAlign: 'center',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            background: 'linear-gradient(135deg, #4a90e2, #357ab8)',
            borderRadius: '8px',
            padding: '10px 20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          QUEST SEARCH
        </h1>

        <center>
          <Searchinp query={query} setQuery={setQuery} />

          <select
            id="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{
              marginLeft: '80px',
              padding: '10px 15px',
              borderRadius: '50px', // Make the select box round
              border: '1px solid white',
              outline: 'none',
              background: 'linear-gradient(135deg, #ffffff, #e6f0ff)',
              fontFamily: "'Roboto', Arial, sans-serif",
              fontSize: '18px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              appearance: 'none', // Remove default arrow
              textAlign: 'center',
              cursor: 'pointer',
              backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/42/Arrow_down.svg')", // Add custom arrow icon
              backgroundPosition: 'right 10px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '12px',
            }}
          >
            <option value="" disabled>
              Choose to filter ▼
            </option>
            <option value="ALL">All</option>
            <option value="READ_ALONG">Read Along</option>
            <option value="MCQ">MCQ</option>
            <option value="ANAGRAM">Anagram</option>
          </select>
        </center>
      </div>

      <div className="datap" style={{ filter: model ? 'blur(4px)' : 'none' }}>
        {loading ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Type</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr onClick={() => handleClick(item._id)} key={item._id}>
                  <td>{startingIndex + index + 1}</td>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => setPageno(pageno - 1)} disabled={pageno === 1}>
          Previous
        </button>
        <span className="page-number">
          {pageno}/{totalPages}
        </span>
        <button onClick={() => setPageno(pageno + 1)}>Next</button>
      </div>

      {model && (
        <div className="model">
          <div className="model-content">
            <span className="close" onClick={() => setModel(false)}>
              X
            </span>
            <h2>Document Details</h2>
            <div
              style={{
                maxHeight: '400px',
                overflowY: 'auto',
                display: 'grid',
                gap: '15px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              }}
            >
              {Object.entries(doc).map(([key, value]) => (
                <div className="data-card" key={key}>
                  <div className="data-key">{key}</div>
                  <div className="data-value">
                    {typeof value === 'object'
                      ? JSON.stringify(value, null, 2)
                      : value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
