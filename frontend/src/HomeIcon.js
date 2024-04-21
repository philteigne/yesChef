import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function HomeIcon(props) {
  return (
    <SvgIcon {...props} className="homeIcon">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

