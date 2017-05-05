import React, { Component } from 'react';
import Circle from './Circle';
import Rectangle from './Rectangle';


// get defaults from the map
// custom shape?

class Controls extends Component {

  constructor() {
    super();
    this.addCircle = this.addCircle.bind(this);
    this.removeCircle = this.removeCircle.bind(this);
    this.addRectangle = this.addRectangle.bind(this);
    this.removeRectangle = this.removeRectangle.bind(this);
  }

  removeCircle() {
    this.circle.removeCircle();
  }

  addCircle() {
    const defaultRadius = 500;
    const defaultCentre = {lat: 51.425, lng: -0.319};
    this.circle = new Circle(this.props.map, defaultRadius, defaultCentre);
  }

  removeRectangle() {
    this.rectangle.removeRectangle();
  }

  addRectangle() {
    const defaultBounds = {
      north: 51.435,
      south: 51.415,
      east: -0.305,
      west: -0.32948501586918155
    };
    this.rectangle = new Rectangle(this.props.map, defaultBounds);
  }

  render() {

    return (
      <div>
        <p>Find places by circle:</p>
        <a onClick={this.addCircle}>Add Circle</a><br/>
        <a onClick={this.removeCircle}>Remove Circle</a><br/>
        <a onClick={this.addRectangle}>Add Rectangle</a><br/>
        <a onClick={this.removeRectangle}>Remove Rectangle</a><br/>
      </div>
    )
  }
}

export default Controls;
