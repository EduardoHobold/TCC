export default class RespostasSchema {
    static schema = {
        name: 'Respostas',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true },
            nome: 'string',
            resultado: {type: 'list', objectType: 'Resultado'},
        },
    };
}

const Resultado = {
    name: 'Resultado',
    properties: {
        id: 'int',
        acerto: 'bool',
        tempo: 'int',
    }
}
