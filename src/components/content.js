import React from "react";

import Toolbox from "./toolbox";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: false,
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.canvasRef = React.createRef();
    this.canvasOverlayRef = React.createRef();
    this.ctx = null;
    this.overlayCtx = null;
  }

  componentDidMount() {
    let canvasRef = this.canvasRef.current;
    let canvasOverlayRef = this.canvasOverlayRef.current;
    let canvasRect = canvasRef.getBoundingClientRect();

    this.ctx = canvasRef.getContext("2d");
    this.ctxOverlay = canvasOverlayRef.getContext("2d");
    this.setState({ offsetX: canvasRect.left, offsetY: canvasRect.top });
  }

  handleMouseDown(e) {
    let ctx = this.ctx;
    let ctxOverlay = this.ctxOverlay;
    let activeItem = this.props.activeItem;

    this.setState({ isDrawing: true });
    ctx.beginPath();
    ctx.strokeStyle = this.props.color;
    ctx.lineWidth = 1;
    ctx.lineJoin = ctx.lineCap = "round";

    if (activeItem === "Pencil" || activeItem === "Brush") {
      ctx.moveTo(
        e.clientX - this.state.offsetX,
        e.clientY - this.state.offsetY
      );
      if (activeItem === "Brush") ctx.lineWidth = 5;
    } else if (activeItem === "Line" || activeItem === "Rectangle") {
      ctxOverlay.strokeStyle = this.props.color;
      ctxOverlay.lineWidth = 1;
      ctxOverlay.lineJoin = ctx.lineCap = "round";
      this.setState({
        startX: e.clientX - this.state.offsetX,
        startY: e.clientY - this.state.offsetY
      });
    }
  }

  handleMouseMove(e) {
    let ctx = this.ctx;
    let ctxOverlay = this.ctxOverlay;

    if (this.state.isDrawing) {
      if (
        this.props.activeItem === "Pencil" ||
        this.props.activeItem === "Brush"
      ) {
        ctx.lineTo(
          e.clientX - this.state.offsetX,
          e.clientY - this.state.offsetY
        );
        ctx.stroke();
      }
      if (this.props.activeItem === "Line") {
        ctxOverlay.clearRect(0, 0, 600, 480);
        ctxOverlay.beginPath();
        ctxOverlay.moveTo(this.state.startX, this.state.startY);
        ctxOverlay.lineTo(
          e.clientX - this.state.offsetX,
          e.clientY - this.state.offsetY
        );
        ctxOverlay.stroke();
        ctxOverlay.closePath();
      }
      if (this.props.activeItem === "Rectangle") {
        ctxOverlay.clearRect(0, 0, 600, 480);
        let width = e.clientX - this.state.offsetX - this.state.startX;
        let height = e.clientY - this.state.offsetY - this.state.startY;
        ctxOverlay.strokeRect(
          this.state.startX,
          this.state.startY,
          width,
          height
        );
      }
    }
  }

  handleMouseUp(e) {
    let ctx = this.ctx;

    if (this.props.activeItem === "Line") {
      this.ctxOverlay.clearRect(0, 0, 600, 480);
      ctx.moveTo(this.state.startX, this.state.startY);
      ctx.lineTo(
        e.clientX - this.state.offsetX,
        e.clientY - this.state.offsetY
      );
      ctx.stroke();
    }

    if (this.props.activeItem === "Rectangle") {
      let width = e.clientX - this.state.offsetX - this.state.startX;
      let height = e.clientY - this.state.offsetY - this.state.startY;
      this.ctxOverlay.clearRect(0, 0, 600, 480);
      ctx.strokeRect(this.state.startX, this.state.startY, width, height);
    }

    ctx.closePath();
    this.setState({ isDrawing: false });
  }

  render() {
    return (
      <div className="content">
        <Toolbox
          items={this.props.items}
          activeItem={this.props.activeItem}
          handleClick={this.props.handleClick}
        />
        <div className="canvas">
          <canvas
            className="canvas-actual"
            width="600px"
            height="480px"
            ref={this.canvasRef}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          />
          <canvas
            className="canvas-overlay"
            width="600px"
            height="480px"
            ref={this.canvasOverlayRef}
          />
        </div>
      </div>
    );
  }
}
