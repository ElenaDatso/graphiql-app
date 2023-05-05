import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, BottomNavigation, Divider } from '@mui/material';
import rs from '../../assets/svg/course.svg';
import classes from './Footer.module.scss';
import Box from '@mui/material/Box';
import Member from './components/Member/Member';

function Footer() {
  return (
    <BottomNavigation
      color="#c5c6c7"
      sx={{ backgroundColor: '#f1f1f1', height: '200px', px: '60px', paddingBottom: '30px' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Link
          to="https://rs.school/react/"
          className={classes['logo-link']}
          style={{ marginRight: 'auto', width: '150px', marginTop: 'auto' }}
        >
          <img src={rs} className={classes['logo-img']} />
        </Link>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
        >
          {' '}
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Typography
              variant="h5"
              sx={{ textTransform: 'capitalize', whiteSpace: 'nowrap', paddingRight: '17px' }}
            >
              The Team
            </Typography>
            <Box
              sx={{ width: 'inherit', borderBottom: '1px black solid', marginBottom: '5px' }}
            ></Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Member name={'Anubic29'} link={'https://github.com/Anubic29'} />
            <Member name={'Elian-cheng'} link={'https://github.com/Elian-cheng'} />
            <Member name={'Elenadatso'} link={'https://github.com/ElenaDatso'} />
            <Typography
              component="span"
              variant="body1"
              marginTop="auto"
              marginLeft="30px"
              paddingBottom="3px"
            >
              2023©
            </Typography>
          </Box>
        </Box>
      </Box>
    </BottomNavigation>
  );
}

export default Footer;
