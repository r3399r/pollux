import randomColor from 'randomcolor';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'src/component/celestial-ui/Button';
import H1 from 'src/component/celestial-ui/typography/H1';
import { RootState } from 'src/redux/store';
import { loadTagList } from 'src/service/tagService';

const Tag = () => {
  const { tagList } = useSelector((rootState: RootState) => rootState.tag);

  useEffect(() => {
    loadTagList();
  }, []);

  return (
    <>
      <H1>標籤清單</H1>
      <Button className="my-3">新增標籤</Button>
      {tagList?.map((v) => {
        const bgColor = randomColor({ seed: v.id, luminosity: 'light' });

        return (
          <div
            key={v.id}
            className={'my-2 p-3 rounded text-navy-900'}
            style={{ background: bgColor }}
          >
            {v.name}
          </div>
        );
      })}
    </>
  );
};

export default Tag;
