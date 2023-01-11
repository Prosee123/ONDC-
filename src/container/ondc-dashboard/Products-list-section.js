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
        let dt = null
        if (sellerOrdersRedux) {
            dt = sellerOrdersRedux.toJS()
        }
        return dt
    }, [sellerOrdersRedux])
    
    return (
        <TableContainer component={Paper}>
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
        </TableContainer>
    );
}