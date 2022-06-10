import { Login } from '@mui/icons-material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import { List, ListItem, ListItemIcon, ListItemText, Drawer as MuiDrawer } from '@mui/material';
import { useNavigate } from 'react-router';
import { Page } from 'src/constant/Page';

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

const Drawer = ({ open, onClose }: DrawerProps) => {
  const navigate = useNavigate();

  const goto = (path: Page) => () => {
    navigate(path);
    onClose();
  };

  return (
    <MuiDrawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem button onClick={goto(Page.Landing)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'首頁'} />
        </ListItem>
        <ListItem button onClick={goto(Page.Student)}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary={'我是學生'} />
        </ListItem>
        <ListItem button onClick={goto(Page.Teacher)}>
          <ListItemIcon>
            <HistoryEduIcon />
          </ListItemIcon>
          <ListItemText primary={'我是老師'} />
        </ListItem>
        <ListItem button onClick={goto(Page.User)}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={'個人設定'} />
        </ListItem>
        <ListItem button onClick={goto(Page.Login)}>
          <ListItemIcon>
            <Login />
          </ListItemIcon>
          <ListItemText primary={'登入'} />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
