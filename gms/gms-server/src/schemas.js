// Add a validation schema for adding new Garden documents to the garden collection.
const addGardenSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 3, maxLength: 100 },
        location: { type: 'string', minLength: 1 },
        description: { type: 'string', maxLength: 500 },
        dateCreated: { type: 'string', pattern: '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$' }
    },

    required: ['name', 'location'],
    additionalProperties: false
};

module.exports = {
    addGardenSchema
};