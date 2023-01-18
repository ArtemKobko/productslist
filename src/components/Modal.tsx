import React from 'react';
import ReactDOM from 'react-dom';
import { Typography, Box, Modal } from '@mui/material';
import { selectModalState } from '../modules/products/selectors';
import { changeModalState } from '../modules/products/actions';
import { Product } from '../types';
import { useDispatch, useSelector } from '../hooks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 430,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<Product> = ({
  name, id, color, year, pantone_value: pantoneValue,
}) => {
  const isActive = useSelector(selectModalState);
  const dispatch = useDispatch();
  const close = () => dispatch(changeModalState(false));

  return ReactDOM.createPortal(
    <div>
      <Modal
        open={isActive}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            id:
            {id}
            ,  color:
            {color}
            ,  year:
            {year}
            ,  pantone_value:
            {pantoneValue }
          </Typography>
        </Box>
      </Modal>
    </div>,
    document.getElementById('modal') as HTMLInputElement,
  );
};

export default BasicModal;
