import React, { FunctionComponent, SyntheticEvent } from 'react';
import styled from "styled-components";
import colors from "../../assets/css/colors";

export interface User {
  id: string
  name?: string
  age?: string
  eyeColor?: string
  company?: string
  email?: string
  picture?: string
  friends?: [User]
  greeting?: string 
}

interface ContainerProps {
  onClick: (event: SyntheticEvent) => any;
}

const Container = styled.div<ContainerProps>`
  border:solid 1px ${colors.contrast};
  border-radius:1em;
  background-color:${colors.secondary};
  box-shadow: 1px 2px #758888;
  display:flex;
  flex-direction:column;
  padding:1em;
  max-height:400px;
  min-width: 240px;
  max-width:400px;
  cursor:pointer;
`
const UserInfo = styled.span`
  width:calc(100%);
  text-overflow:ellipsis;
  overflow:hidden;
  white-space: nowrap;
`;
const UserImg = styled.span`
  min-height:200px;
  margin:auto;
`;
const UserInfoArea = styled.span`
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  margin:auto;
`;
const UserCard: FunctionComponent<{ user: User, onClick: Function }> = ({ user, onClick }) => {
  const { name, age, eyeColor, company, email, picture } = user;
  return(
    <Container onClick={(event: SyntheticEvent) => {event.preventDefault(); onClick(user)}} data-testid="userCard">
      <UserImg id="imgContainer">
        <img src={picture} alt="avatar loading..." />
      </UserImg>
      <UserInfoArea>
        <UserInfo data-testid={name}>{`Name: ${name}`}</UserInfo>
        <UserInfo>{`Age: ${age}`}</UserInfo>
        <UserInfo>{`Eye color: ${eyeColor}`}</UserInfo>
        <UserInfo>{`Company: ${company}`}</UserInfo>
        <UserInfo>{`Email: ${email}`}</UserInfo>
      </UserInfoArea>
    </Container>);
}


export default UserCard;