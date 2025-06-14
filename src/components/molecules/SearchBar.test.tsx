// import { render, screen, fireEvent } from '@testing-library/react';
// import { SearchBar } from './SearchBar';

// test('calls onSearch with input when Enter is pressed', () => {
//   const mockSearch = jest.fn();
//   render(<SearchBar onSearch={mockSearch} />);
//   const input = screen.getByPlaceholderText(/search/i);
//   fireEvent.change(input, { target: { value: 'Joh' } });
//   fireEvent.keyDown(input, { key: 'Enter' });
//   expect(mockSearch).toHaveBeenCalledWith('Joh');
// });
