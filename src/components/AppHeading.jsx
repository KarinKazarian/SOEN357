import { Heading, Center, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import useWindowSize from '../hooks/useWindowSize';
import Logo from '../images/logo.png';

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
  margin-bottom: 10px;
  padding: 40px;
  background: rgba(235, 216, 247, 0.25);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;
const AppHeading = () => {
  const windowSize = useWindowSize();
  return (
    <>
      <StyledHeadingWrapper height={windowSize.height * 0.03}>
        <StyledHeading>Time Saver </StyledHeading>
        <Image src={Logo} alt='time logo' height={43 * 1.5} />
      </StyledHeadingWrapper>
    </>
  );
};

export default AppHeading;
