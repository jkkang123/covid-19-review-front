import { useState, useEffect } from 'react';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { green, blue, grey, red } from "@material-ui/core/colors";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const name1 = [
  '전체', 
  '화이자',
  '얀센',
  '아스트라제네카',
  '모더나',
  '부스터',
  '백신 새로 추가 업데이트 할거임',
];

const names2 = [
    '날짜순', 
    '인기순',
];

export default function SelectBox({ vaccine, status }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [color, setColor] = useState();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  function ColorHandler(e) {
    console.log(e.target.label);
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">
            {
                vaccine
                ? '백신'
                : '정렬'
            }
        </InputLabel>

        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} color={color}/>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {( vaccine ? name1 : names2 ).map((name) => (
            <MenuItem
              key={name}
              value={name}
              onClick={ColorHandler}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
