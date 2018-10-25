import React from 'react';
import renderer from 'react-test-renderer';
import mocks from 'react-native-jest-mocks';

mocks.initAll();

import App from '../app/App';

describe('App', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });
});
