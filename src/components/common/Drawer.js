import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link, Route, Routes } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // 리스트 링크 셀렉터 linkToSelector
  const linkToSelector = (text) => {
    switch (text) {
      case '홈':
        return '/'
      case '접종 후기':
        return '/review'
      case '뉴스':
        return '/news'
      case '채팅':
        return '/chat'
      case '백신패스 Q & A':
        return '/faq'
      default :
        return true
    }
  }

  // 리스트 아이템 아이콘 셀렉터 iconSelector
  const iconSelector = (text) => {
    switch (text) {
      case '홈':
        return <HomeRoundedIcon color="primary"/> 
      case '접종 후기':
        return <RateReviewRoundedIcon color="primary"/>
      case '뉴스':
        return <ArticleRoundedIcon color="primary"/>
      case '채팅':
        return <ChatBubbleRoundedIcon color="primary"/>
      case '백신패스 Q & A':
        return <LiveHelpRoundedIcon color="primary"/>
      default :
        return true
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['홈', '접종 후기', '뉴스', '채팅', '백신패스 Q & A'].map((text, index) => (
          <Link to={ linkToSelector(text) } key={index} className="link">
            <ListItem button key={text}>
              <ListItemIcon>
                { iconSelector(text) }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuRoundedIcon 
              color="info" 
              sx={{ color:'#fff' }}
            />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}