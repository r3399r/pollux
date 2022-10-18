import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-10 bg-blue-300 px-4 flex items-center gap-4">
      <div className="cursor-pointer" onClick={() => navigate(Page.Landing)}>
        首頁
      </div>
      <div className="cursor-pointer" onClick={() => navigate(Page.Bank)}>
        題庫
      </div>
      <div className="cursor-pointer" onClick={() => navigate(Page.Question)}>
        題目
      </div>
      <div className="cursor-pointer" onClick={() => navigate(Page.Tag)}>
        標籤
      </div>
    </div>
  );
};

export default Navbar;
