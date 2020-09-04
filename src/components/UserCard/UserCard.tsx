import React, { FunctionComponent, SyntheticEvent } from 'react';
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

interface ContainerProps {
  onClick: (event: SyntheticEvent) => any;
}

const Container = styled.div<ContainerProps>`
  border:solid 1px;
  border-radius:1em;
  /* background-color:blue; */
  box-shadow: 1px 2px #222e2e;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding:1em;
  /* 
    here I could set a fixed width (or dynamicaly set width) 
    to force every card to have same width instead of maxWidth that allows 
    some wiggle room for slightly smaller/larger cards
  */
  max-width:300px; 
  height:300px;
  margin:auto;
`
const UserInfo = styled.span`
  width:calc(100% - 30px);
  text-overflow:ellipsis;
  overflow:hidden;
  white-space: nowrap;
  margin:auto;
`;
const UserImg = styled.span`
  min-height:200px;
  margin:auto;
`;

const UserCard: FunctionComponent<{ user: User, onClick: Function }> = ({ user, onClick }) => {
  const { name, age, eyeColor, company, email, picture } = user;
  return(
    <Container onClick={(event: SyntheticEvent) => {event.preventDefault(); onClick(user)}} data-testid="userCard">
      <UserImg id="imgContainer">
        <img src={picture} alt="avatar loading..." />
      </UserImg>
      <UserInfo data-testid={name}>name: { name }</UserInfo>
      <UserInfo>age: { age }</UserInfo>
      <UserInfo>eye color: { eyeColor }</UserInfo>
      <UserInfo>company: { company }</UserInfo>
      <UserInfo>email: { email }</UserInfo>
    </Container>);
}


export default UserCard;