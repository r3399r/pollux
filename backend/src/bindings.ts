import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Container } from 'inversify';
import 'reflect-metadata';
import { BankAccess } from './access/BankAccess';
import { BankQuestionAccess } from './access/BankQuestionAccess';
import { BankUserAccess } from './access/BankUserAccess';
import { QuestionAccess } from './access/QuestionAccess';
import { QuestionTagAccess } from './access/QuestionTagAccess';
import { TagAccess } from './access/TagAccess';
import { UserUserAccess } from './access/UserUserAccess';
import { ViewBankAccess } from './access/ViewBankAccess';
import { ViewQuestionAccess } from './access/ViewQuestionAccess';
import { BankService } from './logic/BankService';
import { ConnectService } from './logic/ConnectService';
import { QuestionService } from './logic/QuestionService';
import { TagService } from './logic/TagService';
import { VariableService } from './logic/VariableService';
import { BankEntity } from './model/entity/BankEntity';
import { BankQuestionEntity } from './model/entity/BankQuestionEntity';
import { BankUserEntity } from './model/entity/BankUserEntity';
import { QuestionEntity } from './model/entity/QuestionEntity';
import { QuestionTagEntity } from './model/entity/QuestionTagEntity';
import { TagEntity } from './model/entity/TagEntity';
import { UserUserEntity } from './model/entity/UserUserEntity';
import { ViewBankEntity } from './model/viewEntity/ViewBankEntity';
import { ViewQuestionEntity } from './model/viewEntity/ViewQuestionEntity';
import { Database, dbEntitiesBindingId } from './util/Database';

const container: Container = new Container();

container.bind<Database>(Database).toSelf().inSingletonScope();

// bind repeatedly for db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(BankEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(BankQuestionEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(BankUserEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(QuestionEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(QuestionTagEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TagEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(ViewBankEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(ViewQuestionEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(UserUserEntity);

// db access for tables
container.bind<BankAccess>(BankAccess).toSelf();
container.bind<BankQuestionAccess>(BankQuestionAccess).toSelf();
container.bind<BankUserAccess>(BankUserAccess).toSelf();
container.bind<QuestionAccess>(QuestionAccess).toSelf();
container.bind<QuestionTagAccess>(QuestionTagAccess).toSelf();
container.bind<TagAccess>(TagAccess).toSelf();
container.bind<ViewBankAccess>(ViewBankAccess).toSelf();
container.bind<ViewQuestionAccess>(ViewQuestionAccess).toSelf();
container.bind<UserUserAccess>(UserUserAccess).toSelf();

// service
container.bind<BankService>(BankService).toSelf();
container.bind<ConnectService>(ConnectService).toSelf();
container.bind<QuestionService>(QuestionService).toSelf();
container.bind<TagService>(TagService).toSelf();
container.bind<VariableService>(VariableService).toSelf();

// AWS
container
  .bind<CognitoIdentityServiceProvider>(CognitoIdentityServiceProvider)
  .toDynamicValue(() => new CognitoIdentityServiceProvider());

export { container as bindings };
