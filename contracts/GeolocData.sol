pragma solidity ^0.4.2;
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract GeolocData is Ownable {

  // Location strucs represents lat/long coordinates, + the owner of that location
  struct Location {
    uint latitude;
    uint longitude;
    address artist;
  }

  Location[] public locations;

  mapping (address => uint[]) artistsToGeolocs;

  // only the owner of the contract can call this function
  function addLocation(uint _latitude, uint _longitude) public onlyOwner {
    uint id = locations.push(Location(_latitude, _longitude, owner)) - 1;

    // add the location to the owner's array
    artistsToGeolocs[owner].push(id);
  }

  // public helper, for testing purposes
  function getCount() public view returns (uint) {
     return locations.length;
  }

  // public getter, returning the full array of locations
  function getLocations() public view returns (Location[]) {
     return locations;
  }

  function getLocationIdsFromAddress(address _address) public view returns (uint[]) {
     return artistsToGeolocs[_address];
  }

  // getter used by web3 for the details, once we know the array of interest
  function getLocation(uint _index) public view returns (uint latitude, uint longitude, address artist) {
    return (locations[_index].latitude, locations[_index].longitude, locations[_index].artist);
  }
}
