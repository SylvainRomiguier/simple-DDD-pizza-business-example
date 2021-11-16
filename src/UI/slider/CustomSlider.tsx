import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/slider";

export const CustomSlider: React.FC<{
  label?: string;
  value: number;
  maxValue: number;
  minValue: number;
  step?: number;
  onChange: (value: number) => void;
}> = ({ label = "", value, maxValue, minValue, step = 1, onChange }) => (
  <div style={{padding: "20px"}}>
    {label}
    <Slider
      aria-label="slider"
      value={value}
      min={minValue}
      max={maxValue}
      step={step}
      onChange={onChange}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  </div>
);
