import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { colors } from "../theme";

const CustomInput: React.FC<{
  isIconActive: boolean;
  shownIcon?: boolean;
  label: string;
  placeholder: string;
  value?: string;
  type?: string;
  onChange?: any;
  onIconClick?: any;
  invalidField: boolean
}> = ({ isIconActive, shownIcon, label, placeholder, value, type, onChange, onIconClick, invalidField }) => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">

        <Typography color="#3d4785" pb={1}>
          {label}
        </Typography>

        <Paper
          sx={{
            background: colors.input[500],
            width: "100%"
          }}
        >
          <InputBase
            placeholder={placeholder}
            fullWidth
            value={value}
            type={type}
            onChange={onChange}
            sx={{
              bgcolor: 'white',
              border: invalidField ? '3px solid red' : '1px solid #3d4785',
              p: 1,
              borderRadius: "5px",
            }}

            endAdornment={
              isIconActive && (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <IconButton edge="end" onClick={onIconClick}>

                    {!shownIcon && <VisibilityOff /> || <Visibility />}

                  </IconButton>
                </InputAdornment>
              )}
          />
        </Paper>
        {invalidField && <small style={{ color: 'red' }}>invalid field</small>}
      </Box>
    </Box>
  );
};

export default CustomInput;
