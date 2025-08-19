import React, { useState } from 'react';
import { LocationAutocomplete } from './components/LocationAutocomplete';
import { DeparturesList } from './components/DeparturesList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { bvgService } from './services/bvgService';
import { Stop, Departure } from './types/bvg';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useLocalStorage('bvg-last-location', '');
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const handleLocationSelect = (stop: Stop) => {
    setSelectedStop(stop);
    setError(null);
    setHasFetched(false); // Reset fetch status when selecting a new stop
  };

  const handleFetchDepartures = async () => {
    if (!selectedStop) {
      setError('Please select a location first');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await bvgService.getDepartures(selectedStop.id, 5);
      setDepartures(response.departures);
      setHasFetched(true);
    } catch (err) {
      setError('Failed to fetch departure information. Please try again.');
      setDepartures([]);
      setHasFetched(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BVG Now</h1>
        <p>Real-time BVG departure information</p>
      </header>
      
      <main className="App-main">
        <div className="search-section">
          <LocationAutocomplete
            value={searchQuery}
            onChange={setSearchQuery}
            onSelect={handleLocationSelect}
            placeholder="Search for a BVG stop..."
          />
          
          {selectedStop && (
            <div className="selected-stop">
              <p>Selected: <strong>{selectedStop.name}</strong></p>
              <button 
                className="fetch-button"
                onClick={handleFetchDepartures}
                disabled={isLoading}
              >
                {isLoading ? 'Fetching...' : 'Get Departures'}
              </button>
            </div>
          )}
        </div>

        <DeparturesList
          departures={departures}
          isLoading={isLoading}
          error={error}
          stopName={selectedStop?.name}
          hasFetched={hasFetched}
        />
      </main>
    </div>
  );
}

export default App;
