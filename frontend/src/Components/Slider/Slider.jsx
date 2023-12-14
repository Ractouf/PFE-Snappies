import { createSignal } from 'solid-js';

const Slider = () => {
  const [sliderValue, setSliderValue] = createSignal(50);

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <label htmlFor="slider">Slider Value: {sliderValue()}</label>
      <input
        id="slider"
        type="range"
        min="0"
        max="100"
        value={sliderValue()}
        onInput={handleSliderChange}
      />
    </div>
  );
};

export default Slider;
