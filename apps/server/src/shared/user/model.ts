import { getModelForClass, prop, index } from '@typegoose/typegoose';

@index({ email: 1 }, { unique: true })
export class User {
  @prop({ required: true })
  public email: string;

  @prop({ required: true })
  public password: string;
}

const UserModel = getModelForClass(User, { schemaOptions: { collection: 'users' } });

export default UserModel;
