import Slider from "rc-slider";

const SliderInput = ({
  value,
  onSliderChange,
  onSliderAfterChange,
  onInputChange,
}) => {
  return (
    <div className="flex h-16 w-full items-center gap-1 rounded-md border-4 border-black bg-black">
      <div className="flex h-full w-full items-center rounded-l bg-gold px-4">
        <Slider
          min={0}
          max={300}
          value={value}
          onChange={onSliderChange}
          onAfterChange={onSliderAfterChange}
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
      <label className="flex h-full gap-1 rounded px-4 text-gold brightness-90 focus-within:brightness-100">
        <input
          className="my-auto w-8 rounded bg-black text-right"
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
