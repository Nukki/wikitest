//console.log("i'm really funny");
var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
chai.use(spies);


describe('silly tests', function() {
  it('two plus two', function() {
    expect(2+2).to.eql(4);
  })
});

describe('async', function() {
  it('confirms setTimeout\'s timer accuracy', function (done) {
  var start = new Date();
  setTimeout(function () {
    var duration = new Date() - start;
    expect(duration).to.be.closeTo(1000, 50);
    done();
  }, 1000);
 });
});

describe('spy', function() {
  it('how many times forEachs parameter was called', function() {
    var theArr = [1, 2, 3, 4];
    var ourFunction = function(num) {
      console.log(num);
    };
    ourFunction = chai.spy(ourFunction);
    theArr.forEach(ourFunction);
    expect(ourFunction).to.have.been.called.exactly(4);
  })
});

describe('confirmation', function() {
  it('max passes', function() {

  });
});
