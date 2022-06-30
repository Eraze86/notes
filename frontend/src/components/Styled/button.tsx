import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled.button`
background-color: white;
border: 2px solid #a2d5c6;
font-weight: bold;
position: absolute;
right: 2rem;
top: 5rem;
padding: 0.3rem;

`

export const MainButton = styled.button`
background-color: #077b8a;
border: 2px solid #a2d5c6;
font-weight: bold;

padding: 0.5rem;


`
export const LinkList = styled(Link)`
color: #d72631;
text-decoration: none;
:hover{
    color: #5c3c92;
}

`