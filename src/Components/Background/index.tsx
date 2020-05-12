import React from 'react';
import Styled from 'styled-components/native';


const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

interface Props {}

const Background = ({ }: Props) => {
  return(
    <Container>

    </Container>
  );
};

export default Background;