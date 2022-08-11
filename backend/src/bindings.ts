import { Container } from 'inversify';
import 'reflect-metadata';
import { QuestionAccess } from './access/QuestionAccess';
import { TagAccess } from './access/TagAccess';
import { QuestionService } from './logic/QuestionService';
import { TagService } from './logic/TagService';
import { VariableService } from './logic/VariableService';
import { QuestionEntity } from './model/entity/QuestionEntity';
import { TagEntity } from './model/entity/TagEntity';
import { Database, dbEntitiesBindingId } from './util/Database';

const container: Container = new Container();

container.bind<Database>(Database).toSelf().inSingletonScope();

// bind repeatedly forr db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(QuestionEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TagEntity);

// db access for tables
container.bind<QuestionAccess>(QuestionAccess).toSelf();
container.bind<TagAccess>(TagAccess).toSelf();

// service
container.bind<QuestionService>(QuestionService).toSelf();
container.bind<TagService>(TagService).toSelf();
container.bind<VariableService>(VariableService).toSelf();

export { container as bindings };
