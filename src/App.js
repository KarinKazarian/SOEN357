import Map from './components/Map.jsx';
import { Divider, Heading, Center } from '@chakra-ui/react';
import styled from '@emotion/styled';

const App = () => {
  const StyledHeading = styled(Heading)`
    font-family: Verdana, Geneva, sans-serif;
    font-size: 27px;
    letter-spacing: 3px;
    word-spacing: 2px;
    color: #000000;
    font-weight: 400;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: uppercase;
    text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1),
      1px 1px 1px rgba(0, 0, 0, 0.5);
  `;

  const StyledHeadingWrapper = styled(Center)`
    -webkit-box-shadow: 0px 9px 19px -3px rgba(160, 207, 255, 0.93);
    box-shadow: 0px 9px 19px -3px rgba(58, 33, 199);
    border-radius: 0px 0px 40px 40px;
    margin-bottom: 20px;
  `;

  return (
    <div className='App'>
      <StyledHeadingWrapper height='50px'>
        <StyledHeading>Traffic App</StyledHeading>
      </StyledHeadingWrapper>
      <Divider></Divider>
      <Map />
    </div>
  );
};

export default App;
