var fullText = require("../index");
var assert = require("assert");

var doc1 = {
    title: "I love Postgres but Lunr is just OK",
    meta_description: "This is a post about Postgres",
    id: 1
};
var doc2 = {
    title: "I like Chocolate, but Postgres is better",
    meta_description: "This is a post about Chocolate. Then maybe Postgres",
    id: 2
};
var docs = [doc1, doc2];

describe("Search loader", function() {
    var loaded = 0;
    before(function() {
        loaded = fullText.load(docs);
    });
    it("loaded 2 documents", function() {
        assert.equal(2, loaded);
    });
});

describe("Searching for common term", function() {
    var results = [];
    before(function() {
        results = fullText.search('postgres');
    });
    it("returns 2 documents", function() {
       assert.equal(2, results.length); 
    });
});

describe("Searching for uncommon term", function() {
    var results = [];
    before(function() {
        results = fullText.search('chocolate');
    });
    it("returns 1 document", function() {
       assert.equal(1, results.length); 
    });
});