var Schemas = {};

Book = function() {};
Book.prototype.identifty = function() { console.log("im a book");};

Books = new Mongo.Collection('books', {
  transform: function(doc) {
    var newObj = new Book(doc);
    return newObj;
  },
});


Schemas.Book = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    author: {
        type: String,
        label: "Author"
    },
    cost: {
      type: Money,
      label: "Cost",
      optional: true,
    }
});

Books.attachSchema(Schemas.Book);


if (Meteor.isClient) {

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked

      var cost = new Money(100, 'USD');
      var book = { title: 'title', author: 'author', cost: cost};
      Books.insert(book, function(error, result) {
        if (error) {
          console.error("Insert failed: ", error);
        } else {
          console.log("Insert success!");
        }
      });
    }
  });
}

