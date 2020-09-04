
import React from 'react';

import LoaderContainer from "./components/Loader/LoaderContainer"
import { render, prettyDOM, screen, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
//simple test example, check ContentContainer.test to see a more fleshed out example with data fetching/mocking
it("Tests App Snapshot", async () => {
  await act(async ()=> {
    render(<LoaderContainer/>);
  });
  //allows for loading state to end before checking snapshot
  await wait(()=>{}, {timeout:1500});
  expect(
    prettyDOM()
  ).toMatchSnapshot()
});

it("Checks if Logo was rendered", async () => {
  await act(async ()=> {
    render(<LoaderContainer/>);
  });

  expect(
    await screen.findByText(/MySocial/i)
  ).toBeDefined()
});