import React from 'react';
import Styled from 'styled-components/native';

const Image = Styled.Image`
width: 100px;
height: 50px;
`;


const Logo = () => (
    <Image source={require('~/Assets/Images/FavorGiver.png')} />
);

export default Logo;