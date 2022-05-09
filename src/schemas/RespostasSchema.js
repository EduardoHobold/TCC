export const RespostasSchema = {
    name: 'Respostas',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', indexed: true },
        nome: 'string',
        tipo: 'string',
        resultado: { type: 'list', objectType: 'resultado'},
    },
}

export const resultadoSchema = {
    name: 'resultado',
    properties: {
        id: 'int',
        acerto: 'bool',
        tempo: 'int',
    }
}


