import Slider from "rc-slider";

const SliderInput = ({
  inputRef,
  value,
  handleSliderChange,
  handleSliderAfterChange,
  handleInputChange,
}) => {
  return (
    <div className="flex h-16 w-full shrink-0 items-center gap-1 rounded-md border-4 border-black bg-black duration-150 ease-in-out focus-within:outline focus-within:outline-gold/50">
      <div className="flex h-full w-full items-center rounded-l bg-gold px-4">
        <Slider
          min={0}
          max={200}
          value={value}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange}
          railStyle={{
            backgroundColor: "gold",
            height: 3,
            marginTop: 1,
          }}
          trackStyle={{
            backgroundColor: "black",
            marginLeft: -1,
          }}
          handleStyle={{
            height: 15,
            width: 15,
            borderColor: "black",
            backgroundColor: "black",
            boxShadow: "none",
          }}
        />
      </div>
      <label className="flex h-full items-center gap-1 rounded-r bg-gold px-4">
        <input
          ref={inputRef}
          className="w-8 bg-gold text-right"
          type="number"
          min={0}
          max={400}
          value={value}
          onChange={handleInputChange}
        />
        km
      </label>
    </div>
  );
};

export default SliderInput;
