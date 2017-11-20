// @flow
import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

type Props = {
    foo: number,
    children: any
}

type State = {
    bar: 'sad' | 'asdsad'
}

class Home extends Component<Props, State> {
    static defaultProps = {
        foo: 23 + 'sad'
    }

    render() {
        return <h1>
            <div>{this.props.children}</div>
            <div>{this.props.foo}</div>
            <ul>
                <li><Link to='/home1'>Home</Link></li>
                <li><Link to='/roster'>Roster</Link></li>
                <li><Link to='/schedule'>Schedule</Link></li>
            </ul>
        </h1>;
    }
}

class Home1 extends Component<{}, {}> {
    render() {
        return <h1>Home1</h1>;
    }
}

export default () =>
    <Switch>
        <Home foo={122212321}>
            <Route exact path='/' component={Home}/>
            <Route path='/home1' component={Home1}/>
        </Home>
    </Switch>;

