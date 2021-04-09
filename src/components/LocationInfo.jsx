import { Modal ,Box} from '@material-ui/core';
import { styled } from '@material-ui/core/styles'; 
const LocationInfo = ({isOpen, onOpen, onClose}) => {
  
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


return (
  <Modal
  BackdropProps={{ invisible: true }}
  open={isOpen}
  disableAutoFocus={true}
  disableEnforceFocus
  onClose={onClose}
>
  <LocationModal autoFocus={false}>hello</LocationModal>
</Modal>
);
};

export default LocationInfo;