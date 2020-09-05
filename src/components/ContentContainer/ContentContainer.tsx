import React from 'react';
import UserCard from "../../components/UserCard/UserCard";
import { FIND_QUERY, User } from "../../queries/Users/userQueries";
import { useLazyQuery, useQuery } from '@apollo/client';
import styled from "styled-components";
import Header from './Header';
import UserDetails from '../UserDetails/UserDetails';
import colors from "../../assets/css/colors";

interface ContainerProps {
  readonly size?: string;
};

const UserContainer = styled.div<ContainerProps>`
  padding:25px;
  min-width:270px;
  background-color:${colors.background};
  
  display:grid;
  grid-gap:2em;
  grid-template-columns: 1fr;
  @media (min-width: 660px) {
    grid-template-columns: 1fr 1fr
  };
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr
  };
  @media (min-width: 1320px) {
    grid-template-columns: 1fr 1fr 1fr 1fr
  };   
`;

const Container = styled.div`
  background-color:${colors.background};
  min-width: 332px;
`;

const NotFoundContainer = styled.span`
  font-size:2em;
  margin-left:50px;
`;

function ContentContainer() {
  const [ find, { loading:lazyLoading, data:lazyData, error:lazyError } ] = useLazyQuery(FIND_QUERY);
  const { loading:queryLoading, data:initialData, error:initialError } = useQuery(FIND_QUERY);
  //sets data to be displayd to initial data or new data from search originated from the find() function exposed by lazyQuery hook
  const data = (lazyData && !lazyLoading && !lazyError) ? lazyData : ((initialData && !lazyLoading) ? initialData : null );
  const [ filter, setFilter ] = React.useState("");
  const [ selectedUser, setSelectedUser ] = React.useState<User | null>(null);
  // previously data was loaded using the useEffect hook in react as a way to showcase useEffect usage. 
  // this introduced problems while testing and was replaced by the current cleaner version without "unexpected" async hook calls.
  // which seems to be for the better although doesnt showcase useEffect, so here is an example on its usage:
  /**
   * this hook would call find(name:filter) whenever filter was changed by the Header search bar 
   * 
   * useEffect(()=> {
   *  find({ variables : { data:filter }});
   * }, [filter])
   * 
   * */
  //simple example error and loading handlers
  if(queryLoading) return <h3>Loading...</h3>
  if(initialError) return <h3>Ops... Something went wrong</h3>
  return(
    <Container>
      <Header 
        setFilter={(name: string) => { find({ variables: { name }}); setFilter(name); }} 
        setSelectedUser={setSelectedUser} 
        selected={!!selectedUser}
      />
      { selectedUser && 
        <UserDetails user={selectedUser}/>
      }
      { !selectedUser ?
        <UserContainer data-testid="userContainer">
         {data && data.find && data.find.map((user: User) => <UserCard key={user.id+""+Date.now()+"user"} user={user} onClick={() => setSelectedUser(user)}/>)}
        </UserContainer>
                      :
        <UserContainer data-testid="friendsContainer">
          { selectedUser.friends && 
            selectedUser
              .friends
              .filter(user => user.name?.includes(filter))
              .map((user: User) => <UserCard key={user.id+""+Date.now()+"friend"} user={user} onClick={() => setSelectedUser(user)}/>)
          }
        </UserContainer>
      }
      {(!selectedUser && data?.find?.length === 0) &&<NotFoundContainer>No User Found With Search Term: {filter}</NotFoundContainer>}
    </Container>);
}

export default ContentContainer;