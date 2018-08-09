google.maps.event.addDomListener(window, 'load', initmap);
var map, infobox;

function initmap(){

  var mapOptions = {
    center :{
      lat: -41.286460,
      lng: 174.776236
    },
    zoom: 12,
  };


map = new google.maps.Map(document.getElementById('map'), mapOptions);

  AddAllMarkers();

  //
  // var marker = new google.maps.Marker({
  //   position: {
  //     lat: 59.913869,
  //     lng: 10.752245
  //   },
  //   map: map,
  // })






};


function AddAllMarkers(){
  $.ajax({
    url: 'data/markers.json',
    type: 'GET',
    dataType: 'JSON',
    success:function(markers){
      for(var i = 0; i < markers.length; i++) {
        $('#places').append("<div class='place'><h3>"+markers[i].place_name+"</h3></div><hr>")



        var image = {
          url: 'images/bunker2.png',
          size: new google.maps.Size(32, 32),
        }



        var marker = new google.maps.Marker({
          position: {
            lat: markers[i].lat,
            lng: markers[i].lng
          },
          title: markers[i].place_name,
          description: 'This is the description of the Marker',
          map: map,
          icon: image,
          animation: google.maps.Animation.DROP
        });

        markerClickEvent(marker);




      }
    },
    error:function(error){
      console.log("Error, somthing wen wrong, can't get the markers")
      console.log(error)
    }
  });
}


function markerClickEvent(marker){
  if(infobox){
    infobox.close();
  }


  infobox = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function(){
    infobox.setContent('<div><strong>'+marker.title+'</strong></div>');
    infobox.open(map, marker)
  });
}


function moveMap(maplat, maplng){
  var latlng = new google.maps.LatLng(maplat, maplng);
  map.panTo(latlng)
  map.setZoom(13)
}


$(document).on('click', '.place', function(){
  moveMap(markers[i].lat, markers[i].lng)
})

 






//END
