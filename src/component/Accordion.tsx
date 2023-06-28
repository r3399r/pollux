import { AccordionDetails, AccordionSummary, Accordion as MuiAccordion } from '@mui/material';
import classNames from 'classnames';
import IcArrow from 'src/image/ic-arrow.svg';
import Body from './typography/Body';
import H4 from './typography/H4';

type Props = {
  summary: string;
  details: string[];
  current: string;
};

const Accordion = ({ summary, details, current }: Props) => (
  <MuiAccordion disableGutters classes={{ root: '!bg-olive-500 !shadow-none' }}>
    <AccordionSummary
      expandIcon={<img src={IcArrow} />}
      sx={{ borderBottom: '1px', borderBottomColor: 'white', borderBottomStyle: 'solid' }}
      classes={{
        root: '!p-0 !h-[50px]',
        content: '!m-0',
      }}
    >
      <H4 className="text-white">{summary}</H4>
    </AccordionSummary>
    {details.map((v, i) => (
      <AccordionDetails key={i} classes={{ root: '!p-0 !my-[5px]' }}>
        <Body
          className={classNames('cursor-pointer py-[6px] px-5 rounded-md', {
            'bg-beige-200 text-olive-500': current === v,
            'text-white hover:bg-olive-700': current !== v,
          })}
        >
          {v}
        </Body>
      </AccordionDetails>
    ))}
  </MuiAccordion>
);

export default Accordion;
