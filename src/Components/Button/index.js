import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: 1px;
  backgroundColor: #10D7FC;
`;

const Label = Styled.Text`
  color: #333434;
  font-family: "Karla-Italic";
  font-size: 20px;
`;


const Button = (props) => {
  return(
    <StyleButton style = {props.style} onPress ={props.onPress}>
      <Label>{props.label}</Label>
    </StyleButton>
  );
};


export default Button;