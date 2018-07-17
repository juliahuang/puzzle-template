import React, { Component } from 'react';
import './style.css';

class App extends Component {
  renderTitle( title ) {
    return <h2>{ title }</h2>
  }

  renderWriters( writer ) {
    return <h5>by { writer }</h5>;
  }

  renderAnswerChecker(  ) {
    return <div>
             <form onSubmit={ this.checkAnswer.bind( this ) }>
               <input type="text" id="guess" />
               <input type="submit" value="Check Answer!"></input>
             </form>
             <div id="response" style={ { fontSize: '10px' } }></div>
           </div>
  }

  checkAnswer( event ) {
    event.preventDefault();
    var response = document.getElementById( 'response' );
    var guess = document.getElementById( 'guess' ).value.replace( /[^a-zA-Z]/gi, '' ).toUpperCase();
    var answer = document.getElementById( 'answer' ).innerHTML.replace( /[^a-zA-Z]/gi, '' ).toUpperCase();
    //don't worry, i actually hash it for real - and it's usually not hidden in the html hahaha
    if ( guess === answer ) {
      response.innerHTML = 'That is correct!';
    } else {
      response.innerHTML = 'That is incorrect, please try again!';
    }
  }

  componentDidMount() {
    document.title = "Puzzle Potluck";
  }

  render() {
    var content = require( './puzzle.js' );
    var hasFlavor = typeof content.Flavor !== 'undefined';

    return (
    <div className="hcentered">
      <div className="header">
        <a href="./">
          <div style={ { fontSize: '2em', fontWeight: '700', fontStyle: 'italic' } }> PUZZLE&nbsp;POTLUCK&nbsp;X </div>
        </a>
      </div>
      { this.renderTitle( content.Constants.title ) }
      { this.renderWriters( content.Constants.writer ) }
      { hasFlavor ? <content.Flavor/> : <br/> }
      <content.Puzzle/>
      { this.renderAnswerChecker( ) }
      <span id="answer" style={{visibility: "hidden"}}>content.Constants.answer</span>
      <br/>
      <div className="footer">
        <a href="./">
          <div style={ { fontSize: '2em', fontWeight: '700', fontStyle: 'italic' } }> PUZZLE&nbsp;POTLUCK&nbsp;X </div>
        </a>
      </div>
    </div>
    );
  }
  
}


export default App;
