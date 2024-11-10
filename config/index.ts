import { PACKAGENAME, type ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  basename: `/${PACKAGENAME}/`,
  publicPath: `/${PACKAGENAME}/`,
  importOnDemand: {
    '@moneko/common': {
      transform: 'lib/${member}',
    },
    '@mui/material': {
      transform: '${member}',
    },
    '@mui/icons-material': {
      transform: '${member}',
    },
  },
};

export default conf;
