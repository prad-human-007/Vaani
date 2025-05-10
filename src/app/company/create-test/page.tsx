'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const CreateTaskGroupForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(35);
  const [sector, setSector] = useState('');
  const [language, setLanguage] = useState('');
  const [comment, setComment] = useState('');
  const [poolSize, setPoolSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      // Use getUser() instead of user()
      // const { data: user } = await supabase.auth.getUser();
      
const companyId = uuidv4();

      if (!companyId) {
        setError('You must be logged in to create a task group.');
        return;
      }

      const response = await fetch('/api/task-group/create', {
        method: 'POST',
        body: JSON.stringify({
          company_id: companyId,
          name,
          description,
          min_age: minAge,
          max_age: maxAge,
          sector,
          language,
          comment,
          pool_size: poolSize,
        }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error.message);
        return;
      }

      alert('Task group created successfully!');
      setFormVisible(false); // Close form after successful submission
    } catch (error) {
      setError('An error occurred while creating the task group.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={() => setFormVisible(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Add Task Group
      </button>

      {formVisible && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f4f4f9',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto',
          }}
        >
          <h2 style={{ color: '#333', textAlign: 'center' }}>Create Task Group</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  minHeight: '100px',
                }}
              />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '48%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Minimum Age</label>
                <input
                  type="number"
                  value={minAge}
                  onChange={e => setMinAge(Number(e.target.value))}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>

              <div style={{ width: '48%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Maximum Age</label>
                <input
                  type="number"
                  value={maxAge}
                  onChange={e => setMaxAge(Number(e.target.value))}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Sector</label>
              <input
                type="text"
                value={sector}
                onChange={e => setSector(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Language</label>
              <input
                type="text"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Comment</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  minHeight: '100px',
                }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Pool Size</label>
              <input
                type="number"
                value={poolSize}
                onChange={e => setPoolSize(Number(e.target.value))}
                min="1"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                fontSize: '16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {loading ? 'Creating...' : 'Create Task Group'}
            </button>
          </form>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateTaskGroupForm;
