import React from "react";

const Button = props => {
  const style = {
    __html: props.image
  };

  return (
    <div
      className={"button " + (props.active ? "selected" : "")}
      dangerouslySetInnerHTML={style}
      onClick={e => props.handleClick(e, props.name)}
    />
  );
};

export default class Toolbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, name) {
    this.props.handleClick(event, name);
  }

  render() {
    const items = this.props.items.map(item => (
      <Button
        active={this.props.activeItem === item.name ? true : false}
        name={item.name}
        image={item.image}
        key={item.name}
        handleClick={this.handleClick}
      />
    ));

    return <div className="toolbox">{items}</div>;
  }
}
