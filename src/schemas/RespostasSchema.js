const RespostasSchema = {
    name: 'Respostas',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', indexed: true },
        nome: 'string',
        resultado: { type: 'list', objectType: 'resultado'},
    },
}

const resultadoSchema = {
    name: 'resultado',
    properties: {
        id: 'int',
        acerto: 'bool',
        tempo: 'int',
    }
}

export const MySchemas = [RespostasSchema, resultadoSchema];
