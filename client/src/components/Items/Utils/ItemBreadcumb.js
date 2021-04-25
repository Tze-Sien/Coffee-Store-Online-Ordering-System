import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import {Link as RouterLink} from 'react-router-dom';
import {Typography} from '@material-ui/core';

export default function ItemBreadcumb({item, viewCoffee}) {
  return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
      <Breadcrumbs>
        {item && (
          <div>
            <Link color="inherit" onClick={viewCoffee} component={RouterLink} to="/coffee">
              <Typography color="secondary" display="inline">
                Back
              </Typography>
            </Link>
            /
            <Typography display="inline" color="inherit">
              {item.name}
            </Typography>
          </div>
        )}
      </Breadcrumbs>
    </Box>
  );
}
