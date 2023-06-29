import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

describe('Header Component Tests', ()  => {
  test('render a header element as expected', () => {
   
    render(<Header />);
    let header = screen.getByTestId('header');
    let navbar = screen.getByTestId("navbar");

    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(navbar).toHaveTextContent('Home');
  });

  test('renders the footer with correct text', () => {
    render(<Footer />);
    
    const footerElement = screen.getByTestId('footer');
    
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent('©2023 Tricia Sawyer');
  });


});



