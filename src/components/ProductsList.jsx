import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Box,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom';
import { selectProducts, selectPages } from '../modules/products/selectors';
import {
  fetchProducts,
  getProductById,
  getPages,
  changeModalState,
} from '../modules/products/actions';
import Modal from './Modal';

function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const query = searchParams.get('query');
  const [pageNum, setPageNum] = useState(page);
  const [searchId, setSearchId] = useState(query);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectPages);
  const [curretItem, setCurrentItem] = useState({});

  const openModal = () => {
    dispatch(changeModalState(true));
  };

  const searchFunction = (e) => {
    const newSearch = e.target.value;
    if (newSearch === '') {
      dispatch(fetchProducts(pageNum));
      dispatch(getPages(totalPages));
      setSearchParams({
        page: pageNum || 1,
      });
    } else {
      dispatch(getPages(1));
      dispatch(getProductById(+newSearch));
      setSearchId(newSearch);
      setSearchParams({
        page: 1,
        query: newSearch,
      });
    }
  };

  const changePage = (num) => {
    if (!query) {
      setPageNum(num);
      dispatch(fetchProducts(num));
      setSearchParams({
        page: num,
      });
    }
    return true;
  };

  useEffect(() => {
    if (query) {
      dispatch(getProductById(+query));
      dispatch(getPages(totalPages));
    } else {
      dispatch(fetchProducts(pageNum));
    }
  }, [query]);

  return (
    <div className="ProductsList">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '250px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="number"
          id="standard-basic"
          label="Search by id"
          variant="standard"
          defaultValue={searchId}
          onChange={searchFunction}
        />
      </Box>
      <TableContainer>
        <Table sx={{ width: 700, margin: '15px 0' }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#808080',
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="left">YEAR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                onClick={() => {
                  setCurrentItem(product);
                  openModal();
                }}
                key={product.id}
                sx={{
                  backgroundColor: `${product.color}`,
                  cursor: 'pointer',
                }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell
                  align="left"
                >
                  {product.name}
                </TableCell>
                <TableCell align="left">{product.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={+pageNum || 1}
          onChange={(_, num) => changePage(num)}
        />
      </Stack>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Modal item={curretItem} />
    </div>
  );
}

export default ProductsList;
