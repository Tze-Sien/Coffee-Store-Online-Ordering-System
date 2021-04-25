// React
import React from 'react';
// MUI

// import {makeStyles} from '@material-ui/core/styles';

// Utilities
import CategoryHeader from '../../components/Category/CategoryHeader';
import CategoryView from '../../components/Category/CategoryView';

export default function Home() {
  return (
    <CategoryHeader>
      <CategoryView />
    </CategoryHeader>
  );
}
