var Datastore = require('../index');

var db = new Datastore({ inMemoryOnly: true });

db.loadDatabase(function (err) {
  if (err) { throw err; }

  db.insert({ email: 'hello@example.com', plan: 'free' }, function (insertErr) {
    if (insertErr) { throw insertErr; }

    db.findOne({ email: 'hello@example.com' }, function (findErr, doc) {
      if (findErr) { throw findErr; }

      db.update({ email: 'hello@example.com' }, { $set: { plan: 'pro' } }, {}, function (updateErr) {
        if (updateErr) { throw updateErr; }

        db.findOne({ email: 'hello@example.com' }, function (findUpdatedErr, updatedDoc) {
          if (findUpdatedErr) { throw findUpdatedErr; }

          db.remove({ email: 'hello@example.com' }, {}, function (removeErr, numRemoved) {
            if (removeErr) { throw removeErr; }

            console.log('Created:', doc);
            console.log('Updated:', updatedDoc);
            console.log('Removed count:', numRemoved);
          });
        });
      });
    });
  });
});
