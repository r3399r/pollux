import { Container } from 'inversify';
import 'reflect-metadata';
import { QuestionAccess } from './access/QuestionAccess';
import { QuestionService } from './logic/QuestionService';
import { VariableService } from './logic/VariableService';
import { QuestionEntity } from './model/entity/QuestionEntity';
import { Database, dbEntitiesBindingId } from './util/Database';

const container: Container = new Container();

container.bind<Database>(Database).toSelf().inSingletonScope();

// bind repeatedly forr db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(QuestionEntity);

// db access for tables
container.bind<QuestionAccess>(QuestionAccess).toSelf();

// service
container.bind<QuestionService>(QuestionService).toSelf();
container.bind<VariableService>(VariableService).toSelf();

export { container as bindings };
