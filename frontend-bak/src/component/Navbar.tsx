import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Logo from 'src/image/logo.png';
import Drawer from './Drawer';
import style from './Navbar.module.scss';

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <div className={style.self}>
        <div className={style.menu} onClick={toggleDrawer}>
          <MenuIcon />
        </div>
        <div className={style.logo}>
          <img alt="" role="presentation" src={Logo} />
          <div>GEMINI</div>
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer} />
    </>
  );
};

export default Navbar;
