import Slider from "rc-slider";

const SliderInput = ({
  value,
  handleSliderChange,
  handleSliderAfterChange,
  handleInputChange,
}) => {
  return (
    <div className="flex h-16 w-full items-center gap-1 rounded-md border-4 border-black bg-black duration-150 ease-in-out focus-within:outline focus-within:outline-gold/50">
      <div className="flex h-full w-full items-center rounded-l bg-gold px-4">
        <Slider
          min={0}
          max={400}
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
      <label className="flex h-full items-center gap-1 rounded-r px-4 text-gold duration-150 ease-in-out focus-within:bg-gold focus-within:text-black">
        <input
          className="w-8 bg-black text-right duration-150 ease-in-out focus:bg-gold"
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
