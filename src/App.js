import React, { Component } from 'react';
import { withNavigation, Provider } from 'react-lrud';
import Lrud from 'lrud';

import Button from './Components/Button';
import Root from './Components/Root';
import ResultList from './Components/ResultList';
import navigation from './Common/Navigation';
import fakeKeyEvent from './Common/fakeKeyEvent'

import './App.css';

class App extends Component {
  buttons = [];
  buttonDefs = [
    'first-button',
    'second-button',
    'third-button',
    'fourth-button'
  ];
  buttonIds = {};

  constructor(props) {
    super(props);
    this.navigation = navigation;

    this.state = {
      focused: '',
      results: {}
    };
  }

  testElement = (id) => {
    const node = navigation.getFocusedNode();
    const nav = id === node.id ? 'true' : 'false';
    const focus = this.buttons[id].classList.contains('focused') ? 'true' : 'false';
    const elementType = this.buttons[id].localName
    const role = this.buttons[id].attributes.role.nodeValue

    this.setState(state => ({
      results: Object.assign({}, state.results, {
        [id]: {
          nav,
          focus,
          elementType,
          role
        }
      })
    }))
  }

  navigateTree = () => {
    const timeline = [
      () => {
        let firstElement = this.getElements()[0]
        this.navigation.focus(firstElement)
        const buttonId = this.buttonIds['first-button'];
        this.testElement(buttonId)
      },
      () => {
        fakeKeyEvent(
          navigation.getFocusedNode(),
          'right'
        );

        const buttonId = this.buttonIds['second-button'];
        this.testElement(buttonId)
      },
      () => {
        fakeKeyEvent(
          navigation.getFocusedNode(),
          'right'
        );

        const buttonId = this.buttonIds['third-button'];
        this.testElement(buttonId)
      },
      () => {
        fakeKeyEvent(
          navigation.getFocusedNode(),
          'right'
        );

        const buttonId = this.buttonIds['fourth-button'];
        this.testElement(buttonId)
      }
    ]

    function progress(index) {
      let timeout = index === 0 ? 3000 : 3500
      setTimeout(function () {
        timeline[index]();

        if(timeline.length > index+1) {
          progress(index+1)
        }
      }, timeout)
    }

    progress(0)
  }

  onFocus = (node) => {
    this.setState({
      focused: node.id
    })
  }

  getElements = () => this.navigation.nodes[this.navigation.root].children


  componentDidMount = () => {
    this.navigateTree()
  }

  buttonRef = (className, ref, id) => {
    this.buttons[id] = ref;
    this.buttonIds[className] = id;

    console.log(this)
    this.setState(state => ({
      results: Object.assign({}, state.results, {
        [id]: {
          nav: true,
          focus: true,
          elementType: true,
          role: true
        }
      })
    }))
  }

  render() {
    return (
      <div className="root">
        <Provider navigation={this.navigation}>
          <Root
            orientation="horizontal"
          >
          {this.buttonDefs.map(className => (
            <Button
              key={className}
              className={className}
              buttonText="Click Me"
              horizontal
              parent="container"
              onFocus={this.onFocus}
              focused={this.state.focused}
              forwardRef={this.buttonRef.bind(this, className)}
            />
          ))}
          </Root>
        </Provider>
        <ResultList
          results={this.state.results}
        />
      </div>
    );
  }
}

export default App;
