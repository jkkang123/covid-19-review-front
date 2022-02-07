import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';
/*
export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: '#bddaff',
  }
}));
*/
const MyChip = (props) => {
  // const classes = useStyles();

  return (
      <Chip
        // className={classes.root}
        {...props}
        variant="outlined"
        color="primary"
      />
  );
};

export default function Tags() {
    // 백신 옵션
    const VaccineOptions = [
        { title: '전체' },
        { title: '화이자' },
        { title: '모더나' },
        { title: '부스터샷' },
    ];

    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            options={VaccineOptions}
            getOptionLabel={(option) => option.title}
            defaultValue={[VaccineOptions[0]]}
            filterSelectedOptions
            renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => (
                  <MyChip {...getTagProps({ index })} label={option.title} />
                ));
            }}
            renderInput={(params) => (
            <TextField
                {...params}
                label="백신"
            />
            )}
        />
    );
}
