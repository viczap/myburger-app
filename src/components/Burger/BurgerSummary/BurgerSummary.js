import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const burgerSummary = (props) => {

    const ingredients = Object.keys(props.ingredients)
                            .map(ingredientKey => {
                                return (
                                <li key={ingredientKey}>
                                    <span style={{ textTransform : 'capitalize' }}>{ingredientKey}: </span>{props.ingredients[ingredientKey]}
                                </li>);
                            });

    return (

        <Aux>
            <h3>Your summary</h3>
            <p>You are going to order a burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Are you ready to order?</p>
            <Button btnType="Danger" clicked={props.cancelPurchase}>Cancel</Button>
            <Button btnType="Success" clicked={props.continuePurchase}>Continue</Button>
        </Aux>
    );
};

export default burgerSummary;