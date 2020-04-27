import React from "react";

export default class Research extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleSlide && this.props.handleSlide(-1);
  }

  render() {
    return <div>Research</div>;
  }
}
