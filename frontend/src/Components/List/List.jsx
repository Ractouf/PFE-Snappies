import { createSignal } from 'solid-js';

const List = () => {
  const [items, setItems] = createSignal([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ]);

  const addItem = () => {
    const newItem = prompt('Enter a new item:');
    if (newItem) {
      setItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const removeItem = (index) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  return (
    <div>
      <h2>List Component</h2>
      <ul>
        {items().map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default List;
