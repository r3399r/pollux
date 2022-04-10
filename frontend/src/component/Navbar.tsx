import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';
import { Page } from 'src/constant/Page';
import Logo from 'src/image/logo.png';
import style from './Navbar.module.scss';

const Navbar = () => {
  const navigate = useNavigate();

  const goto = (path: Page) => () => {
    navigate(path);
  };

  return (
    <div className={style.self}>
      <div className={style.logo}>
        <div onClick={goto(Page.Landing)} role="button">
          <img alt="" role="presentation" src={Logo} />
          <div>GEMINI</div>
        </div>
      </div>
      <div className={style.pages}>
        <HistoryEduIcon />
        <PersonIcon onClick={goto(Page.User)} />
      </div>
    </div>
  );
};

export default Navbar;
