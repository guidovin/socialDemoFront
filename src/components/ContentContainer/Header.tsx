import React, { FunctionComponent, SyntheticEvent } from 'react';
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";

const Container = styled.div`
  background-color: grey;
  display: flex;
  justify-content: flex-start;
  align-items:stretch;
  height: 13%;
  @media(max-width:450px){
    min-width:350px;
  }
`;

interface OnClickProps {
  onClick: (event: SyntheticEvent) => any;
}

const Logo = styled.div<OnClickProps>`
  font-size: 2em;
  text-overflow:ellipsis;
  white-space: nowrap;
  display:flex;
  align-items:center;
  margin:0px 20px 0px 20px;
  cursor: pointer;

  @media(max-width:450px){
    display:none;
  }
`;
const SearchBar = styled.input`
  border-width: 2px;
  border-radius: 35px;
  background-color: blue;
  padding: 0.1em 0.1em 0.1em calc(10px + 0.1em);
  font-size:2em;
  min-width:inherit;
  margin:0px 25px 0px 25px;

`;
const AlignVertical = styled.span`
  display:flex;
  align-items:center;
  min-width:140px;
`;
//example of styled function used to extend existing component
const WipeSearch = styled(FaWindowClose)<OnClickProps>`
  /* alternative way to verticaly align */
  margin-top:auto;
  margin-bottom:auto;
  font-size:2em;
  margin-left:-15px;
  margin-right:10px;
  cursor: pointer;
`
 
const Header: FunctionComponent<{ setFilter: Function, setSelectedUser: Function, selected: boolean }> = ({ setFilter, setSelectedUser, selected }) => {
  const onClick = (e: SyntheticEvent) => {
    e.preventDefault(); 
    setFilter(""); 
    setSelectedUser(null)
  };

  return(
    <Container>
      <Logo onClick={onClick}>MySocial</Logo>
      <AlignVertical>
        <SearchBar onChange={(e) => setFilter(e.target.value)} placeholder="Search"/>
      </AlignVertical>
      {selected && <WipeSearch onClick={onClick}/>}
    </Container>);
}


export default Header;