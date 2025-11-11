function formatSize(sizebytes, prec) {
  sizebytes = parseInt(sizebytes);

  if ( prec == undefined ) prec = 1;
  // this has better performance since it is not accumulating rounding error
  if ( sizebytes >= 1099511627776 ){
    return (sizebytes / 1099511627776).toFixed(prec) + ' Tb';
  } else if (sizebytes >= 1073741824) {
    return (sizebytes / 1073741824).toFixed(prec) + ' Gb';
  } else if ( sizebytes >= 1048576 ){
    return (sizebytes / 1048576).toFixed(prec) + ' Mb';
  } else if ( sizebytes >= 1024 ){
    return (sizebytes / 1024).toFixed(prec) + ' Kb';
  } else{
    return (sizebytes).toFixed(prec) + ' B';
  }

  var size = sizebytes;
  size = size / 1024;
  if (size <= 1024)
    return size.toFixed(1) + ' Kb';
  size = size / 1024;
  if (size <= 1024)
    return size.toFixed(1) + ' Mb';
  size = size / 1024;
  if (size <= 1024)
    return size.toFixed(1) + ' Gb';
  size = size / 1024;
  if (size <= 1024)
    return size.toFixed(1) + ' Tb';
};

function formatDt(date) {
  return new Date(date).toLocaleDateString();
/*
  var d = new Date(date);
  return (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + (parseInt(d.getMonth()) < 9 ? '0' : '') + (d.getMonth() + 1) + '-' + d.getFullYear();
*/
};

function retinaImages() {
  var allImages = document.images;
  var detectedRetina = window.devicePixelRatio > 1;

  for (var i=0; i < allImages.length; i++) {
    if (allImages[i].getAttribute('data-src-retina')) {
      allImages[i].setAttribute('src',  allImages[i].getAttribute(detectedRetina ? 'data-src-retina' : 'data-src'));
    }
  }
};

$(function() {
  var dlc=directLinkData.content;
  var cont="";
  var path=directLinkData.code+directLinkData.dirpath;
  var iconFolder=window.devicePixelRatio > 1? '32': '16';

  retinaImages();

  for (i=0; i<dlc.length; i++) {
    cont+='<tr class="on">'+
          '<td class="item"><a href="/'+path+dlc[i].name+(dlc[i].size==undefined?'/':'')+'"><img src="//pcdn-filedn.pcloud.com/img/icons/'+iconFolder+'/'+dlc[i].icon+'.png" width="16" height="16" alt=""/><span>'+dlc[i].name+'</span></a></td>'+
              '<td class="modified">'+formatDt(dlc[i].modified)+'</td>'+
              '<td class="size">'+(dlc[i].size!=undefined?formatSize(dlc[i].size):'-')+'</td>'+
            '</tr>';
  }
  $("#dlcontent").append(cont);
});
