import React from 'react'
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container'

import HeaderSearch from '../../components/ondc-dashboard/header-search';
import FiltersProductsSection from '../../container/ondc-dashboard/filters-products-section';

import { getSellerProducts } from './state/action';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    ondcDashboard: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //   border: 0,
        //   borderRadius: 3,
        //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        //   color: 'white',
        //   height: 48,
        //   padding: '0 30px',
        display: 'flex',
        flexDirection: 'column',
    },
    dashboardLogoSearch: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ondcLogo: {
        height: '100px',
        width: '100px',
    },
    filtersAndProductsSection:{
        display: 'flex',
        alignItems: 'center',
    }
});

const OndcDashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(getSellerProducts({name:'proseed',age:24}))
    },[])
    
    return (
        <Container maxWidth>
            <div className={classes.ondcDashboard}>
                <div className={classes.dashboardLogoSearch}>
                    <img className={classes.ondcLogo} src='https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2022/06/government-optimistic-of-taking-ondc-global-says-dpiit-official-photoutils.com_.jpeg?fit=1200%2C900&ssl=1' />
                    <HeaderSearch />
                </div>
                <div className={classes.filtersAndProductsSection}>
                    <FiltersProductsSection/>
                </div>
            </div>
        </Container>

    )
}

export default OndcDashboard