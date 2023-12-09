import { createSignal } from 'solid-js';

const Choice = () => {
  const [selectedChoice, setSelectedChoice] = createSignal(null);
  const choices = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Replace with your data

  const handleChoiceChange = (choice) => {
    setSelectedChoice(choice);
  };

  return (
    <div>
      <h2>Choose an option:</h2>
      <ul>
        {choices.map((choice) => (
          <li key={choice}>
            <label>
              <input
                type="radio"
                value={choice}
                checked={selectedChoice() === choice}
                onChange={() => handleChoiceChange(choice)}
              />
              {choice}
            </label>
          </li>
        ))}
      </ul>
      <p>Selected Choice: {selectedChoice() || 'None'}</p>
    </div>
  );
};

export default ChoiceList;
