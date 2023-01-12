import * as React from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { createSvgIcon } from '@mui/material/utils';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, gridPaginatedVisibleSortedGridRowIdsSelector, useGridApiContext } from '@mui/x-data-grid';

const getRowsFromCurrentPage = ({ apiRef }) => gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);
const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt',
);

const CustomToolbar = () => {
    const apiRef = useGridApiContext();
  
    const handleExport = (options) => apiRef.current.exportDataAsCsv(options);
  
    const buttonBaseProps = {
      color: 'primary',
      size: 'small',
      startIcon: <ExportIcon />,
    };
  
    return (
      <GridToolbarContainer>
        <Button
          {...buttonBaseProps}
          onClick={() => handleExport({ getRowsToExport: getRowsFromCurrentPage })}
        >
          Export
        </Button>
      </GridToolbarContainer>
    );
  };

// function CustomToolbar() {
//     return (
//       <GridToolbarContainer>
//         <GridToolbarExport />
//         {/* <GridToolbarFilterButton /> */}
//         {/* <GridToolbarQuickFilter /> */}
//       </GridToolbarContainer>
//     );
//   }

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
                    rowsPerPageOptions={[30, 50, 100]}
                    initialState={{
                        sellerOrders,
                        pagination: {
                          pageSize: 30,
                        },
                    }}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
        </>
    );
}