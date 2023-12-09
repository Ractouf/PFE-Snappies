import { createSignal } from 'solid-js';

const Inventory = () => {
    const [selectedItem, setSelectedItem] = createSignal(null);

    const inventoryItems = [
        { id: 1, name: 'Item 1', description: 'Description for Item 1' },
        { id: 2, name: 'Item 2', description: 'Description for Item 2' },
        { id: 3, name: 'Item 3', description: 'Description for Item 3' },
        { id: 4, name: 'Item 4', description: 'Description for Item 4' },
      ]; // A remplacer

      const handleItemChange = (item) => {
        setSelectedItem(item);
      };
    
      return (
        <div>
          <h2>Inventory</h2>
          <div>
            <h3>Choose an item:</h3>
            <ul>
              {inventoryItems.map((item) => (
                <li key={item.id}>
                  <label>
                    <input
                      type="radio"
                      value={item.id}
                      checked={selectedItem && selectedItem.id === item.id}
                      onChange={() => handleItemChange(item)}
                    />
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Selected Item Details:</h3>
            {selectedItem ? (
              <div>
                <p>Name: {selectedItem.name}</p>
                <p>Description: {selectedItem.description}</p>
              </div>
            ) : (
              <p>No item selected</p>
            )}
          </div>
        </div>
    );
};
    
export default Inventory;
