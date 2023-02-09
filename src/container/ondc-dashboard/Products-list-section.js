import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createSvgIcon } from '@mui/material/utils';
import fileSaver from 'file-saver';
import { exportOrderCSVApi } from '../../views/ondc-dashboard/state/api';
import { Parser } from 'json2csv';
import { getSellerProducts } from '../../views/ondc-dashboard/state/action';
// import { DataGrid } from '@mui/x-data-grid';
import { Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateFnsAdapter from '@date-io/date-fns';
import enIN from 'date-fns/locale/en-IN';
import { useDebouncedCallback } from 'use-debounce';

import MaterialTable from 'material-table'

export default function ProductsListSection() {
  const dispatch = useDispatch();
  const sellerOrdersRedux = useSelector((state) => state.dashboardReducer.get('sellerOndcProducts'));
  const dateFns = new DateFnsAdapter({ locale: enIN });
  const [filterParams, setFilterParams] = React.useState({
    // start_time: '09/02/2023',
    // end_time: dateFns.formatByString(new Date(), 'dd/MM/yyyy'),
  });

  const getData = useDebouncedCallback((page = 1, filters = {}) => {
    const query = {
      params: {
        per_page: 20,
        page,
        ...filters,
        // start_time: '09/02/2023',
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

  const dateFormat = (rowData, field) => {
    const value = rowData[field];
    if (value) return dateFns.formatByString(dateFns.parseISO(value), 'dd/MM/yyyy HH:MM:SS');
    return '';
  };

  const columns = [
    { field: 'buyer_no', title: 'Buyer No', minWidth: 200 },
    { field: 'buyer_np_name', title: 'Buyer Name', minWidth: 500, valueGetter: ({ value }) => { return value ? value.split('+')[0].split('<27>')[0] : ''; }, },
    { field: 'cancellation_reason', title: 'Cancelled Reason', minWidth: 200 },
    { field: 'cancelled_at', title: 'Cancelled At', minWidth: 200, type: 'dateTime', render: (rowData) => dateFormat(rowData, 'cancelled_at') },
    { field: 'cancelled_by', title: 'Cancelled By', minWidth: 200 },
    { field: 'created_at', title: 'Created At', minWidth: 200, type: 'dateTime', render: (rowData) => dateFormat(rowData, 'created_at') },
    { field: 'delivered_at', title: 'Delivered At', minWidth: 200, type: 'dateTime', render: (rowData) => dateFormat(rowData, 'delivered_at') },
    { field: 'delivery_city', title: 'Delivery City', minWidth: 150 },
    { field: 'delivery_pincode', title: 'Delivered Pincode', minWidth: 150 },
    { field: 'delivery_type', title: 'Delivered Type', minWidth: 120 },
    { field: 'id', title: 'ID', minWidth: 120 },
    { field: 'logistic_seller_np_name', title: 'logistic Seller Np Name', minWidth: 120 },
    { field: 'logistics_network_order_id', title: 'Logistic Network ID', minWidth: 150 },
    { field: 'logistics_network_transaction_id', title: 'Logistic Network transaction ID', minWidth: 220 },
    { field: 'name_of_seller', title: 'Seller Name', minWidth: 200 },
    { field: 'network_order_id', title: 'Network order ID', minWidth: 200 },
    { field: 'network_transaction_id', title: 'Transaction Id', minWidth: 120 },
    { field: 'order_category', title: 'Order Category', minWidth: 150 },
    { field: 'order_status', title: 'Order Status', minWidth: 120 },
    { field: 'ready_to_ship_at', title: 'Ready to Ship At', minWidth: 200, type: 'dateTime', render: (rowData) => dateFormat(rowData, 'ready_to_ship_at') },
    { field: 'seller_city', title: 'Seller City', minWidth: 120 },
    { field: 'seller_np_name', title: 'Seller Name', minWidth: 200 },
    { field: 'seller_np_order_id', title: 'Seller Order Id', minWidth: 120 },
    { field: 'seller_np_type', title: 'Seller Type', minWidth: 120 },
    { field: 'seller_pincode', title: 'Seller Pincode', minWidth: 120 },
    { field: 'shipped_at', title: 'Shipped At', minWidth: 200, type: 'dateTime', render: (rowData) => dateFormat(rowData, 'shipped_at') },
    { field: 'shipping_charge_total', title: 'shipping Charge Total', minWidth: 120 },
    { field: 'shipping_charges', title: 'shipping Charge Total', minWidth: 120 },
    { field: 'sku_code', title: 'Sku Code', minWidth: 200 },
    { field: 'sku_name', title: 'Sku Name', minWidth: 200 },
    { field: 'total_order_value', title: 'Total Order Value', minWidth: 150 },
    { field: 'updated_at', title: 'Updated At', minWidth: 200, type: 'dateTime', render: (rowData) => dateFormat(rowData, 'updated_at') },
  ];

  const onGetReport = async () => {
    const dataType = 'text/csv';
    const payload = {
      // start_time: '09/02/2023',
      // end_time: dateFns.formatByString(new Date(), 'dd/MM/yyyy'),
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

  if (orderArray?.length)
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
          {/* <DataGrid
          columns={columns}
          rows={orderArray}
          initialState={{
            orderArray,
          }}
          hideFooter
        /> */}

          <MaterialTable
            options={{
              search: false,
              paging: false
            }}
            columns={columns}
            data={orderArray}
          />
          <Button disabled={totalRecords === orderArray?.length} onClick={onLoadMore}>
            Load More {totalRecords - orderArray?.length}
          </Button>
        </div>
      </>
    );
}
