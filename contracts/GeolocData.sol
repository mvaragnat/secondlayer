pragma solidity ^0.4.2;
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract GeolocData is Ownable {

  // Location strucs represents lat/long coordinates, + the owner of that location
  struct Location {
    uint latitude;
    uint longitude;
  }

  Location[] public locations;

  /* mapping (uint => address) public geolocToOwner; */
  /* mapping (address => uint) public ownerToGeolocs; */

  // only the owner of the contract can call this function
  function addLocation(uint _latitude, uint _longitude) public onlyOwner {
    locations.push(Location(_latitude, _longitude));
  }

  // public helper, for testing purposes
  function getCount() public view returns (uint) {
     return locations.length;
  }

  // public getter, returning the full array of locations
  /* function getLocations() public view returns (Location[]) {
     return locations;
  } */

  // getter used by web3
  function getLocation(uint _index) public view returns (uint, uint) {
    return (locations[_index].latitude, locations[_index].longitude);
  }
}
