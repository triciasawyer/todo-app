import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthProvider, { AuthContext } from '../Context/Auth';
import Login from '../Components/Login';
import Auth from '../Components/Auth';
import { server } from '../Mocks/server'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())


test('Should contain user and isloggedIn initial values', async() => {

  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {auth => (
          <>
            <p data-testid="isLoggedIn">{auth.isLoggedIn.toString()}</p>
            <p data-testid="user">{typeof auth.user}</p>
          </>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  )

  expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
  expect(screen.getByTestId('user')).toHaveTextContent('object');
});


test('Should be able to login and logout', async () => {

  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {auth =>
          <>
            <Login />
            <p data-testid="isLoggedIn">{auth.isLoggedIn.toString()}</p>
            <p data-testid="capabilities">{`${auth.user.capabilities}`}</p>
          </>
        }
      </AuthContext.Consumer>
    </AuthProvider>
  )

  let usernameInput = screen.getByTestId('username');
  let passwordInput = screen.getByTestId('password');
  const loginButton = screen.getByText('Log In');

  // mocking an event:  change of input
  fireEvent.change(usernameInput, { target: { value: 'admin' } });
  fireEvent.change(passwordInput, { target: { value: 'ADMIN' } });
  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
  });
  await waitFor(() => {
    expect(screen.getByTestId('capabilities')).toHaveTextContent('create,update,read,delete');
  })

  //perhaps logging out makes sense, let's stay logged in for next test
  const logoutButton = screen.getByText('Log Out');
  fireEvent.click(logoutButton);

  await waitFor(() => {
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent(false)
  });
});


test('Auth component should be able to render when logged in', async () => {
  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {auth => (
          <>
            <Login />
            <Auth capability="read">
              <p data-testid="test-read">I am Authorized!!</p>
            </Auth>
            <Auth capability="delete">
              <p data-testid="test-delete">I am Authorized!!</p>
            </Auth>
          </>
        )}
      </AuthContext.Consumer>

    </AuthProvider>
  );


  let userInput = screen.getByTestId('username');
  let passInput = screen.getByTestId('password');

  fireEvent.change(userInput, { target: { value: 'admin' } });
  fireEvent.change(passInput, { target: { value: 'ADMIN' } });
  fireEvent.click(screen.getByText('Log In'));

  let authorized;
  await waitFor(() => {
    authorized =  screen.getByTestId('test-read');
  });

  // notice if not expected to exist we use different method.  aka there is nothing to "get".  showing for demo..  in this case we have delete capability and this exists
  let alsoAuthorized =  screen.queryByTestId('test-delete');

  await waitFor(() => {
    expect(authorized).toHaveTextContent('I am Authorized!!');
  });
  await waitFor(() => {
    expect(alsoAuthorized).toBeInTheDocument();
  });


});