Mankind has discovered that the fabric of reality, in certain precise locations,
splits in two. While most people live their everyday lives in the main layer, some people
are able to see and interact in a "second layer", superimposed to the first.

Nobody really knows how reality splits in two, and why it does so only at these locations, but the first explorers
of the alternate reality have already started to stake claims. Some of them have even discovered how to
interact with the second layer, and install images, signs and works of art in the locations they own, for other explorers to see.

Come and see by yourself... Welcome to the world of

# Second Layer

*Principles*
1) A list of coordinates, managed by the contract owner, represent the known locations in the world where the Second Layer can be seen. Each latitude/longitude pair actually represents a 50m circle : two locations cannot be closer than 100m. Additional coordinates can be added by the contract owner, as new locations are discovered (do they pre-exist and are discovered, or do they appear over time? Nobody knows).

2) Each location has an owner (initially, the contract owner). They can be placed into an auction by their owner. An auction is always 48h long. The owner decides the minimum price for the auction, and bids must be 10% higher than the last bid. If at least one bid was placed, at the end of the 48h the auction is successfully completed, and the location ownership is changed. A 1% fee is paid from the auction amount to the contract owner, the rest is credited to the seller.

3) Each location can receive a piece of content (2D image or 3D structure), linked as an IPFS hash. The content can be changed only by the location owner, and is reset when an auction is successfully completed.

4) The list of location, their owner, and their content, is public. This means that anybody can create a read-only client to visualize the Second Layer : Google Maps, geolocalized AR mobile apps, full VR, etc... The auction generation/bid should also be accessible, so complete clients should also be feasible.

*Architecture*
* One master contract GeolocData defines the Geoloc struct (lat, long), and the array of Geolocs. It has a function to add a new Geoloc (restricted to Admin), and a helper to return all Geolocs. Also, lists mappings of locations to owner, owner to owned locations, and can retrieve the locations owned by one user

* A contract GeolocAuction allows users to list their locations for auction, bid on someone else's auction, transfer ownership when auction is complete (and transfer funds to seller and fee to contract owner), and retrieve the list of open/all auctions

* A contract (GeolocContent) should allow the Geoloc owner to add an IPFS content file (and reset it when auction is complete)
