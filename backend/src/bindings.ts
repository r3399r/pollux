import { bindings as celestialBindings } from '@y-celestial/service';
import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { BankService } from './logic/BankService';
import { QuestionService } from './logic/QuestionService';
import { UserService } from './logic/UserService';
import { BankModel } from './model/entity/Bank';
import { BankQuestionModel } from './model/entity/BankQuestion';
import { LabelModel } from './model/entity/Label';
import { QuestionModel } from './model/entity/Question';
import { TokenModel } from './model/entity/Token';
import { UserModel } from './model/entity/User';

const container: Container = new Container();

// model
container.bind<BankModel>(BankModel).toSelf();
container.bind<BankQuestionModel>(BankQuestionModel).toSelf();
container.bind<LabelModel>(LabelModel).toSelf();
container.bind<QuestionModel>(QuestionModel).toSelf();
container.bind<TokenModel>(TokenModel).toSelf();
container.bind<UserModel>(UserModel).toSelf();

// service
container.bind<BankService>(BankService).toSelf();
container.bind<QuestionService>(QuestionService).toSelf();
container.bind<UserService>(UserService).toSelf();

const mergedContainer: interfaces.Container = Container.merge(
  container,
  celestialBindings
);

export { mergedContainer as bindings };
