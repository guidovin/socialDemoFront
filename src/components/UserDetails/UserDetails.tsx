import React, { FunctionComponent } from 'react';
import styled from "styled-components";


export interface User {
  id: string
  name?: string
  age?: string
  eyeColor?: string
  company?: string
  email?: string,
  picture?: string 
}

const Container = styled.div`
  /* background-color:yellow; */
  padding:1em;
  min-width:320px;


  display:grid;
  grid-gap:1em;
  grid-template-columns: 1fr;

  @media (min-width: 660px) {
    grid-template-columns: 1fr 2fr
  };
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 3fr 
  };
  @media (min-width: 1250px) {
    grid-template-columns: 1fr 5fr 
  };

`
const UserInfo = styled.span`
  white-space: nowrap;
  font-size:2em;
  margin-left:30px;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space: nowrap;
  min-width:150px;
  @media (max-width: 450px) {
    font-size:1.2em;
  };
`;
const UserImg = styled.span`
  min-height:200px;
  margin-left:30px;
`;

const UserInfoWrapper = styled.span`
  display:flex;
  flex-direction:column;
  justify-content:center;
  min-width:150px;
`;

const FriendsDivider = styled.span`
  font-size:2em; 
  margin-left:20px;
`;

const UserDetails: FunctionComponent<{ user: User }> = ({ user }) => {
  const { name, age, email, picture } = user;
  return(
    // react fragment example conainer is "embedded" in parent  hierarchy
    <>
    <Container>
      <UserImg>
        {picture && <img src={picture} alt="avatar loading..."/>}
      </UserImg>
      <UserInfoWrapper>
        <UserInfo>name: { name }</UserInfo>
        <UserInfo>age: { age }</UserInfo>
        <UserInfo>email: { email }</UserInfo>
      </UserInfoWrapper>
    </Container>
    <FriendsDivider>Friends:</FriendsDivider>
    </>);
}


export default UserDetails;