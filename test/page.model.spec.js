// describe('A test category', function () {
//   describe('A subcategory', function () {
//     it('tests something');
//     it('tests another aspect of the same thing');
//   });
//   describe('A different subcategory');
// });
// describe('A different category');
var models = require('../models');
var Page = models.Page;
var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
chai.use(spies);


describe('Page model', function () {

  describe('Virtuals', function () {

    var page;
    beforeEach(function () {
        console.log(Page);
        page = Page.build({
            title: 'bla bla',
            content: 'blu',
            status: 'open',
            tags: 'several words'
        });
        console.log('random string');
    });

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
        page.urlTitle = "bla_bla";
        expect(page.route).to.eql('/wiki/bla_bla');
      });
      // page.save().then( function(param) {
      //   console.log(param);
      // });
      //page.urlTitle = "the_title";
      //expect(page.route()).to.eql('bla_bla');
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML');
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
