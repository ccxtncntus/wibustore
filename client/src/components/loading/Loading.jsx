import './loading.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { tailChase } from 'ldrs';
tailChase.register(); // Default values
import { trio } from 'ldrs';

trio.register();

const Loading = () => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
      <div className="loading">
        {/* <l-tail-chase
          size="44"
          speed="1.75"
          color="rgb(109, 156, 198)"
        ></l-tail-chase> */}
        <l-trio size="44" speed="1.3" color="rgb(109, 156, 198)"></l-trio>
      </div>
    </>
  );
};

export default Loading;
