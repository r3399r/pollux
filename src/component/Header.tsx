import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IcArrow from 'src/image/ic-arrow-s.svg';
import StageMenu from './StageMenu';
import Body from './typography/Body';
import H2 from './typography/H2';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  const stage = localStorage.getItem('stage') ?? 'elementary';

  const switchStage = (stage: 'elementary' | 'junior-high' | 'senior-high') => {
    localStorage.removeItem('target');
    localStorage.setItem('stage', stage);
    navigate(`/${stage}`);
  };

  const getCurrentStageName = () => {
    if (stage === 'elementary') return '國小';
    if (stage === 'junior-high') return '國中';

    return '高中';
  };

  return (
    <div className="h-[70px] flex items-center justify-between md:justify-start border-b border-b-beige-500 gap-4 md:gap-20">
      <H2
        className="cursor-pointer"
        onClick={() => {
          localStorage.removeItem('target');
          navigate(`/${stage}`);
        }}
      >
        無限 ∞ 算術
      </H2>
      <button
        className={classNames('py-[6px] pl-4 pr-2 rounded-[40px] flex text-white md:hidden', {
          'bg-orange-500': stage === 'elementary',
          'bg-olive-500': stage === 'junior-high',
          'bg-haze-500': stage === 'senior-high',
        })}
        ref={ref}
        onClick={() => setMenuOpen(true)}
      >
        {getCurrentStageName()}
        <img src={IcArrow} />
      </button>
      <div className="hidden md:flex">
        <Body
          bold
          className={classNames('px-5 cursor-pointer py-6', {
            'text-navy-900 bg-beige-300': stage === 'elementary',
            'text-navy-300 hover:bg-beige-300': stage !== 'elementary',
          })}
          onClick={() => switchStage('elementary')}
        >
          國小數學
        </Body>
        <Body
          bold
          className={classNames('px-5 cursor-pointer py-6', {
            'text-navy-900 bg-beige-300': stage === 'junior-high',
            'text-navy-300 hover:bg-beige-300': stage !== 'junior-high',
          })}
          onClick={() => switchStage('junior-high')}
        >
          國中數學
        </Body>
        <Body
          bold
          className={classNames('px-5 cursor-pointer py-6', {
            'text-navy-900 bg-beige-300': stage === 'senior-high',
            'text-navy-300 hover:bg-beige-300': stage !== 'senior-high',
          })}
          onClick={() => switchStage('senior-high')}
        >
          高中數學
        </Body>
      </div>
      <StageMenu
        open={menuOpen}
        anchorEl={ref.current}
        onClose={() => setMenuOpen(false)}
        onClick={switchStage}
      />
    </div>
  );
};

export default Header;
