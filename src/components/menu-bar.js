import React from "react";

const MenuItem = props => {
  return <div className="menu-item">{props.text}</div>;
};

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="menu-bar">
        <MenuItem text="File" />
        <MenuItem text="Edit" />
        <MenuItem text="View" />
        <MenuItem text="Image" />
        <MenuItem text="Colors" />
        <MenuItem text="Help" />
      </div>
    );
  }
}
