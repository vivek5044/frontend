export async function fetchUsersByQuery(query: string) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/search?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}
