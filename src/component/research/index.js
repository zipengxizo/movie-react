import React from "react";

export default class Research extends React.PureComponent {
  /* constructor(props) {
    super(props);
  } */

  componentDidMount() {
    this.props.handleSlide && this.props.handleSlide(-1);
  }

  render() {
    console.log(111)
    return <div>Research</div>;
  }
}
