import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const fetchValues = useCallback(async foo => {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  }, []);

  const fetchIndexes = useCallback(async () => {
    const seenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(seenIndexes.data);
  }, []);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes]);

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', { index });

    setIndex('');
  };

  const renderSeenIndexes = () =>
    seenIndexes.map(({ number }) => number).join(', ');

  const renderValues = () =>
    Object.entries(values).map(([key, value]) => (
      <div key={key}>
        For index {key} I calculated {value}
      </div>
    ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={event => setIndex(event.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
