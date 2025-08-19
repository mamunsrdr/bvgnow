import axios from 'axios';
import { LocationsResponse, DeparturesResponse } from '../types/bvg';

const BVG_API_BASE = 'https://v6.bvg.transport.rest';

export const bvgService = {
  /**
   * Search for locations based on query
   */
  async searchLocations(query: string): Promise<LocationsResponse> {
    try {
      const response = await axios.get(`${BVG_API_BASE}/locations`, {
        params: {
          poi: false,
          addresses: false,
          query: query
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw new Error('Failed to fetch locations');
    }
  },

  /**
   * Get departures for a specific stop
   */
  async getDepartures(stopId: string, results: number = 5): Promise<DeparturesResponse> {
    try {
      const response = await axios.get(`${BVG_API_BASE}/stops/${stopId}/departures`, {
        params: {
          results: results
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching departures:', error);
      throw new Error('Failed to fetch departures');
    }
  }
};
