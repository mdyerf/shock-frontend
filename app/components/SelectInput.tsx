import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

type SelectInputProps = SelectProps & {
  label: string;
  items: { id: string | number; name: string }[];
};

function SelectInput({ label, items, ...props }: SelectInputProps) {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <Select labelId={`select-label-${label}`} {...props}>
        <MenuItem value="">
          <em>--None--</em>
        </MenuItem>
        {items.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
