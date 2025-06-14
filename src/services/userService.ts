
export const fetchUsersByQuery = async (query: string): Promise<any[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}?query=${query}`);
  const data = await response.json();

  return Array.isArray(data) ? data : [data]; // Ensure it returns an array
};