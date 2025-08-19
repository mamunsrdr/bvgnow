import React, { useState, useEffect, useRef } from 'react';
import { Stop } from '../types/bvg';
import { bvgService } from '../services/bvgService';
import './LocationAutocomplete.css';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (stop: Stop) => void;
  placeholder?: string;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = "Enter location name..."
}) => {
  const [suggestions, setSuggestions] = useState<Stop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [justSelected, setJustSelected] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Debounce API calls
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const locations = await bvgService.searchLocations(value);
        setSuggestions(locations);
        setShowSuggestions(true);
        setActiveSuggestion(-1);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJustSelected(false);
    onChange(e.target.value);
  };

  const handleSuggestionClick = (stop: Stop) => {
    onChange(stop.name);
    onSelect(stop);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    setJustSelected(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        setJustSelected(false);
        break;
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
      setJustSelected(false);
    }, 150);
  };

  const handleFocus = () => {
    // Don't show suggestions if we just selected an item
    if (!justSelected && value.length >= 2 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="autocomplete-input"
      />
      {isLoading && <div className="loading-indicator">Searching...</div>}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((stop, index) => (
            <li
              key={stop.id}
              className={`suggestion-item ${index === activeSuggestion ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(stop)}
            >
              <div className="suggestion-name">{stop.name}</div>
              <div className="suggestion-products">
                {Object.entries(stop.products)
                  .filter(([_, available]) => available)
                  .map(([product]) => product)
                  .join(', ')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
