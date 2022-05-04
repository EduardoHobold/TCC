import Realm from 'realm';

import { RespostasSchema, resultadoSchema } from '../schemas/RespostasSchema'

export default function getRealm() {
  return Realm.open({
    schema: [RespostasSchema, resultadoSchema],
  });
}