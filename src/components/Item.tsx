import { useState } from "react";
import "./Item.css";

type ItemProps = {
  description: string;
  id: number;
  name: string;
  url: string;
  tabIndex: number;
};

function Item(props: ItemProps) {
  const { description, name, url, tabIndex } = props;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className={isChecked ? "item checked" : "item"}
      onClick={() => setIsChecked(!isChecked)}
    >
      <input
        className="input"
        type="checkbox"
        name={name}
        id={name}
        checked={isChecked}
        tabIndex={tabIndex}
      />
      <img className="image" src={url} alt={description} />
    </div>
  );
}

export default Item;
