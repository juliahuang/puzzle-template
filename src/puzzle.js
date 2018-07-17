import React from 'react';
import * as d3 from 'd3'; //you probably don't need this unless you're drawing stuff with javascript!
import './puzzle.css';

//these are not actually going to be used, just for your own pleasure of seeing your answer work and your puzzle title and name :P
export const Constants = {
  title: "Puzzle Title",
  writer: "your name here",
  answer: "the answer here"
}

//if there's no flavor text, just take the next 6 lines out
export const Flavor = props => {
  return (
  <div className="flavor">
    To hit the bullseye, you have to be precise. Coach always said you had to aim for the center of the center.
  </div>
  )
}

//this class is required, put your puzzle here!! feel free to put other methods here too \o/
export class Puzzle extends React.Component {
  render() {
    return (
    <div>
      <div className="three-julz-target" style={ { marginBottom: '0px' } }>
        <Target id="1" data={ "THE FOUNDER OF ATARI AND SYZYGY" } />
        <br/>
        <Target id="2" data={ "A FEELING OF GREEN" } />
        <br/>
        <Target id="3" data={ "THE KURT VONNEGUT NOVEL WITH THE SHORTEST TITLE" } />
        <br/>
        <Target id="4" data={ "DOCTRINE OPPOSING EUROPEAN COLONIALISM IN AMERICA" } />
        <br/>
        <Target id="5" data={ "A FRIEND COMMUNICATED WITH VIA MAIL" } />
        <br/>
        <Target id="6" data={ "TURKISH SATIRIST, POET, AND NEY PERFORMER" } />
        <br/>
        <Target id="7" data={ "THE LARGEST ONES OF THREE FOUND ON CONVENTIONAL BOWLING BALLS" } />
        <br/>
        <Target id="8" data={ "A STRINGED INSTRUMENT OF GERMAN ORIGIN" } />
      </div>
    </div>
    )
  }
}

// other classes - only if you need them! (you probably don't if your puzzle is just a list)
class Target extends React.Component {
  displayName: 'Target';

  constructor( props ) {
    super( props );
    this.size = 30;
    this.font_size = 15;

    // set up SVG for D3
    this.id = props.id;
    this.words = props.data.split( ' ' );
    this.circles = (this.words.length / 2) + 1;
  }

  componentDidMount() {
    const context = this.setContext();
    this.drawCircles( context );
    this.drawWords( context );
  }

  setContext() {
    return d3.select( this.refs.target ).append( 'svg' )
      .attr( 'height', this.circles * this.size * 2 )
      .attr( 'width', this.circles * this.size * 2 );
  }

  drawCircles( context ) {
    for (var i = 0; i < this.circles; i++) {
      var radius = this.size * (this.circles - i) - 1;
      var center = this.circles * this.size;

      context.append( 'circle' )
        .attr( 'cx', center )
        .attr( 'cy', center )
        .attr( 'r', radius )
        .style( 'fill', i % 2 ? d3.rgb( 'white' ) : d3.rgb( 'red' ) )
        .style( 'stroke', d3.rgb( 'red' ) );

      context.append( 'path' )
        .attr( 'id', 'circle-' + this.id + '-' + i ) //very important to give the path element a unique ID to reference later
        .attr( 'd', 'M ' + center + ',' + (center + (radius - this.size * 3 / 4)) + ' A ' + (radius - this.size * 3 / 4) + ',' + (radius - this.size * 3 / 4) + ' 0 0,1 ' + center + ',' + (center - (radius - this.size * 3 / 4)) )
        .style( 'fill', 'none' )

      context.append( 'path' )
        .attr( 'id', 'circle-' + this.id + '-' + (this.words.length - i - 1) ) //very important to give the path element a unique ID to reference later
        .attr( 'd', 'M ' + center + ',' + (center - (radius - this.size * 3 / 4)) + ' A ' + (radius - this.size * 3 / 4) + ',' + (radius - this.size * 3 / 4) + ' 0 0,1 ' + center + ',' + (center + (radius - this.size * 3 / 4)) )
        .style( 'fill', 'none' )
    }
  }

  drawWords( context ) {
    for (var i = 0; i < this.words.length; i++) {
      //Create an SVG text element and append a textPath element
      context.append( 'text' )
        .style( 'font-size', this.font_size + 'px' )
        .append( 'textPath' ) //append a textPath to the text element
        .attr( 'href', '#circle-' + this.id + '-' + i ) //place the ID of the path here
        .style( 'text-anchor', 'middle' ) //place the text halfway on the arc
        .attr( 'startOffset', '50%' )
        .text( this.words[ i ] );
    }
  }

  render() {
    return (
    <div ref="target" className="three-julz"></div>
    );
  }

}
