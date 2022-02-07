import React, {useState} from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';

export default function Tags() {
    // 백신 옵션
    const [selectedVal, setSelectedVal] = useState([])
    const VaccineOptions = [
        { title: '화이자' },
        { title: '모더나' },
        { title: '부스터샷' },
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
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                style={{backgroundColor: 'blue', color: '#fff'}}
                color="success"
                variant="filled"
                label={option.title}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
            />
          )}
        />
    );
}
