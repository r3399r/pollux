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

  const switchStage = (stage: 'elementary' | 'junior-high' | 'senior-high') => {
    localStorage.removeItem('target');
    localStorage.setItem('stage', stage);
    navigate(`/${stage}`);
  };

  const getCurrentStage = () => {
    const stage = localStorage.getItem('stage') ?? 'elementary';
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
          const stage = localStorage.getItem('stage') ?? 'elementary';
          navigate(`/${stage}`);
        }}
      >
        無限 ∞ 算術
      </H2>
      <button
        className="py-[6px] pl-4 pr-2 rounded-[40px] bg-olive-700 flex text-white md:hidden"
        ref={ref}
        onClick={() => setMenuOpen(true)}
      >
        {getCurrentStage()}
        <img src={IcArrow} />
      </button>
      <div className="hidden md:flex">
        <Body
          bold
          className="px-5 cursor-pointer hover:bg-beige-300 leading-[70px]"
          onClick={() => switchStage('elementary')}
        >
          國小數學
        </Body>
        <Body
          bold
          className="px-5 cursor-pointer hover:bg-beige-300 leading-[70px]"
          onClick={() => switchStage('junior-high')}
        >
          國中數學
        </Body>
        <Body
          bold
          className="px-5 cursor-pointer hover:bg-beige-300 leading-[70px]"
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
