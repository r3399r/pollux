import { bindings as celestialBindings } from '@y-celestial/service';
import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { UserService } from './logic/UserService';
import { TokenModel } from './model/entity/Token';
import { UserModel } from './model/entity/User';

const container: Container = new Container();

container.bind<TokenModel>(TokenModel).toSelf();
container.bind<UserModel>(UserModel).toSelf();

container.bind<UserService>(UserService).toSelf();

const mergedContainer: interfaces.Container = Container.merge(
  container,
  celestialBindings
);

export { mergedContainer as bindings };
