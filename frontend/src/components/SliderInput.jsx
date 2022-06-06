import Slider from "rc-slider";

const SliderInput = ({
  value,
  onSliderChange,
  onSliderAfterChange,
  onInputChange,
}) => {
  return (
    <div className="flex h-16 w-full items-center gap-4">
      <Slider
        min={0}
        max={300}
        value={value}
        onChange={onSliderChange}
        onAfterChange={onSliderAfterChange}
        railStyle={{
          backgroundColor: "black",
          height: 3,
          marginTop: 1,
        }}
        trackStyle={{
          backgroundColor: "gold",
          marginLeft: -1,
        }}
        handleStyle={{
          height: 15,
          width: 15,
          borderColor: "gold",
          backgroundColor: "gold",
          boxShadow: "none",
        }}
      />
      <label className="flex h-full gap-2 rounded bg-white px-4 brightness-90 focus-within:brightness-100">
        <input
          className="my-auto w-6 rounded text-right"
          type="number"
          min={0}
          max={300}
          value={value}
          onChange={onInputChange}
        />
        <span className="my-auto">km</span>
      </label>
    </div>
  );
};

export default SliderInput;
