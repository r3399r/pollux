import { OutputBlockData } from '@editorjs/editorjs';
import style from './QuestionPreview.module.scss';

type QuestionPreviewProps = {
  blocks?: OutputBlockData[];
  className?: string;
};

const QuestionPreview = ({ blocks, className }: QuestionPreviewProps) => (
  <div className={className}>
    {blocks &&
      blocks.map((v, i) => {
        // type should be paragraph and table in current version
        if (v.type === 'paragraph')
          return <p key={i} dangerouslySetInnerHTML={{ __html: v.data.text }} />;
        else
          return (
            <div key={i} className={style.table}>
              <table>
                {v.data.withHeadings === true && (
                  <thead>
                    <tr>
                      {v.data.content[0] &&
                        v.data.content[0].map((c: string, idx: number) => <th key={idx}>{c}</th>)}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {v.data.withHeadings == false && (
                    <tr>
                      {v.data.content[0] &&
                        v.data.content[0].map((c: string, idx: number) => <td key={idx}>{c}</td>)}
                    </tr>
                  )}
                  {v.data.content.slice(1).map((r: string[], idx: number) => (
                    <tr key={idx}>
                      {r.map((c: string, idxx: number) => (
                        <td key={idxx}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
      })}
  </div>
);

export default QuestionPreview;
