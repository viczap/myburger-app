import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/Burger/BurgerSummary/BurgerSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error : null
    };

    componentDidMount() {
        axios.get('https://react-my-burger-viczap.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            }).catch(error => {
                this.setState({ error: error }); 
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.values(ingredients).reduce((sum, element) => sum + element, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const ingredientsUpdated = { ...this.state.ingredients };
        ingredientsUpdated[type] = oldCount + 1;
        this.setState({ ingredients: ingredientsUpdated });
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice
        this.setState({ totalPrice: newPrice });
        this.updatePurchaseState(ingredientsUpdated);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount === 0) {
            return;
        }

        const ingredientsUpdated = { ...this.state.ingredients };
        ingredientsUpdated[type] = oldCount - 1;
        this.setState({ ingredients: ingredientsUpdated });
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newPrice });
        this.updatePurchaseState(ingredientsUpdated);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        console.log('I clicked the backdrop!');
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            '123456': {
                ingredients: this.state.ingredients,
                price: this.state.totalPrice,
                customer: {
                    name: 'Victor Zapatian',
                    address: {
                        street: 'Test Address 123',
                        zipCode: '5000',
                        country: 'Germany'
                    },
                    email: 'test@test.com'
                },
                deliveryMethod: 'fastest'
            }
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {

        const disabledInfo = { ...this.state.ingredients };
        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] === 0;
        }
        console.log(disabledInfo);

        let orderSummary = null;
        let burger = this.state.error ? <p>The ingredients aren't available</p> : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = <BurgerSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                cancelPurchase={this.purchaseCancelHandler}
                continuePurchase={this.purchaseContinueHandler} />;

            burger = (
                <Aux>
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

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);