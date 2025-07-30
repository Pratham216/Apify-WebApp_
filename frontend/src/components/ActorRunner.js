import React, { useState, useEffect } from 'react';
import './ActorRunner.css';

const ActorRunner = ({ actor, apiKey, onBack, apiBaseUrl }) => {
  const [schema, setSchema] = useState(null);
  const [actorInfo, setActorInfo] = useState(null);
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [runLoading, setRunLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchema = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/actors/${actor.id}/schema`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ apiKey }),
        });

        const data = await response.json();

        if (response.ok) {
          setSchema(data.schema || {});
          setActorInfo(data.actorInfo);
          setFormData(data.schema || {});  // Initialize formData with schema structure
        } else {
          setError(data.error || 'Failed to fetch schema');
        }
      } catch (err) {
        setError('Failed to fetch schema');
      } finally {
        setLoading(false);
      }
    };

    fetchSchema();
  }, [actor.id, apiKey, apiBaseUrl]);

  const handleChange = (key, value) => {
    try {
      // Try to parse as JSON if it looks like JSON
      if (value && (value.startsWith('{') || value.startsWith('[') || value === 'true' || value === 'false' || !isNaN(value))) {
        const parsedValue = JSON.parse(value);
        setFormData({ ...formData, [key]: parsedValue });
      } else {
        setFormData({ ...formData, [key]: value });
      }
    } catch {
      // If JSON parsing fails, treat as string
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleRun = async () => {
    setRunLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('Starting actor run with input:', formData);
      
      const response = await fetch(`${apiBaseUrl}/actors/${actor.id}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, input: formData }),
      });

      const data = await response.json();
      console.log('Actor run response:', data);

      if (response.ok) {
        setResult(data);
        setError(''); // Clear any previous errors
      } else {
        // Handle different types of errors more gracefully
        if (data.statusMessage) {
          setError(`Actor execution failed: ${data.statusMessage}`);
        } else if (data.error) {
          setError(data.error);
        } else {
          setError('Failed to run actor');
        }
        
        // If we have run details even for failed runs, show them
        if (data.runId) {
          setResult({
            ...data,
            success: false,
            error: true
          });
        }
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error: Failed to connect to server. Please check if the backend is running.');
    } finally {
      setRunLoading(false);
    }
  };

  const renderInputField = (key, value) => {
    const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value || '');
    
    // URL suggestions for common testing endpoints
    const urlSuggestions = [
      'https://httpbin.org/json',
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://api.github.com/users/octocat',
      'https://httpbin.org/html',
      'https://reqres.in/api/users/1'
    ];
    
    return (
      <div className="input-group" key={key}>
        <label htmlFor={key}>
          {key}
          <span className="field-type">{typeof value}</span>
        </label>
        {typeof value === 'object' || displayValue.length > 50 ? (
          <textarea
            id={key}
            value={displayValue}
            onChange={(e) => handleChange(key, e.target.value)}
            className="input-field textarea-field"
            rows={Math.max(3, displayValue.split('\n').length)}
            placeholder={`Enter ${key}...`}
            disabled={runLoading}
          />
        ) : (
          <>
            <input
              id={key}
              type="text"
              value={displayValue}
              onChange={(e) => handleChange(key, e.target.value)}
              className="input-field"
              placeholder={`Enter ${key}...`}
              disabled={runLoading}
            />
            {key.toLowerCase().includes('url') && (
              <div className="url-suggestions">
                <small>Try these URLs:</small>
                <div className="suggestion-buttons">
                  {urlSuggestions.map(url => (
                    <button 
                      key={url} 
                      type="button"
                      className="suggestion-btn"
                      onClick={() => handleChange(key, url)}
                      disabled={runLoading}
                    >
                      {url.split('/')[2]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="actor-runner-container">
        <div className="actor-runner-card">
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading actor schema...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="actor-runner-container">
      <div className="actor-runner-card">
        <div className="card-header">
          <h2>⚙️ {actorInfo?.title || actor.title || actor.name}</h2>
          {actorInfo?.description && (
            <p className="actor-description">{actorInfo.description}</p>
          )}
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="input-form">
          <h3>📝 Configuration</h3>
          
          {schema && Object.keys(schema).length > 0 ? (
            <div className="form-fields">
              {Object.entries(schema).map(([key, value]) => renderInputField(key, value))}
            </div>
          ) : (
            <div className="no-schema-message">
              <p>No input schema available. You can run this actor with default settings.</p>
            </div>
          )}

          <div className="action-buttons">
            <button 
              onClick={handleRun} 
              disabled={runLoading}
              className="run-button"
            >
              {runLoading ? (
                <>
                  <span className="spinner"></span>
                  Running Actor...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Run Actor
                </>
              )}
            </button>
            
            <button 
              onClick={onBack} 
              className="back-button"
              disabled={runLoading}
            >
              ⬅ Back to Actors
            </button>
          </div>
        </div>

        {result && (
          <div className="result-section">
            <h3>✅ Execution Result</h3>
            <div className="result-summary">
              <div className="result-stat">
                <span className="stat-label">Status:</span>
                <span className={`stat-value status-${result.status?.toLowerCase()}`}>
                  {result.status}
                </span>
              </div>
              {result.stats && (
                <div className="result-stat">
                  <span className="stat-label">Runtime:</span>
                  <span className="stat-value">{result.stats.runTimeSecs}s</span>
                </div>
              )}
            </div>
            
            <div className="result-display">
              <h4>Data Output:</h4>
              <pre className="result-json">
                {JSON.stringify(result.results || result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorRunner;

