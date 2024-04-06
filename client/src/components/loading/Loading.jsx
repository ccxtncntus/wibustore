import './loading.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { tailChase } from 'ldrs';
tailChase.register(); // Default values

const Loading = () => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
      <div className="loading">
        <l-tail-chase
          size="44"
          speed="1.75"
          color="rgb(109, 156, 198)"
        ></l-tail-chase>
      </div>
    </>
  );
};

export default Loading;
