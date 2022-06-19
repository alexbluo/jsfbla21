import Slider from "rc-slider";

export default function SliderInput({
  inputRef,
  value,
  handleSliderChange,
  handleSliderAfterChange,
  handleInputChange,
}) {
  return (
    <div className="flex h-16 w-full shrink-0 items-center gap-[1px] rounded-md border border-white bg-white duration-150 ease-in-out focus-within:outline focus-within:outline-4 focus-within:outline-white/50">
      <div className="flex h-full w-full items-center rounded-l-md bg-red px-4">
        <Slider
          min={0}
          max={200}
          value={value}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange}
          railStyle={{
            backgroundColor: "red",
            height: 3,
            marginTop: 1,
          }}
          trackStyle={{
            backgroundColor: "white",
            height: 3,
            marginLeft: -1,
            marginTop: 1,
          }}
          handleStyle={{
            height: 15,
            width: 15,
            borderColor: "white",
            backgroundColor: "white",
            boxShadow: "none",
          }}
        />
      </div>
      <div className="flex h-full items-center gap-1 rounded-r bg-red px-4 text-white">
        <input
          ref={inputRef}
          className="w-8 bg-red text-right text-white"
          type="number"
          min={0}
          max={400}
          value={value}
          onChange={handleInputChange}
        />
        km
      </div>
    </div>
  );
}
