import React from 'react';
import ReactDOM from 'react-dom';
import { Typography, Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectModalState } from '../modules/products/selectors';
import { changeModalState } from '../modules/products/actions';
import { Product } from '../types';

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

export default function BasicModal(props:Partial<Product>) {
  const {
    name, id, color, year, pantone_value,
  } = props;
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
            {pantone_value }
          </Typography>
        </Box>
      </Modal>
    </div>,
    document.getElementById('modal') as HTMLInputElement,
  );
}
BasicModal.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  color: PropTypes.string,
  year: PropTypes.number,
  pantone_value: PropTypes.string,

};
