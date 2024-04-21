import { AccordionDetails, AccordionSummary, Accordion as MuiAccordion } from '@mui/material';
import classNames from 'classnames';
import { SyntheticEvent, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
  const { stage } = useParams<{ stage: string; topic: string }>();
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
      classes={{
        root: classNames('!border-0', {
          '!bg-orange-500 before:!bg-orange-500': stage === 'elementary',
          '!bg-olive-500 before:!bg-olive-500': stage === 'junior-high',
          '!bg-haze-500 before:!bg-haze-500': stage === 'senior-high',
        }),
      }}
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
              'bg-beige-200': current === v,
              'text-white': current !== v,
              'text-orange-500': current === v && stage === 'elementary',
              'text-olive-500': current === v && stage === 'junior-high',
              'text-haze-500': current === v && stage === 'senior-high',
              'hover:bg-orange-700': current !== v && stage === 'elementary',
              'hover:bg-olive-700': current !== v && stage === 'junior-high',
              'hover:bg-haze-700': current !== v && stage === 'senior-high',
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
