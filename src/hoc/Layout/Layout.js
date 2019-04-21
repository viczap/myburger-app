import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = { showSideDrawer : false }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer : false });
    }

    menuButtonOpenHandler = () => {
        this.setState({ showSideDrawer : true });
    }

    render() {
        return (
            <Aux>
                <SideDrawer show={this.state.showSideDrawer} close={this.sideDrawerCloseHandler} />
                <Toolbar show={this.state.showSideDrawer} open={this.menuButtonOpenHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;