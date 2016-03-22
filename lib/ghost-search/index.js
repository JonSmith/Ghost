var lunr = require("lunr");

var idx = lunr(function () {
  this.ref('id');
  this.field('title', { boost: 10 });
  this.field('meta-description');
});

var allDocuments;

// load up the index
exports.load = function(docs) {
    allDocuments = docs;
    var loaded = 0;
    docs.forEach(function(doc) {
       idx.add(doc);
       loaded = loaded + 1; 
    });
    return loaded;
};

// run search
exports.search = function(term) {
    var results = idx.search(term).map(function(result) {
        var selection = allDocuments.filter(function(filtered) {
            return filtered.id === parseInt(result.ref, 10)
        });
        return selection[0];
    });
    //console.log(allDocuments);
    //console.log(allDocuments.length);
    //console.log(term);
    //console.log(results);
    return results;
};