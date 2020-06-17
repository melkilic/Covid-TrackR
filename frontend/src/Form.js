import React, { Component } from 'react';
import SignUp from './Signup'
import {Login} from './Login'

export default class Form extends Component{

    state = {
        isLogginActive: true,
      };
    
      componentDidMount() {
        //Add .right by default
        this.rightSide.classList.add("right");
      }
    
      changeState() {
        const { isLogginActive } = this.state;
    
        if (isLogginActive) {
          this.rightSide.classList.remove("right");
          this.rightSide.classList.add("left");
        } else {
          this.rightSide.classList.remove("left");
          this.rightSide.classList.add("right");
        }
        this.setState((prevState) => ({
          isLogginActive: !prevState.isLogginActive,
        }));
      }
    
      render() {
        const { isLogginActive } = this.state;
        const current = isLogginActive ? "Sign Up" : "Login";
        const currentActive = isLogginActive ? "Login" : "Sign Up";
    
        return (
          <div>

      {/* <div id="apptitle"> */}

          <h1 id="covidtracker">COVID TRACKR</h1>
     
          {/* </div> */}
              <div className="App">
            <div className="login">
              <div className="container" ref={(ref) => (this.container = ref)}>
                {isLogginActive && (
                  <Login containerRef={(ref) => (this.current = ref)} />
                )}
                {!isLogginActive && (
                  <SignUp containerRef={(ref) => (this.current = ref)} />
                )}
              </div>
              <RightSide
                current={current}
                currentActive={currentActive}
                containerRef={(ref) => (this.rightSide = ref)}
                onClick={this.changeState.bind(this)}
              />
            </div>
            </div>
              
  
            </div>
        )}
    
}

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};