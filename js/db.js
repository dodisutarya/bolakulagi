var dbPromised = idb.open("bolakulagi", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "ID"
    });
    articlesObjectStore.createIndex("post_team", "post_team", { unique: false });
  });

  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }