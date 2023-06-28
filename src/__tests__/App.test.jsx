import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import Todo from '../Components/Todo';

describe('Header Component Tests', ()  => {
  test('render a header element as expected', () => {
   
    render(<Header />);
    let header = screen.getByTestId('header');
    let navbar = screen.getByTestId("navbar");

    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(navbar).toHaveTextContent('Home');
  });

  
});
