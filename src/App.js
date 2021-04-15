import Map from './components/Map.jsx';
import { Divider } from '@chakra-ui/react';
import AppHeading from './components/AppHeading.jsx';

const App = () => {
  return (
    <div className='App'>
      <AppHeading />
      <Divider />
      <Map />
    </div>
  );
};

export default App;
