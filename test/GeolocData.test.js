// Specifically request an abstraction for MetaCoin
var GeolocData = artifacts.require("GeolocData");

contract('GeolocData', function(accounts) {
  let geolocData;
  let geolocDataInstance;

  beforeEach(function () {
    geolocData = GeolocData.deployed();
  });

  it('should have a getCount function', function() {
    geolocData.then(function(instance) {
      geolocDataInstance = instance

      return geolocDataInstance.getCount.call();
    }).then(function(count) {
      assert.equal(count, 0, "0 locations initially");
    });
  })

  it('should allow owner to add location', function() {
    geolocData.then(function(instance) {
      geolocDataInstance = instance

      return geolocDataInstance.addLocation(10, 20);
    }).then(function() {
      return geolocDataInstance.getCount.call();
    }).then(function(count) {
      assert.equal(count, 1, "1 location added");
    });
  })

  it('should has a getLocation helper', function() {
    geolocData.then(function(instance) {
      geolocDataInstance = instance
      return geolocDataInstance.getLocation(0)
    }).then(function(location){
      // console.log(location)
      var latitude = location[0]
      var longitude = location[1]
      assert.equal(latitude, 10, 'It has the right latitude');
      assert.equal(longitude, 20, 'It has the right longitude');
    })
  })

  it('should not allow other users to add location', function() {
    geolocData.then(function(instance) {
      geolocDataInstance = instance

      return geolocDataInstance.addLocation(10, 20, { from: accounts[1] });
    }).catch(function(error) {
      assert.isAbove(error.message.search('revert'), -1, 'Error containing "revert" must be returned');
    });
  })

  // it('should have a getLocations helper', function() {
  //   geolocData.then(function(instance) {
  //     geolocDataInstance = instance
  //
  //     return geolocDataInstance.getLocations.call();
  //   }).then(function(locations) {
  //     assert.equal(locations.length, 1, 'It returns an array of locations');
  //     assert.equal(locations[0].latitude, 10, 'It has the right latitude');
  //     assert.equal(locations[0].longitude, 20, 'It has the right longitude');
  //   });
  // })
})
