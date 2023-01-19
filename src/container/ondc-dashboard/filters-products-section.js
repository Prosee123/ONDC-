import React from 'react'
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

import ProductFilter from '../../components/ondc-dashboard/product-filter';
import ProductsListSection from './Products-list-section';

const useStyles = makeStyles({
    filtersAndSort: {
        display: 'flex',
        flexDirection: 'column'
    }
});

const FiltersProductsSection = (props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={0}>
            {/* <Grid item xs={3}>
                <div className={classes.filtersAndSort}>
                    <h3>Filter By</h3>
                    <ProductFilter options={
                        ['LabelOrder Create Date',
                            'Order Status',
                            'Seller Pincode',
                            "Seller City",
                            "Order Category",
                            "Shipped Date",
                            "Delivered Date",
                            "Delivery Type",
                            "Cancelled Date",
                            "Cancelled By"
                        ]}
                        type='Hello'
                    />

                    <h3>Sort By</h3>
                    <ProductFilter options={
                        ['Total Order',
                            'Total Shipping charge',
                            'Seller Pincode',
                            "Seller City",
                            "Order Create Date",
                            "Order Status",
                            "Delivered Date",
                            "Cancelled Date",
                            "Seller Pincode",
                            "Order Category"
                        ]}
                        type='Bello'
                    />
                </div>
            </Grid> */}
            <Grid item xs={12}>
                <ProductsListSection />
            </Grid>
        </Grid>
    )
}

export default FiltersProductsSection