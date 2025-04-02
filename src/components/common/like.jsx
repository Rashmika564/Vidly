import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.likeornot) classes += "-o";
    return (
      <i
        onClick={() => this.props.onLike(this.props.movieOb)}
        className={classes}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
