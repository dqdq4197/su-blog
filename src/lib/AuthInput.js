import styled from 'styled-components';


export const Input = styled.input.attrs(props => ({
    type: props.type ? props.type : 'text',
    size: props.size || "1em",
    placeholder : props.name === "email" ? "heesu@blog.com": props.name ,
  }))`
    color: palevioletred;
    font-size: 1em;
    border:2px solid white;
    border-radius: 10px;
    &:focus { outline:none;background-color: white; border : 2px solid rgba(13, 72, 50,.3) }
    &:hover { background-color: white; border : 2px solid rgba(13, 72, 50,.3)}
    width:55%;
    background-color:rgba(13, 72, 50,.08);
    margin: ${props => props.size};
    padding: ${props => props.size};
    transition: border .6s;
  `;

  export const Button = styled.button`
   border-radius:20px;
   background-color:rgba(13, 72, 50);
   border:none;
   color:white;
   &:hover{ background-color:rgba(13, 72, 50,.8);}
   transition:.5s;
   width:${props => props.width};
   height:${props => props.height};
  `