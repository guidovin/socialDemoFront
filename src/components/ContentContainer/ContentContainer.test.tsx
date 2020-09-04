
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { FIND_QUERY } from "../../queries/Users/userQueries"
import ContentContainer from "./ContentContainer"
import { render, waitForElement, fireEvent, screen, prettyDOM } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// The component AND the query need to be exported
//This is a low coverage test only to ilustrate testing and mocking with the apollo client/provider
const mocks = [
  {
    request: {
      query: FIND_QUERY,

    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
          id: "123",
          index: "0",
          picture: "testStr",
          eyeColor: "testStr",
          company: "testStr",
          phone: "testStr",
          friends: [],
          greeting: "testStr",
        },{ 
          name: "CeasdPhillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
          id: "123sdgsd",
          index: "0",
          picture: "testStr",
          eyeColor: "testStr",
          company: "testStr",
          phone: "testStr",
          friends: [],
          greeting: "testStr",
        },{ 
          name: "Cec ps",
          age: "30",
          email: "ceciliaphillips@daido.com",
          id: "124123",
          index: "0",
          picture: "testStr",
          eyeColor: "testStr",
          company: "testStr",
          phone: "testStr",
          friends: [],
          greeting: "testStr",
        }],
      },
    },
  },
  {
    request: {
      query: FIND_QUERY,
      variables: {
        name: "Cecilia Phillips"
      }
    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
          id: "123",
          index: "0",
          picture: "testStr",
          eyeColor: "testStr",
          company: "testStr",
          phone: "testStr",
          friends: [],
          greeting: "testStr",
        }],
      },
    },
  },
]; 
 
it('Tests rendering with initial data and search query', async () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ContentContainer/>
    </MockedProvider>
  );
  //checks if container (that doesnt depend on the query answer) is rendered
  const getContainer = await waitForElement(() => getByTestId("userContainer"))
  expect(getContainer).toBeDefined();
  
  //checks if userCard (that depends on the query answer, so its proof of the query return) is rendered
  const getUserCard = await waitForElement(() => screen.findAllByTestId("userCard"))//example using screen object
  expect(getUserCard).toBeDefined();

  //simulates search input and checks if executed
  const searchBar = await waitForElement(() => getByTestId("searchBar"))//example using callback from render destructuring
  expect(searchBar).toBeDefined();
  //awaits for event execution and wraps act() around event call to signify a side-effect producing execution
  act(()=> { fireEvent.input(searchBar, { target: { value: "Cecilia Phillips" } }) });


  //gets element with data-testid equal to the search value inputed. proving that the query was executed and related data rendered
  const getUserTestId = await waitForElement(() => screen.findByTestId("Cecilia Phillips"))
  expect(getUserTestId).toBeDefined();
  //gets element that contains the text from the result of the search value inputed. 
  //confirming that the query was executed and related data rendered. Example of /i notation.
  const getUserName = await waitForElement(() => screen.findByText(/Cecilia Phillips/i))
  expect(getUserName).toBeDefined();
});



const snapshotMocks = [
  {
    request: {
      query: FIND_QUERY,

    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
          id: "123",
          index: "0",
          picture: "testStr",
          eyeColor: "testStr",
          company: "testStr",
          phone: "testStr",
          friends: [],
          greeting: "testStr",
        },{ 
          name: "CeasdPhillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
          id: "123sdgsd",
          index: "0",
          picture: "testStr",
          eyeColor: "testStr",
          company: "testStr",
          phone: "testStr",
          friends: [],
          greeting: "testStr",
        },{ 
          name: "Cec ps",
          age: "30",
          email: "ceciliaphillips@daido.com",
          id: "124123",
          index: "0",
          picture: "testStr",
          eyeColor: "testStr",
          company: "testStr",
          phone: "testStr",
          friends: [],
          greeting: "testStr",
        }],
      },
    },
  },
  {
    request: {
      query: FIND_QUERY,
      variables: {
        name: "Cecilia Phillips"
      }
    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
          id: "123",
          index: "0",
          picture: "testStr",
          eyeColor: "testStr",
          company: "testStr",
          phone: "testStr",
          friends: [],
          greeting: "testStr",
        }],
      },
    },
  },
]; 
it("Tests Snapshot", async () => {
  await act(async ()=> {
    render(
      <MockedProvider mocks={snapshotMocks} addTypename={false}>
        <ContentContainer/>
      </MockedProvider>)
    }
  );

  expect(
    prettyDOM()
  ).toMatchSnapshot()
});