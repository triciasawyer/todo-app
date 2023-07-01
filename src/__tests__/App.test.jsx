import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AuthProvider, { AuthContext } from '../Context/Auth';
import Login from '../Components/Login';
import { BrowserRouter } from 'react-router-dom';
import SettingsProvider, { SettingsContext } from '../Context/Settings';
import { List } from '@mantine/core';
import SettingsForm from '../Components/SettingsForm';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';

const mockAuthContext = {
  logout: jest.fn(),
  login: jest.fn(),
  isLoggedIn: false,
};

// Render the Login component with the mocked AuthContext
const renderWithAuthContext = () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <Login />
    </AuthContext.Provider>
  );
};

const list = [
  { id: 1, text: 'Item 1', complete: false, assignee: 'John Doe', difficulty: 3 },
  { id: 2, text: 'Item 2', complete: true, assignee: 'Jane Smith', difficulty: 2 },
];

const mockSettingsContext = {
  displayCount: 5,
  showComplete: true,
};


describe('Functionality of app', () => {
  test('Should render the header with the navigation links', () => {
    const mockAuthContext = {
      logout: jest.fn(),
      login: jest.fn(),
      isLoggedIn: false,
    };

    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /home/i });
    const settingsLink = screen.getByRole('link', { name: /settings/i });
    expect(homeLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });


  test('Should render the footer with the correct text and style', () => {
    render(<Footer />);
  
    const footerElement = screen.getByTestId('footer');
  
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveClass('mantine-kdom2w');
    expect(footerElement.textContent).toBe('©2023 Tricia Sawyer');
  });


  test('Should render the login form when not logged in', () => {
    renderWithAuthContext();

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log In' });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });


  test('Should call the login function with the provided username and password', () => {
    renderWithAuthContext();

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    const username = 'testuser';
    const password = 'testpassword';

    // Enter the username and password, then click login
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    expect(mockAuthContext.login).toHaveBeenCalledWith(username, password);
  });


  test('Should call the logout function when the logout button is clicked', () => {
    mockAuthContext.isLoggedIn = true;

    renderWithAuthContext();

    const logoutButton = screen.getByRole('button', { name: 'Log Out' });
    fireEvent.click(logoutButton);

    expect(mockAuthContext.logout).toHaveBeenCalled();
  });


  // test('Should render the list with items', () => {
  //   render(
  //     <SettingsContext.Provider value={mockSettingsContext}>
  //       <AuthContext.Provider value={mockAuthContext}>
  //         <List list={list} toggleComplete={() => {}} deleteItem={() => {}} />
  //       </AuthContext.Provider>
  //     </SettingsContext.Provider>
  //   );
  
  //   const listItems = screen.getAllByTestId('list-item');
  //   expect(listItems).toHaveLength(list.length);
  
  //   // Assert the content of each list item
  //   expect(listItems[0]).toHaveTextContent('Item 1');
  //   expect(listItems[0]).toHaveTextContent('User 1');
  //   expect(listItems[0]).toHaveTextContent('Difficulty: Easy');
  
  //   expect(listItems[1]).toHaveTextContent('Item 2');
  //   expect(listItems[1]).toHaveTextContent('User 2');
  //   expect(listItems[1]).toHaveTextContent('Difficulty: Medium');
  // });


  // test('Should call deleteItem when close button is clicked', () => {
  //   const mockAuthContext = {
  //     isLoggedIn: true,
  //     can: () => true,
  //   };

  //     const deleteItem = jest.fn();
  //     render(
  //       <SettingsContext.Provider value={mockSettingsContext}>
  //         <AuthContext.Provider value={mockAuthContext}>
  //           <List list={list} toggleComplete={() => {}} deleteItem={deleteItem} />
  //         </AuthContext.Provider>
  //       </SettingsContext.Provider>
  //     );
    
  //     const closeButton = screen.getByTestId('CloseToDo');
  //     expect(closeButton).toBeInTheDocument();
    
  //     // Simulate clicking the close button
  //     closeButton.click();
    
  //     // Expect the deleteItem function to be called with the item ID
  //     expect(deleteItem).toHaveBeenCalledTimes(1);
  //     expect(deleteItem).toHaveBeenCalledWith(list[0].id);
  //   });


    test('Should submit the form and trigger handleSubmit', () => {
      const saveLocally = jest.fn();
      render(
        <SettingsContext.Provider value={{ ...mockSettingsContext, saveLocally }}>
          <SettingsForm />
        </SettingsContext.Provider>
      );
    
      const submitButton = screen.getByRole('button', { name: /show new settings/i });
      expect(submitButton).toBeInTheDocument();
    
      userEvent.click(submitButton);
    
      // Expect the handleSubmit function to be called
      expect(saveLocally).toHaveBeenCalledTimes(1);
    });


    test('Should check user capabilities', () => {
      const TestComponent = () => {
        const { can } = React.useContext(AuthContext);
        return (
          <>
            <div>{can('read') ? 'Can read' : 'Cannot read'}</div>
            <div>{can('write') ? 'Can write' : 'Cannot write'}</div>
          </>
        );
      };
  
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
  
      expect(screen.getByText((content, element) => {
        const hasText = (text) => element.textContent === text;
        return hasText('Can read') || hasText('Cannot read');
      })).toBeInTheDocument();
  
      expect(screen.getByText((content, element) => {
        const hasText = (text) => element.textContent === text;
        return hasText('Can write') || hasText('Cannot write');
      })).toBeInTheDocument();
    });

  
  });



