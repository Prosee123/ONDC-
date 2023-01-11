import React from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ProductFilter = (props) => {
    const { options, type } = props
    return (
        <>
        <FormGroup>
            {
                options.map((opt, index) => {
                    return (
                        <FormControlLabel control={<Checkbox  />} label={opt} />
                    )
                })
            }
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label="LabelOrder Create Date" /> */}
        </FormGroup>
        </>
        
    )
}

export default ProductFilter