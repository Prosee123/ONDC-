import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createSvgIcon } from '@mui/material/utils';
import fileSaver from 'file-saver';
import { exportOrderCSVApi } from '../../views/ondc-dashboard/state/api';
import { Parser } from 'json2csv';
import { getSellerProducts } from '../../views/ondc-dashboard/state/action';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateFnsAdapter from '@date-io/date-fns';
import enIN from 'date-fns/locale/en-IN';
import { useDebouncedCallback } from 'use-debounce';

export default function ProductsListSection() {
  const dispatch = useDispatch();
  const sellerOrdersRedux = useSelector((state) => state.dashboardReducer.get('sellerOndcProducts'));
  const dateFns = new DateFnsAdapter({ locale: enIN });
  const [filterParams, setFilterParams] = React.useState({
    start_time: '09/02/2023',
    end_time: dateFns.formatByString(new Date(), 'dd/MM/yyyy'),
  });

  const getData = useDebouncedCallback((page = 1, filters = {}) => {
    const query = {
      params: {
        per_page: 20,
        page,
        ...filters,
        start_time: '09/02/2023',
      },
    };
    dispatch(getSellerProducts({ currentQuery: query, type: page == 1 ? 'initial' : 'pagination' }));
  }, 2500);

  React.useEffect(() => {
    getData(1, filterParams);
  }, [filterParams]);

  const { sellerOrders, orderArray, totalRecords, currentQuery } = React.useMemo(() => {
    let sellerOrders = [],
      orderArray = [],
      totalRecords = 0,
      currentQuery = {};
    if (sellerOrdersRedux) {
      let dt = sellerOrdersRedux.toJS();
      currentQuery = dt.currentQuery;
      sellerOrders = dt.ondcDt;
      totalRecords = dt.totalRecords;
      orderArray = dt.ondcOrderArray;
    }
    return { sellerOrders, orderArray, totalRecords, currentQuery };
  }, [sellerOrdersRedux]);

  const dateFormat = ({ value }) => {
    if (value) return dateFns.formatByString(dateFns.parseISO(value), 'dd/MM/yyyy HH:MM:SS');
    return '';
  };

  const columns = [
    {
      field: 'buyer_np_name',
      headerName: 'Buyer Name',
      minWidth: 500,
      valueGetter: ({ value }) => {
        return value ? value.split('+')[0].split('<27>')[0] : '';
      },
    },
    { field: 'seller_np_name', headerName: 'Seller Name', minWidth: 200 },
    { field: 'created_at', headerName: 'Created At', minWidth: 200, type: 'dateTime', valueGetter: dateFormat },
    { field: 'updated_at', headerName: 'Updated At', minWidth: 200, type: 'dateTime', valueGetter: dateFormat },
    { field: 'network_order_id', headerName: 'Network order ID', minWidth: 200 },
    { field: 'network_transaction_id', headerName: 'Transaction Id', minWidth: 120 },
    { field: 'seller_np_order_id', headerName: 'Seller Order Id', minWidth: 120 },
    { field: 'seller_np_type', headerName: 'Seller Type', minWidth: 120 },
    { field: 'order_status', headerName: 'Order Status', minWidth: 120 },
    { field: 'name_of_seller', headerName: 'Seller Name', minWidth: 200 },
    { field: 'seller_pincode', headerName: 'Seller Pincode', minWidth: 120 },
    { field: 'sku_name', headerName: 'Sku Name', minWidth: 200 },
    { field: 'sku_code', headerName: 'Sku Code', minWidth: 200 },
    { field: 'product_price', headerName: 'Product Price', minWidth: 120 },
    { field: 'order_category', headerName: 'Order Category', minWidth: 150 },
    { field: 'ready_to_ship_at', headerName: 'Ready to Ship At', minWidth: 200, type: 'dateTime', valueGetter: dateFormat },
    { field: 'shipped_at', headerName: 'Shipped At', minWidth: 200, type: 'dateTime', valueGetter: dateFormat },
    { field: 'delivered_at', headerName: 'Delivered At', minWidth: 200, type: 'dateTime', valueGetter: dateFormat },
    { field: 'delivery_type', headerName: 'Delivered Type', minWidth: 120 },
    { field: 'logistics_network_order_id', headerName: 'Logistic Network ID', minWidth: 150 },
    { field: 'logistics_network_transaction_id', headerName: 'Logistic Network transaction ID', minWidth: 220 },
    { field: 'delivery_city', headerName: 'Delivery City', minWidth: 150 },
    { field: 'delivery_pincode', headerName: 'Delivered Pincode', minWidth: 150 },
    { field: 'cancelled_at', headerName: 'Cancelled At', minWidth: 200, type: 'dateTime', valueGetter: dateFormat },
    { field: 'cancelled_by', headerName: 'Cancelled By', minWidth: 200 },
    { field: 'cancellation_reason', headerName: 'Cancelled Reason', minWidth: 200 },
    { field: 'total_order_value', headerName: 'Total Order Value', minWidth: 150 },
  ];

  const onGetReport = async () => {
    const dataType = 'text/csv';
    const payload = {
      start_time: '09/02/2023',
      end_time: dateFns.formatByString(new Date(), 'dd/MM/yyyy'),
    };
    const res = await exportOrderCSVApi(payload);
    if (res) {
      const fileBlob = new Blob([res], { type: dataType });
      fileSaver.saveAs(fileBlob, 'ondc_reports.csv');
    }
  };

  const onLoadMore = () => {
    getData(currentQuery.params.page + 1, filterParams);
  };

  return (
    <>
      <div style={{ height: '70vh', width: '100%' }}>
        <Grid container justifyContent="space-between" alignItems="center" padding={2}>
          <Grid item>
            <Button onClick={onGetReport}> Export </Button>
          </Grid>
          <Grid item container spacing={2}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              dateFormats={{ keyboardDate: 'dd/MM/yyyy' }}
              adapterLocale={enIN}
            >
              <Grid item>
                <DatePicker
                  label="Start Date"
                  format="dd/MM/yyyy"
                  disableFuture
                  value={filterParams?.start_time && dateFns.parse(filterParams?.start_time, 'dd/MM/yyyy')}
                  onChange={(newValue) => {
                    setFilterParams((currentParams) => ({
                      ...currentParams,
                      start_time: newValue ? dateFns.formatByString(newValue, 'dd/MM/yyyy') : undefined,
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  label="End Date"
                  format="dd/MM/yyyy"
                  disableFuture
                  value={filterParams?.end_time && dateFns.parse(filterParams?.end_time, 'dd/MM/yyyy')}
                  onChange={(newValue) => {
                    setFilterParams((currentParams) => ({
                      ...currentParams,
                      end_time: newValue ? dateFns.formatByString(newValue, 'dd/MM/yyyy') : undefined,
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <DataGrid
          columns={columns}
          rows={orderArray}
          initialState={{
            orderArray,
          }}
          hideFooter
        />
        <Button disabled={totalRecords === orderArray?.length} onClick={onLoadMore}>
          Load More {totalRecords - orderArray?.length}
        </Button>
      </div>
    </>
  );
}
