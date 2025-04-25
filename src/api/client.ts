import { Character, Episode, Filter, Location, Response } from '../types';

const API_URL = '/api';

export async function getCharacters(page = 1, filter: Filter = {}): Promise<Response<Character>> {
  const queryParams = new URLSearchParams({ page: page.toString() });
  
  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });
  
  const response = await fetch(`${API_URL}/character?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  
  return response.json();
}

export async function getCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_URL}/character/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch character with id ${id}`);
  }
  
  return response.json();
}

export async function getEpisodes(page = 1, filter: Filter = {}): Promise<Response<Episode>> {
  const queryParams = new URLSearchParams({ page: page.toString() });
  
  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });
  
  const response = await fetch(`${API_URL}/episode?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch episodes');
  }
  
  return response.json();
}

export async function getEpisode(id: number): Promise<Episode> {
  const response = await fetch(`${API_URL}/episode/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch episode with id ${id}`);
  }
  
  return response.json();
}

export async function getLocations(page = 1, filter: Filter = {}): Promise<Response<Location>> {
  const queryParams = new URLSearchParams({ page: page.toString() });
  
  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });
  
  const response = await fetch(`${API_URL}/location?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  
  return response.json();
}

export async function getLocation(id: number): Promise<Location> {
  const response = await fetch(`${API_URL}/location/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch location with id ${id}`);
  }
  
  return response.json();
}

export async function getMultipleCharacters(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  
  const response = await fetch(`${API_URL}/character/${ids.join(',')}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch multiple characters');
  }
  
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export async function getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  
  const response = await fetch(`${API_URL}/episode/${ids.join(',')}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch multiple episodes');
  }
  
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}