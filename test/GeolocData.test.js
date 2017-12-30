// var i
// var deployed = GeolocData.deployed()
// deployed.then(function(instance){ i = instance })
// i.getCount()
// i.addLocation(10, 20).then(function(result){ return i.getCount() }).then(function(result){ console.log(result + "")});
// i.getLocation(0)
// i.getLocationIdsFromAddress(accounts[0]).then(function(result){ console.log(result) })

var GeolocData = artifacts.require("GeolocData");

contract('GeolocData', function(accounts) {
  let geolocData;
  let i;

  beforeEach(async function () {
    geolocData = await GeolocData.deployed().then(function(instance) {
      i = instance
    })
  });

  it('should have a getCount function', function() {
    i.getCount().then(function(count) {
      assert.equal(count, 0, "0 locations initially");
    });
  })

  it('should allow owner to add location', function() {
    i.addLocation(10, 20).then(function() {
      return i.getCount();
    }).then(function(count) {
      assert.equal(count, 1, "1 location added");
    });
  })

  it('should get the default value with getLocation', function() {
    i.getLocation(0).then(function(location){
      var latitude = location[0]
      var longitude = location[1]
      var artist = location[2]
      assert.equal(latitude, 10, 'It has the right latitude');
      assert.equal(longitude, 20, 'It has the right longitude');
      assert.equal(artist, accounts[0], 'It has the contract owner by default');
    })
  })

  it('should retrieve the location id for the owner', function() {
    i.getLocationIdsFromAddress(accounts[0]).then(function(ids) {
      var id = ids[0].toNumber()
      assert.equal(ids.length, 1, "1 location stored");
      assert.equal(id, 0, "id of first geoloc is 0");
    });
  })

  it('should not allow other users to add location', function() {
    i.addLocation(10, 20, { from: accounts[1] }).catch(function(error) {
      assert.isAbove(error.message.search('revert'), -1, 'Error containing "revert" must be returned');
    });
  })

  // it('should have a getLocations helper', function() {
  //   geolocData.then(function(instance) {
  //     geolocDataInstance = instance
  //
  //     return geolocDataInstance.getLocations.call();
  //   }).then(function(locations) {
  //     console.log('locations', locations)
  //     assert.equal(locations.length, 1, 'It returns an array of locations');
  //     assert.equal(locations[0].latitude, 10, 'It has the right latitude');
  //     assert.equal(locations[0].longitude, 20, 'It has the right longitude');
  //   });
  // })
})
