import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsProvider, { SettingsContext } from '.';


describe('SettingsProvider', () => {
  it('renders the children and provides settings values', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {(settings) => (
            <div>
              <span data-testid="display-count">{settings.displayCount}</span>
              <span data-testid="show-complete">{settings.showComplete.toString()}</span>
              <span data-testid="sort">{settings.sort}</span>
            </div>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    expect(screen.getByTestId('display-count')).toHaveTextContent('3');
    expect(screen.getByTestId('show-complete')).toHaveTextContent('false');
    expect(screen.getByTestId('sort')).toHaveTextContent('difficulty');
  });
});
