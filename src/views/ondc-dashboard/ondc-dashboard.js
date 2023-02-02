import React from 'react'
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";

import HeaderSearch from '../../components/ondc-dashboard/header-search';
import FiltersProductsSection from '../../container/ondc-dashboard/filters-products-section';

import { getSellerProducts } from './state/action';
import { useDispatch } from 'react-redux';
import { onUserLogout } from './state/action';

import ondcLogo from '../../assets/ondc_logo.png';

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
        width: '120px',
    },
    filtersAndProductsSection: {
        display: 'flex',
        alignItems: 'center',
    }
});

const OndcDashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    React.useEffect(() => {
        const query = {
            per_page: 20,
            page: 1
        }
        dispatch(getSellerProducts({ currentQuery: query, type: 'initial' }))
    }, [])
    const onSuccessLogout = () => {
        navigate('/')
    }
    const onLogout = () => {
        const payload = {
            refreshToken: localStorage.getItem('login_access_token'),
            callFn: onSuccessLogout
        }
        dispatch(onUserLogout(payload))
    }
    return (
      <Container maxWidth>
        <div className={classes.ondcDashboard}>
          <div className={classes.dashboardLogoSearch}>
            <img className={classes.ondcLogo} src={ondcLogo} />
            {/* <HeaderSearch /> */}
            <Button onClick={onLogout}> LogOut </Button>
          </div>
          <div className={classes.filtersAndProductsSection}>
            <FiltersProductsSection />
          </div>
        </div>
      </Container>
    );
}

export default OndcDashboard