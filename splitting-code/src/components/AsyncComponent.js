// Higher Order Compoent (HOC)
// purpose: this HOC AsyncComponent allows you to treat the promise from import like a regular component
// by using async wait syntax.
// so you don't need to .then(...) every time

import React, { Component } from 'react';

// importComponent is a promise
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    // initialize with the same state as the importComponet
    constructor(props) {
      super(props);
      this.state = {
        route: 'page1',
        component: null
      };
    }

    // when the compoent did mount, set the compoent from importComponent
    async componentDidMount() {
      // same as below
      //   const component = await importComponent();
      //   this.setState({ component: component.default });

      const { default: component } = await importComponent(); // A shorthand this destructuring the default and then get the component so you get component
      this.setState({ component });
    }

    render() {
      const Component = this.state.component;
      return Component ? <Component {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}
