import React from 'react';
import { Departure } from '../types/bvg';
import './DeparturesList.css';

interface DeparturesListProps {
  departures: Departure[];
  isLoading: boolean;
  error: string | null;
  stopName?: string;
  hasFetched?: boolean;
}

export const DeparturesList: React.FC<DeparturesListProps> = ({
  departures,
  isLoading,
  error,
  stopName,
  hasFetched = false
}) => {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDelayText = (delay: number) => {
    if (delay === 0) return null;
    const minutes = Math.round(delay / 60);
    return minutes > 0 ? `+${minutes} min` : '';
  };

  const getTransportIcon = (mode: string) => {
    console.log('Transport mode:', mode); // Debug log to see what values we're getting
    
    switch (mode.toLowerCase()) {
      case 'bus': return '🚌';
      case 'tram': return '🚋';
      case 'subway': 
      case 'metro':
      case 'u-bahn': return '🚇';
      case 'suburban': 
      case 's-bahn': return '🚊';
      case 'regional': 
      case 'train': return '🚆';
      case 'ferry': return '⛴️';
      case 'express': return '🚄';
      default: 
        console.log('Unknown transport mode:', mode);
        return '🚌'; // Default to bus icon
    }
  };

  if (isLoading) {
    return (
      <div className="departures-container">
        <div className="loading">Loading departures...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="departures-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (departures.length === 0 && stopName && hasFetched) {
    return (
      <div className="departures-container">
        <h2 className="departures-title">
          Departures from {stopName}
        </h2>
        <div className="no-departures">
          <div className="no-departures-icon">🚫</div>
          <div className="no-departures-text">
            <h3>No departures available</h3>
            <p>There are currently no scheduled departures from this stop. This could mean:</p>
            <ul>
              <li>No services are running at this time</li>
              <li>The stop may not be in service</li>
              <li>Try checking again later</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (departures.length === 0) {
    return null;
  }

  return (
    <div className="departures-container">
      <h2 className="departures-title">
        Departures from {stopName || 'Selected Stop'}
      </h2>
      <div className="departures-list">
        {departures.map((departure, index) => (
          <div key={`${departure.tripId}-${index}`} className="departure-item">
            <div className="departure-line">
              <span className="transport-icon">
                {getTransportIcon(departure.line.mode)}
              </span>
              <span className="line-name">{departure.line.name}</span>
              <span className="line-product">{departure.line.productName}</span>
            </div>
            <div className="departure-info">
              <div className="departure-direction">
                → {departure.direction}
              </div>
              <div className="departure-time">
                <span className="planned-time">
                  {formatTime(departure.plannedWhen)}
                </span>
                {departure.delay > 0 && (
                  <span className="delay">
                    {getDelayText(departure.delay)}
                  </span>
                )}
              </div>
            </div>
            {departure.destination && (
              <div className="departure-destination">
                Final: {departure.destination.name}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="last-updated">
        Last updated: {new Date().toLocaleTimeString('de-DE')}
      </div>
    </div>
  );
};
