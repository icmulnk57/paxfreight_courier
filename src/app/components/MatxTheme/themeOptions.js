import { red } from '@mui/material/colors';
import { components } from './components';

const themeOptions = {
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 14,
    body1: { fontSize: '14px' },
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  status: { danger: red[500] },
  components: { ...components },
};

export default themeOptions;
