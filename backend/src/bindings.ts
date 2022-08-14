import { Container } from 'inversify';
import 'reflect-metadata';
import { BankAccess } from './access/BankAccess';
import { QuestionAccess } from './access/QuestionAccess';
import { QuestionTagAccess } from './access/QuestionTagAccess';
import { TagAccess } from './access/TagAccess';
import { ViewQuestionAccess } from './access/ViewQuestionAccess';
import { BankService } from './logic/BankService';
import { QuestionService } from './logic/QuestionService';
import { TagService } from './logic/TagService';
import { VariableService } from './logic/VariableService';
import { BankEntity } from './model/entity/BankEntity';
import { QuestionEntity } from './model/entity/QuestionEntity';
import { QuestionTagEntity } from './model/entity/QuestionTagEntity';
import { TagEntity } from './model/entity/TagEntity';
import { ViewQuestionEntity } from './model/viewEntity/ViewQuestionEntity';
import { Database, dbEntitiesBindingId } from './util/Database';

const container: Container = new Container();

container.bind<Database>(Database).toSelf().inSingletonScope();

// bind repeatedly forr db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(BankEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(QuestionEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(QuestionTagEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TagEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(ViewQuestionEntity);

// db access for tables
container.bind<BankAccess>(BankAccess).toSelf();
container.bind<QuestionAccess>(QuestionAccess).toSelf();
container.bind<QuestionTagAccess>(QuestionTagAccess).toSelf();
container.bind<TagAccess>(TagAccess).toSelf();
container.bind<ViewQuestionAccess>(ViewQuestionAccess).toSelf();

// service
container.bind<BankService>(BankService).toSelf();
container.bind<QuestionService>(QuestionService).toSelf();
container.bind<TagService>(TagService).toSelf();
container.bind<VariableService>(VariableService).toSelf();

export { container as bindings };
