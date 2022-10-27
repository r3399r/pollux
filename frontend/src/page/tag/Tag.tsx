import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/component/celestial-ui/Button';
import H1 from 'src/component/celestial-ui/typography/H1';
import { RootState } from 'src/redux/store';
import { openSnackbar } from 'src/redux/uiSlice';
import { loadTagList } from 'src/service/tagService';
import ModalDeleteTag from './ModalDeleteTag';
import ModalEditTag from './ModalEditTag';
import ModalNewTag from './ModalNewTag';

const Tag = () => {
  const dispatch = useDispatch();
  const { tagList } = useSelector((rootState: RootState) => rootState.tag);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>();
  const [deleteId, setDeleteId] = useState<string>();

  useEffect(() => {
    loadTagList().catch((err) => dispatch(openSnackbar(err.response.data.message)));
  }, []);

  return (
    <>
      <H1>標籤清單</H1>
      <Button className="my-3" onClick={() => setOpenNew(true)}>
        新增標籤
      </Button>
      {tagList?.map((v) => {
        const bgColor = randomColor({ seed: v.id, luminosity: 'dark' });

        return (
          <div
            key={v.id}
            className={'my-2 p-3 rounded-xl flex items-center'}
            style={{ background: bgColor }}
          >
            <div className="flex-1 font-bold text-white">{v.name}</div>
            <div className="flex gap-3">
              <Button appearance="default" onClick={() => setEditId(v.id)}>
                修改
              </Button>
              <Button appearance="error" onClick={() => setDeleteId(v.id)}>
                刪除
              </Button>
            </div>
          </div>
        );
      })}
      <ModalNewTag open={openNew} handleClose={() => setOpenNew(false)} />
      <ModalEditTag
        tagId={editId}
        open={editId !== undefined}
        handleClose={() => setEditId(undefined)}
      />
      <ModalDeleteTag
        tagId={deleteId}
        open={deleteId !== undefined}
        handleClose={() => setDeleteId(undefined)}
      />
    </>
  );
};

export default Tag;
