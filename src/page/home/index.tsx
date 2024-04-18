import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from 'src/component/Menu';
import Body from 'src/component/typography/Body';
import H2 from 'src/component/typography/H2';
import IcMenu from 'src/image/ic-menu.svg';

const Home = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    const stage = localStorage.getItem('stage') ?? 'elementary';
    const target = localStorage.getItem('target');
    if (stage && target) navigate(`/${stage}/${target}`);
  }, []);

  return (
    <div className="flex pt-[30px]">
      <div className="hidden md:block h-[calc(100vh-170px)]">
        <Menu />
      </div>
      <div className="flex-1">
        <div className="box-content md:px-10 lg:max-w-[1024px] lg:mx-auto">
          <H2 className="hidden md:block mt-[30px] pb-7">給大家的話</H2>
          <div
            className="flex flex-wrap items-center cursor-pointer mt-0 md:mt-[30px] pb-7 md:hidden"
            onClick={() => setOpenMenu(true)}
          >
            <H2>給大家的話</H2>
            <img src={IcMenu} />
          </div>
          <div className="bg-white md:h-[calc(100vh-170px-92px)] overflow-y-auto rounded-[15px] p-[30px] flex flex-col gap-3">
            <Body className="flex md:hidden">
              如何開始：請點擊圖示 <img src={IcMenu} className="h-6" /> 以開啟題型選單
            </Body>
            <Body>
              這個網站的題目是透過隨機亂數出題，讓學生們練習固定算法的題型，不再因為找不到類似題目練習而苦惱。希望學生們不要再卡在乘法展開、配方、根號運算...諸如此類純算術的地方！
            </Body>
            <Body>醞釀許久，如今終於做出來了～</Body>
            <Body>之後會再擴充各式各樣能夠進行亂數出題的題型，也仰賴有需求的朋友們提供意見！</Body>
            <Body bold className="underline flex gap-3">
              <a href="https://github.com/r3399r/pollux" target="_blank" rel="noreferrer">
                Github
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100077482812173"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </Body>
          </div>
        </div>
      </div>
      <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
        <Menu isDrawer onCloseDrawer={() => setOpenMenu(false)} />
      </Drawer>
    </div>
  );
};

export default Home;
