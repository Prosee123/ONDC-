import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";
import FiltersProductsSection from '../../container/ondc-dashboard/filters-products-section';
import { useDispatch } from 'react-redux';
import { onUserLogout } from './state/action';
import { getAuthToken } from '../../utils/miscellaneous/mics';

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
    const ondcLogo = 'https://ndh.imgix.net/ndh-assets/img/ondc_logo.png';

    const onSuccessLogout = () => {
        navigate('/login')
    }
    const onLogout = () => {
        const payload = {
            refreshToken: localStorage.getItem('login_access_token'),
            callFn: onSuccessLogout
        }
        dispatch(onUserLogout(payload))
    }

    useEffect(() => {
      const authToken = getAuthToken() || null;
      if( !authToken ) {
        onLogout();
      }
    }, [])

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