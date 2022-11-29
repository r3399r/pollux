import { MathJax } from 'better-react-mathjax';
import CelestialBody, { Props as BodyProps } from 'src/celestial-ui/component/typography/Body';

type Props = BodyProps & {
  mathJax?: boolean;
};

const Body = ({ mathJax = false, ...props }: Props) =>
  mathJax ? (
    <MathJax>
      <CelestialBody {...props} />
    </MathJax>
  ) : (
    <CelestialBody {...props} />
  );

export default Body;
