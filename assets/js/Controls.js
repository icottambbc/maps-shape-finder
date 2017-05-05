import React, { Component } from 'react';
import Circle from './Circle';
import Rectangle from './Rectangle';


// get defaults from the map
// custom shape?

class Controls extends Component{

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
    const defaultCentre = this.props.map.getCenter();
    this.circle = new Circle(this.props.map, defaultRadius, defaultCentre);
  }

  removeRectangle() {
    this.rectangle.removeRectangle();
  }

  addRectangle() {
    const lat = this.props.map.getCenter().lat();
    const lng = this.props.map.getCenter().lng();
    const defaultBounds = {
      north: lat + 0.01,
      south: lat - 0.01,
      east: lng + 0.01,
      west: lng - 0.01,
    };
    console.log(this.props.map.getCenter());
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
