import React, { useEffect } from 'react';
import UserCard from "../../components/UserCard/UserCard";
import { FIND_QUERY, User } from "../../queries/Users/userQueries";
import { useLazyQuery } from '@apollo/client';
import styled from "styled-components";
import Header from './Header';
import UserDetails from '../UserDetails/UserDetails';

interface ContainerProps {
  readonly size?: string;
};

const UserContainer = styled.div<ContainerProps>`
  padding:40px;
  min-width:270px;
  background-color:rebeccapurple;
  
  
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
  height:"100vh"; 
  width:"100vw"; 
  background-color:"red";
`;

function ContentContainer() {
  const [ find, { loading:queryLoading, data, error } ] = useLazyQuery(FIND_QUERY);
  const [ filter, setFilter ] = React.useState("");
  const [ selectedUser, setSelectedUser ] = React.useState<User | null>(null);

  useEffect(()=>find({ variables: { name: filter } }), [filter])
  
  return(
    <Container>
      <Header setFilter={setFilter} setSelectedUser={setSelectedUser} selected={!!selectedUser}/>
      { selectedUser && 
        <UserDetails user={selectedUser}/>
      }
      { !selectedUser ?
        <UserContainer data-testid="test">
         {data && data.find && data.find.map((user: User) => <UserCard user={user} onClick={() => setSelectedUser(user)}/>)}
        </UserContainer>
                      :
        <UserContainer>
          { selectedUser.friends && 
            selectedUser
              .friends
              .filter(user => user.name?.includes(filter))
              .map((user: User) => <UserCard user={user} onClick={() => setSelectedUser(user)}/>)
          }
        </UserContainer>
      }
    </Container>);
}

export default ContentContainer;