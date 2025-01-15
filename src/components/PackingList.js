import { useState } from "react";
import Item from "./Item";

// <select :value="quantity" @change="setQuantity($event)">
//   <option v-for="num in 20" :value="num">{{ num }}</option>
// </select>
export default function PackingList({
  items,
  onRemoveItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items.toSorted((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === "packed")
    sortedItems = items.toSorted((a, b) => a.packed - b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div
        className="actions"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <select>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>

      <button onClick={() => onClearList()}>Reset</button>
    </div>
  );
}
