import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { Product } from '../types';
import { useSelector, useDispatch } from '../hooks';

function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const query = searchParams.get('query');
  const [paginationPage, setPaginationPage] = useState(page || '1');
  const [searchId, setSearchId] = useState(query);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectPages);
  const [currentItem, setCurrentItem] = useState<Product | null>(null);

  const openModal = () => {
    dispatch(changeModalState(true));
  };

  const searchFunction = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '') {
      dispatch(fetchProducts(paginationPage));
      dispatch(getPages(totalPages));
      setSearchParams({
        page: paginationPage || '1',
      });
    } else {
      dispatch(getPages(1));
      dispatch(getProductById(+value));
      setSearchId(value);
      setSearchParams({
        page: '1',
        query: value,
      });
    }
  };

  const changePage = (num: number) => {
    if (!query) {
      setPaginationPage(String(num));
      dispatch(fetchProducts(String(num)));
      setSearchParams({
        page: String(num),
      });
    }
    return true;
  };

  useEffect(() => {
    if (query) {
      dispatch(getProductById(+query));
      dispatch(getPages(totalPages));
    } else {
      dispatch(fetchProducts(paginationPage));
    }
  }, [dispatch, totalPages, query, paginationPage]);

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
            {products.map((product: Product) => (
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
          page={Number(paginationPage || '1')}
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
      {currentItem && <Modal {...currentItem} />}
    </div>
  );
}

export default ProductsList;
