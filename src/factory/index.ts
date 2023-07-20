import { Factory, Type } from 'src/model/Common';
import add10 from './add10';
import add20 from './add20';
import completingTheSquare from './completingTheSquare';
import distributiveLaw from './distributiveLaw';
import factorization from './factorization';
import gcd from './gcd';
import lcm from './lcm';
import minus10 from './minus10';
import minus20 from './minus20';
import multipleFormula1 from './multipleFormula1';
import multipleFormula2 from './multipleFormula2';
import multipleFormula2Ex from './multipleFormula2Ex';
import primeFactorization from './primeFactorization';
import rationalize from './rationalize';
import rectArea from './rectArea';
import scientificNotation1 from './scientificNotation1';
import scientificNotation2 from './scientificNotation2';
import simplifyRadical from './simplifyRadical';
import timesTable from './timesTable';

const factory: Factory = {
  [Type.Add10]: add10,
  [Type.Minus10]: minus10,
  [Type.Add20]: add20,
  [Type.Minus20]: minus20,
  [Type.TimesTable]: timesTable,
  [Type.RectArea]: rectArea,
  [Type.Gcd]: gcd,
  [Type.Lcm]: lcm,
  [Type.ScientificNotation1]: scientificNotation1,
  [Type.ScientificNotation2]: scientificNotation2,
  [Type.Factorization]: factorization,
  [Type.PrimeFactorization]: primeFactorization,
  [Type.SimplifiyRadical]: simplifyRadical,
  [Type.Rationalize]: rationalize,
  [Type.DistributiveLaw]: distributiveLaw,
  [Type.MultipleFormula1]: multipleFormula1,
  [Type.MultipleFormula2]: multipleFormula2,
  [Type.MultipleFormula2Ex]: multipleFormula2Ex,
  [Type.CompletingTheSquare]: completingTheSquare,
};

export default factory;
