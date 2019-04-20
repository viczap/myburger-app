import React from 'react';
import classes from './Logo.module.css';
import img from '../../assets/burger-logo.png';

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={img} alt={'My Burger Logo'} />
        </div>
    );
};

export default logo;