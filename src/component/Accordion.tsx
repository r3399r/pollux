import { AccordionDetails, AccordionSummary, Accordion as MuiAccordion } from '@mui/material';
import classNames from 'classnames';
import { SyntheticEvent, useMemo } from 'react';
import IcArrow from 'src/image/ic-arrow.svg';
import Body from './typography/Body';
import H4 from './typography/H4';

type Props = {
  summary: string;
  details: string[];
  current: string;
  onClickDetail: (detail: string) => void;
  expanded: boolean;
};

const Accordion = ({ summary, details, current, onClickDetail, expanded }: Props) => {
  const defaultExpanded = useMemo(
    () => localStorage.getItem(`accordion-${summary}`) === 'true' || expanded,
    [],
  );

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    localStorage.setItem(`accordion-${panel}`, isExpanded ? 'true' : 'false');
  };

  return (
    <MuiAccordion
      disableGutters
      classes={{ root: '!bg-olive-500 !border-0 before:!bg-olive-500' }}
      defaultExpanded={defaultExpanded}
      elevation={0}
      onChange={handleChange(summary)}
    >
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
            onClick={() => onClickDetail(v)}
          >
            {v}
          </Body>
        </AccordionDetails>
      ))}
    </MuiAccordion>
  );
};

export default Accordion;
