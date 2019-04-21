import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class BurgerSummary extends Component {
    
    componentWillUpdate() {
        // Only for test purposes, this could be a functional component.
        console.log('[BurgerSummary] WillUpdate');
    }
    
    render() {
        const ingredients = Object.keys(this.props.ingredients)
            .map(ingredientKey => {
                return (
                    <li key={ingredientKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ingredientKey}: </span>{this.props.ingredients[ingredientKey]}
                    </li>);
            });

        return (
            <Aux>
                <h3>Your summary</h3>
                <p>You are going to order a burger with the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Are you ready to order?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>Continue</Button>
            </Aux>
        );

    }
}
export default BurgerSummary;