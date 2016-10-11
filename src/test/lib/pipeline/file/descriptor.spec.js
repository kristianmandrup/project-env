require('../../helper');

const createDescriptor = require('../../../../pipeline/file/descriptor');
const expect = require('chai').expect;

describe('FileDescriptor', () => {  
  // before(() => {
  // });

  // after(() => {
  // })    

  describe('validate', () => {
    it('must have dest path specified', () => {
      // TODO: make it a class
      let descriptor = createDescriptor({
        action: 'move',
        paths: {
        }    
      });

      expect(descriptor.validate().result).to.eql(false);
      expect(descriptor.validate().messages[0]).to.eql('paths requires property "dest"');    
    });

    it('valid when dest path specified', () => {
      // TODO: make it a class
      let descriptor = createDescriptor({
        action: 'move',
        paths: {
          dest: 'some/where'
        }    
      });

      expect(descriptor.validate()).to.eql(true);    
    });
  });
});