require('../helper');
const path = require('path');
const fs = require('fs-promise');

const decomposer = require('../../../component/html-decomposer');
const expect = require('chai').expect;

describe('Component', () => {
  describe('Html parser', () => {  
    it('should parse the html', async () => {
      const htmlPagePath = path.join(__dirname, '../../../../fixtures/pages/page.html');
      let page = await fs.readFile(htmlPagePath, 'utf8');
      
      let components = await decomposer(page);
      let json = JSON.stringify({components: components}, null, '  ');
      console.log('done', json);

      expect(components['myNavWrapper'].children.length).to.eql(2);
    });
  });
});

