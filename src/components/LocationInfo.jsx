import { Modal, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useWindowSize from '../hooks/useWindowSize';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Input,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  Collapse,
  Lorem,
} from '@chakra-ui/react';

const LocationInfo = ({ isOpen, onOpen, onClose, bestTimeData, onToggle }) => {
  const windowSize = useWindowSize();
  // const { isOpen, onToggle } = useDisclosure();

  const LocationModal = styled(Box)({
    width: 300,
    height: 300,
    background: 'white',
    outline: 'none',
    marginTop: '150px',
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  });

  const hours = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ];

  return (
    // <Modal
    //   BackdropProps={{ invisible: true }}
    //   open={isOpen}
    //   disableAutoFocus={true}
    //   disableEnforceFocus
    //   onClose={onClose}
    // >
    <>
      {/* <Button onClick={onToggle}>Click Me</Button> */}
      {/* <Collapse in={isOpen} animateOpacity width={1600} height={400}> */}

      <BarChart
        width={windowSize.width / 5}
        height={windowSize.height / 3.5}
        data={bestTimeData}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' />
        <Bar dataKey='pv' fill='#8070da' />
      </BarChart>
      {/* </Collapse> */}
    </>

    // <Accordion defaultIndex={[0]}>
    //   <AccordionItem>
    //     <h2>
    //       <AccordionButton>
    //         <Box flex='1' textAlign='left'>
    //           Section 1 title
    //         </Box>
    //         <AccordionIcon />
    //       </AccordionButton>
    //     </h2>
    //     <AccordionPanel pb={4}>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //       minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //       aliquip ex ea commodo consequat.
    //     </AccordionPanel>
    //   </AccordionItem>
    // </Accordion>

    // <Drawer
    //   isOpen={isOpen}
    //   placement='left'
    //   onClose={onClose}
    //   useInert={false}
    //   blockScrollOnMount={false}
    // >
    //   <DrawerOverlay>
    //     <DrawerContent>
    //       <DrawerCloseButton />
    //       <DrawerHeader>Create your account</DrawerHeader>

    //       <DrawerBody>
    //         <Input placeholder='Type here...' />
    //       </DrawerBody>

    //       <DrawerFooter>
    //         <Button variant='outline' mr={3} onClick={onClose}>
    //           Cancel
    //         </Button>
    //         <Button colorScheme='blue'>Save</Button>
    //       </DrawerFooter>
    //     </DrawerContent>
    //   </DrawerOverlay>
    // </Drawer>

    // <BarChart width={600} height={400} data={bestTimeData}>
    //   <CartesianGrid strokeDasharray="3 3" />
    //   <XAxis dataKey="name" />
    //   <YAxis />
    //   <Tooltip />
    //   <Legend />
    //   <Bar dataKey="pv" fill="#8884d8" />
    //   <Bar dataKey="uv" fill="#82ca9d" />
    // </BarChart>
    // <LocationModal autoFocus={false}>
    //   {bestTimeData.map((bestTime) => (
    //     <div>{bestTime.name}</div>
    //   ))}
    // </LocationModal>
    // </Modal>
  );
};

export default LocationInfo;
