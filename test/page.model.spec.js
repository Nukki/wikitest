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
var marked = require('marked');
var Promise = require('bluebird');
var chalk = require('chalk');
chai.use(spies);


describe('Page model', function () {
  describe('Virtuals', function () {

    var page;
    beforeEach(function () {
        page = Page.build({
            title: 'bla bla',
            content: 'This is a really interesting StRiNg!',
            status: 'open',
            tags: 'several words'
        });
    });

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function() {
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
      it('converts the markdown-formatted content into HTML', function() {
        var markedContent = marked(page.content);
        expect(page.renderedContent).to.eql(markedContent);
      });
    });

  });

  describe('Class methods', function () {

    beforeEach(function (done) {
      Page.create({
        title: 'Hi',
        content: 'Nikki',
        tags: ['This', 'blahblah']
      })
      .then(function () {
        done();
      })
      .catch(done);
    });

      afterEach(function(done) {
        Page.destroy({
          where: {
            title: "Hi",
            content: "Nikki",
            tags: ["This", "blahblah"]
          }
        })
      .then(function() {
        done();
      })
      .catch(done);
    });

    describe('findByTag', function () {
      it('gets pages with the search tag', function(done) {
        Page.findByTag("blahblah")
        .then(function(pagesOne) {
          expect(pagesOne).to.have.lengthOf(1);
          done();
        })
        .catch(done);
      });
      it('does not get pages without the search tag', function(done) {
        Page.findByTag("fkwajwfklwajfklawjfawlk")
        .then(function(pages) {
          expect(pages).to.have.lengthOf(0);
          done();
        })
        .catch(done);
      });
    });
  });

  describe('Instance methods', function () {

    var pOne, pTwo, pThree;
    var pageOne, pageTwo, pageThree;
    beforeEach(function (done) {
     pageOne = Page.create({
        title: 'Hi',
        content: 'Nikki',
        tags: ['This', 'blahblah']
      })


      pageTwo = Page.create({
        title: 'Hello',
        content: 'Clement',
        tags: ['Kappa', 'blahblah']
      })


      pageThree = Page.create({
        title: 'Haha',
        content: 'Hihi',
        tags: ['afwafw', 'afwafgwaga']
      })

     Promise.all([pageOne, pageTwo, pageThree])
      .spread(function(one, two, three) {
        pOne = one;
        pTwo = two;
        pThree = three;
        done();
      })
      .catch(done);

    });

      var destOne, destTwo, destThree;
      afterEach(function(done) {
        destOne = Page.destroy({
          where: {
            title: "Hi",
            content: "Nikki",
            tags: ["This", "blahblah"]
          }
        });

      destTwo = Page.destroy({
        where: {
          title: 'Hello',
          content: 'Clement',
          tags: ['Kappa', 'blahblah']
        }
      });

    destThree = Page.destroy({
      where: {
        title: 'Haha',
        content: 'Hihi',
        tags: ['afwafw', 'afwafgwaga']
      }
    });

       Promise.all([destOne, destTwo, destThree])
      .then(function (pages) {
        done();
      })
      .catch(done);

    });

    describe('findSimilar', function () {
      it('never gets itself', function(done) {
        pTwo.findSimilar()
        .then(function(page) {
          expect(page.map(function(currentPage) {
            return currentPage.id;
          }).indexOf(pTwo.id)).to.eql(-1);
          done();
        })
      });
      it('gets other pages with any common tags', function(done) {
        pTwo.findSimilar()
        .then(function(page) {
          expect(page).to.have.lengthOf(1);
          done();
        })
      });
      it('does not get other pages without any common tags', function(done) {
        pThree.findSimilar()
        .then(function(page) {
          expect(page).to.have.lengthOf(0);
          done();
        })
      });
    });
  });

  describe('Validations', function () {

    var page;
    beforeEach(function (done) {
      page = Page.build();
      page.status = "blah";
      page.save()
      .then(function(newPage) {
        done();
      })
      .catch(function(err) {
        done();
      })
    });

it('errors without title', function (done) {
  page.validate()
  .then(function (err) {
    expect(err).to.exist;
    expect(err.errors).to.exist;
    expect(err.errors[0].path).to.equal('title');
    done();
  });
});

    it('errors without content', function(done) {
      page.validate()
      .then(function (err) {
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[2].path).to.equal('content');
        done();
      });
    });

    it('errors given an invalid status', function(done) {
      page.validate()
      .then(function (err) {
        expect(err).to.exist;
        expect(err.errors).to.exist;
        done();
      })
      .catch(function(err) {
        done()
      })
    });
  });

  describe('Hooks', function () {

    var page;
    beforeEach(function () {
        page = Page.build({
            title: 'bla bla',
            content: 'This is a really interesting StRiNg!',
            status: 'open',
            tags: 'several words'
        });
    });

    it('it sets urlTitle based on title before validating', function() {
      console.log(chalk.magenta.bold.underline("ChAlK iS fAnCy!"))
      return page.save()
      .then(function(currentPage) {
        console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEE", chalk.cyan.bold.underline.inverse.italic(currentPage))
        expect(currentPage.urlTitle).to.exist;
      })
    });
  });

});
