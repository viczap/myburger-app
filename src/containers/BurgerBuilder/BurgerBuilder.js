import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/Burger/BurgerSummary/BurgerSummary'; 

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 0,
            bacon : 0, 
            cheese : 0, 
            meat : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    };

    updatePurchaseState(ingredients) {
        const sum = Object.values(ingredients).reduce((sum, element) => sum + element, 0);
        this.setState({ purchasable : sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const ingredientsUpdated = { ...this.state.ingredients };
        ingredientsUpdated[type] = oldCount + 1;
        this.setState({ ingredients : ingredientsUpdated });
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice
        this.setState({ totalPrice :  newPrice });
        this.updatePurchaseState(ingredientsUpdated);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount === 0) {
            return;
        }
        
        const ingredientsUpdated = { ...this.state.ingredients };
        ingredientsUpdated[type] = oldCount - 1;
        this.setState({ ingredients : ingredientsUpdated });
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ totalPrice :  newPrice });
        this.updatePurchaseState(ingredientsUpdated);
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true });
    }

    purchaseCancelHandler = () => {
        console.log('I clicked the backdrop!');
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        alert('You clicked continue!');
    }

    render() {

        const disabledInfo = { ...this.state.ingredients }; 
        for(let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] === 0;
        }
        console.log(disabledInfo);
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    <BurgerSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancelPurchase={this.purchaseCancelHandler}
                        continuePurchase={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} 
                    purchasing={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;