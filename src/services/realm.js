import Realm from 'realm';

import RespostasSchema from '../schemas/RespostasSchema'
import Resultado from '../schemas/RespostasSchema'

export default function getRealm() {
  return Realm.open({
    schema: [RespostasSchema, Resultado],
  });
}