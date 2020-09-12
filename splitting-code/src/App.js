import React, { Suspense } from 'react';
import './App.css';

import Page1 from './components/Page1';
//import Page2 from './components/Page2';
//import Page3 from './components/Page3';
// import AsyncComponent from './components/AsyncComponent';
import ExportCsv from './components/CsvExporter';

// use react lazy
const Page2Lazy = React.lazy(() => import('./components/Page2'));
const Page3Lazy = React.lazy(() => import('./components/Page3'));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'page1',
      component: null
    };
  }

  onRouteChange = route => {
    // without code splitting
    this.setState({ route: route });

    // with code splitting
    // if (route === 'page1') {
    //   this.setState({ route });
    // } else if (route === 'page2') {
    //   import('./components/Page2').then(Page2 => {
    //     this.setState({ route, component: Page2.default }); //make sure you use .default bc the actual component is udner .default
    //   });
    // } else if (route === 'page3') {
    //   import('./components/Page3').then(Page3 => {
    //     this.setState({ route, component: Page3.default });
    //   });
    // }
  };
  render() {
    // version 3 Using react.lazy
    if (this.state.route === 'page1') {
      return (
        <div>
          <Page1 onRouteChange={this.onRouteChange} />
          <ExportCsv />
        </div>
      );
    } else if (this.state.route === 'page2') {
      return (
        // you need to use Suspense to wrap the lazy component with fallback
        <Suspense fallback={<div>Loading...</div>}>
          <Page2Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    } else if (this.state.route === 'page3') {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Page3Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    }

    // version 2 Using async HOC
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange={this.onRouteChange} />;
    // } else if (this.state.route === 'page2') {
    //   const AsyncPage2 = AsyncComponent(() => import('./components/Page2'));
    //   return <AsyncPage2 onRouteChange={this.onRouteChange} />;
    // } else if (this.state.route === 'page3') {
    //   const AsyncPage3 = AsyncComponent(() => import('./components/Page3'));
    //   return <AsyncPage3 onRouteChange={this.onRouteChange} />;
    // }

    // code spliting version 1
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange={this.onRouteChange} />;
    // } else {
    //   return <this.state.component onRouteChange={this.onRouteChange} />;
    // }
  }
}

export default App;
