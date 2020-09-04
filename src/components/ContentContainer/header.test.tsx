
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { FIND_QUERY } from "../../queries/Users/userQueries"
import ContentContainer from "./ContentContainer"
import { render, waitForElement, screen } from '@testing-library/react';
// The component AND the query need to be exported

const mocks = [
  {
    request: {
      query: FIND_QUERY,
      variables: {
        name: "",
      },
    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
        }],
      },
    },
  },
  {
    request: {
      query: FIND_QUERY,
      variables: {
        name: "ce",
      },
    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
        }],
      },
    },
  },
  {
    request: {
      query: FIND_QUERY,
      variables: {
        name: "ce",
      },
    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
        }],
      },
    },
  },
  {
    request: {
      query: FIND_QUERY,
      variables: {
        name: "ce",
      },
    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
        }],
      },
    },
  },
  {
    request: {
      query: FIND_QUERY,
      variables: {
        name: "ce",
      },
    },
    result: {
      data: {
        find: [{ 
          name: "Cecilia Phillips",
          age: "30",
          email: "ceciliaphillips@daido.com",
        }],
      },
    },
  },
]; 
 
it('renders without error', async () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ContentContainer/>
    </MockedProvider>
  );
  
  // const getUserName = await waitForElement(() => getByTestId("test"))
  // expect(getUserName).toBeDefined();
});