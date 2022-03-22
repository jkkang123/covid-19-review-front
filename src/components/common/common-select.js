import React, {useState} from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './common-select.scss';
import '../../App.scss';

export default function Tags({ onChange }) {
    // 백신 옵션
    const VaccineOptions = [
        { title: '화이자', class:'pfizer' },
        { title: '모더나', class:'moderna' },
        { title: '부스터샷', class:'booster' },
    ];
  
    return (
        <Autocomplete
          multiple
          id="size-small-outlined-multi"
          options={VaccineOptions}
          getOptionLabel={(option) => option.title}
          defaultValue={[VaccineOptions[0]]}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          filterSelectedOptions
          onChange = {onChange}
          sx={{
            maxWidth:'33.33%',
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                color="primary"
                variant="filled"
                label={option.title}
                // className={option.class}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
            />
          )}
        />
    );
}
