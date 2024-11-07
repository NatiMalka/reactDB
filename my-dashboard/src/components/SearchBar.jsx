import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="חיפוש..."
      onChange={(e) => onSearch(e.target.value)}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '4px',
          height: '36.5px',
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar; 