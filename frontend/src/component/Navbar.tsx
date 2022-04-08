import { useNavigate } from 'react-router';
import { Page } from 'src/constant/Page';
import Logo from 'src/image/logo.png';
import style from './Navbar.module.scss';

const Navbar = () => {
  const navigate = useNavigate();

  const onPageClick = (path: Page) => () => {
    navigate(path);
  };

  return (
    <div className={style.self}>
      <div className={style.logo}>
        <div onClick={onPageClick(Page.Landing)} role="button">
          <img alt="" role="presentation" src={Logo} />
          <div>ALTARF 數學院</div>
        </div>
      </div>
      <div className={style.pages}>
        <div onClick={onPageClick(Page.Landing)} role="button">
          首頁
        </div>
      </div>
    </div>
  );
};

export default Navbar;
