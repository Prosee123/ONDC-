import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        {/* <GridToolbarFilterButton /> */}
        {/* <GridToolbarQuickFilter /> */}
      </GridToolbarContainer>
    );
  }

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function ProductsListSection() {
    const sellerOrdersRedux = useSelector(state => state.dashboardReducer.get('sellerOndcProducts'))
    const sellerOrders = React.useMemo(() => {
        let dt = []
        if (sellerOrdersRedux) {
            dt = sellerOrdersRedux.toJS()
        }
        return dt
    }, [sellerOrdersRedux]);
    const columns = [
        { field: 'buyer_np_name', headerName: 'Buyer Name', minWidth: 200 },
        { field: 'seller_np_name', headerName: 'Seller Name', minWidth: 200 },
        { field: 'created_at', headerName: 'Created At', minWidth: 200 },
        { field: 'updated_at', headerName: 'Updated At', minWidth: 200 },
        { field: 'network_order_id', headerName: 'Nerwork Worder ID', minWidth: 200 },
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
        { field: 'shipped_at', headerName: 'Shipped At', minWidth: 200 },
        { field: 'delivered_at', headerName: 'Delivered At', minWidth: 200 },
        { field: 'delivery_type', headerName: 'Delivered Type', minWidth: 120 },
        { field: 'logistics_network_order_id', headerName: 'Logistic Network ID', minWidth: 150 },
        { field: 'logistics_network_transaction_id', headerName: 'Logistic Network transaction ID', minWidth: 220 },
        { field: 'delivery_city', headerName: 'Delivery City', minWidth: 150 },
        { field: 'delivery_pincode', headerName: 'Delivered Pincode', minWidth: 150 },
        { field: 'cancelled_at', headerName: 'Cancelled At', minWidth: 200 },
        { field: 'cancelled_by', headerName: 'Cancelled By', minWidth: 200 },
        { field: 'cancellation_reason', headerName: 'Cancelled Reason', minWidth: 200 },
        { field: 'total_order_value', headerName: 'Total Order Value', minWidth: 150 }
    ];

    return (
        <>
            <div style={{ height: 540, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={sellerOrders}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
            {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>

                    <TableRow>
                        <StyledTableCell>Buyer Name</StyledTableCell>
                        <StyledTableCell align="right">Seller Name</StyledTableCell>
                        <StyledTableCell align="right">Created At</StyledTableCell>
                        <StyledTableCell align="right">Updated At</StyledTableCell>
                        <StyledTableCell align="right">Nerwork Worder ID</StyledTableCell>
                        <StyledTableCell align="right">Transaction Id</StyledTableCell>
                        <StyledTableCell align="right">Seller Order Id</StyledTableCell>
                        <StyledTableCell align="right">Seller Type</StyledTableCell>
                        <StyledTableCell align="right">Order Status</StyledTableCell>
                        <StyledTableCell align="right">Seller Name</StyledTableCell>
                        <StyledTableCell align="right">Seller Pincode</StyledTableCell>
                        <StyledTableCell align="right">Sku Name</StyledTableCell>
                        <StyledTableCell align="right">Sku Code</StyledTableCell>
                        <StyledTableCell align="right">Product Price</StyledTableCell>
                        <StyledTableCell align="right">Order Category</StyledTableCell>
                        <StyledTableCell align="right">Shipped At</StyledTableCell>
                        <StyledTableCell align="right">Delivered At</StyledTableCell>
                        <StyledTableCell align="right">Delivered Type</StyledTableCell>
                        <StyledTableCell align="right">Logistic Network ID</StyledTableCell>
                        <StyledTableCell align="right">Logistic Network transaction ID</StyledTableCell>
                        <StyledTableCell align="right">Delivery City</StyledTableCell>
                        <StyledTableCell align="right">Delivered Pincode</StyledTableCell>
                        <StyledTableCell align="right">Cancelled At</StyledTableCell>
                        <StyledTableCell align="right">Cancelled By</StyledTableCell>
                        <StyledTableCell align="right">Cancelled Reason</StyledTableCell>
                        <StyledTableCell align="right">Total Order Value</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellerOrders?.map((row) => (
                        <StyledTableRow key={row.buyer_np_name}>
                            <StyledTableCell component="th" scope="row">
                                {row.buyer_np_name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.seller_np_name}</StyledTableCell>
                            <StyledTableCell align="right">{row.created_at}</StyledTableCell>
                            <StyledTableCell align="right">{row.updated_at}</StyledTableCell>
                            <StyledTableCell align="right">{row.network_order_id}</StyledTableCell>
                            <StyledTableCell align="right">{row.network_transaction_id}</StyledTableCell>
                            <StyledTableCell align="right">{row.seller_np_order_id}</StyledTableCell>
                            <StyledTableCell align="right">{row.seller_np_type}</StyledTableCell>
                            <StyledTableCell align="right">{row.order_status}</StyledTableCell>
                            <StyledTableCell align="right">{row.name_of_seller}</StyledTableCell>
                            <StyledTableCell align="right">{row.seller_pincode}</StyledTableCell>
                            <StyledTableCell align="right">{row.sku_name}</StyledTableCell>
                            <StyledTableCell align="right">{row.sku_code}</StyledTableCell>
                            <StyledTableCell align="right">{row.product_price}</StyledTableCell>
                            <StyledTableCell align="right">{row.order_category}</StyledTableCell>
                            <StyledTableCell align="right">{row.shipped_at}</StyledTableCell>
                            <StyledTableCell align="right">{row.delivered_at}</StyledTableCell>
                            <StyledTableCell align="right">{row.order_category}</StyledTableCell>
                            <StyledTableCell align="right">{row.shipped_at}</StyledTableCell>
                            <StyledTableCell align="right">{row.delivered_at}</StyledTableCell>
                            <StyledTableCell align="right">{row.delivery_type}</StyledTableCell>
                            <StyledTableCell align="right">{row.logistics_network_order_id}</StyledTableCell>
                            <StyledTableCell align="right">{row.logistics_network_transaction_id}</StyledTableCell>
                            <StyledTableCell align="right">{row.delivery_city}</StyledTableCell>
                            <StyledTableCell align="right">{row.delivery_pincode}</StyledTableCell>
                            <StyledTableCell align="right">{row.cancelled_at}</StyledTableCell>
                            <StyledTableCell align="right">{row.cancelled_by}</StyledTableCell>
                            <StyledTableCell align="right">{row.cancellation_reason}</StyledTableCell>
                            <StyledTableCell align="right">{row.total_order_value}</StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> */}
        </>
    );
}