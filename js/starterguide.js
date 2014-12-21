var map = L.map('map').setView([ 39.769113, -86.158895], 11);

		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 30,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-i875mjb7'
		}).addTo(map);

//left location for Messer Construction
  L.marker([ 39.896091, -86.048474] ).addTo(map)
			 .bindPopup("<b>Messer Construction</b><br />Left this location.");


//moved to this new location
  L.marker([ 39.769113, -86.158895]).addTo(map)
      .bindPopup("<b>Messer Construction</b><br />Moved to CBD.");


//start line animaiton script
//
if (map.tap) map.tap.disable();

// Transform the short [lat,lng] format in our
// data into the {x, y} expected by arc.js.
function obj(ll) { return { y: ll[0], x: ll[1] }; }

for (var i = 0; i < pairs.length; i++) {
  // Transform each pair of coordinates into a pretty
  // great circle using the Arc.js plugin, as included above.
  var generator = new arc.GreatCircle(
    obj(pairs[i][0]),
    obj(pairs[i][1]));
    var line = generator.Arc(100, { offset: 10 });
    // Leaflet expects [lat,lng] arrays, but a lot of
    // software does the opposite, including arc.js, so
    // we flip here.
    var newLine = L.polyline(line.geometries[0].coords.map(function(c) {
      return c.reverse();
    }), {
      color: '#bc141a',
      weight: 5,
      opacity: 1.0
    })
    .addTo(map);
    var totalLength = newLine._path.getTotalLength();
    newLine._path.classList.add('path-start');
    // This pair of CSS properties hides the line initially
    // See http://css-tricks.com/svg-line-animation-works/
    // for details on this trick.
    newLine._path.style.strokeDashoffset = totalLength;
    newLine._path.style.strokeDasharray = totalLength;
    // Offset the timeout here: setTimeout makes a function
    // run after a certain number of milliseconds - in this
    // case we want each flight path to be staggered a bit.
    setTimeout((function(path) {
      return function() {
        // setting the strokeDashoffset to 0 triggers
        // the animation.
        path.style.strokeDashoffset = 0;
      };
    })(newLine._path), i * 100);
  }
