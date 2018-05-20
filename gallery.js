function main(){	
 (function() {
    var params = {
        method: "flickr.photosets.getPhotos",
        api_key: "36d3b946f1eae4d880795e1d00294d5e",
        photoset_id: "72157630574188450",
        format: "json",
        nojsoncallback: "?"
    };
    var request = buildURL("https://api.flickr.com/services/rest/", params);
    console.log(request);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			var photoSet = JSON.parse(xmlHttp.responseText);
			createThumbnailGallery(photoSet);
    }
    xmlHttp.open("GET", request, false); // true for asynchronous
    xmlHttp.send(null);
 })();

 function buildURL(url, params) {
    var request = url;
    var keys = Object.keys(params);
    var length = keys.length;
    for(var i = 0; i < length; ++i) {
        var key = keys[i];
        if(i == 0) request += "?";
        request += "&" + key + "=" + params[key];
    }
    return request;
 }

 function buildThumbnailUrl(photo) {
      return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
      '/' + photo.id + '_' + photo.secret + '_q.jpg';
 }

 function createThumbnailGallery(photoSet) {
	  var photos = photoSet.photo;
      document.getElementsByClassName('thumbnails')[0].textContent = '';
      var image, link, listItem;
      for (var i = 0; i < 18; i++) {
         image = document.createElement('img');
         image.src = buildThumbnailUrl(photos[i]);
         image.className = 'thumbnail';
         image.alt = photos[i].title;
         image.title = photos[i].title;

         link = document.createElement('a');
         link.href = image.src;
         //link.addEventListener('click', clickHandler(i, this));
         link.appendChild(image);

         listItem = document.createElement('li');
         listItem.appendChild(link);

         document.getElementsByClassName('thumbnails')[0].appendChild(listItem);
      }
   }
 }