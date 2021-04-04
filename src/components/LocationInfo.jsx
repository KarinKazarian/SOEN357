import React, { useState } from 'react';
import { Modal, Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const LocationInfo = (props) => {
  const [open, setOpen] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const LocationModal = styled(Box)({
    width: 300,
    height: 300,
    background: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  });

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        BackdropProps={{ invisible: true }}
        open={open}
        onClose={handleClose}
        disableAutoFocus={true}
      >
        <LocationModal disableAutoFocus={true} autoFocus={false}>
          {props.name}
        </LocationModal>
      </Modal>
    </div>
  );
};

export default LocationInfo;
