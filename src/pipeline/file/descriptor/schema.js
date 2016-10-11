export default {
  type: 'object',
  properties: {
    action: {
      type: 'string',
      enum: ['merge', 'move', 'remove', 'template', 'write']
    },
    paths: {
      type: 'object',
      properties: {
        src: {
          type: 'string'
        },          
        dest: {
          type: 'string'
        }        
      },
      required: ['dest']                  
    },
    content: {
      type: 'string'
    },
    template: {
      type: 'object',
      properties: {
        path: {
          type: 'string'
        },          
        data: {
          type: 'object'
        }
      }                          
    },
    meta: {
      type: 'object'
    }    
  },
  required: ['action', 'paths']
};
