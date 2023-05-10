// script.js
function applyWatermark() {
  var imageUploadInput = document.getElementById('imageUploadInput');
  var watermarkText = document.getElementById('watermarkTextInput').value;
  var position = document.getElementById('positionSelect').value;

  if (imageUploadInput.files && imageUploadInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function () {
              var canvas = document.getElementById('canvas');
              var context = canvas.getContext('2d');
              canvas.width = image.width;
              canvas.height = image.height;
              context.drawImage(image, 0, 0, canvas.width, canvas.height);
              context.font = 'bold 24px Arial';
              context.fillStyle = 'rgba(0, 0, 0, 0.5)';
              context.textAlign = getPositionAlign(position);
              context.textBaseline = getPositionBaseline(position);
              context.fillText(watermarkText, getPositionX(position, canvas.width, context.measureText(watermarkText).width), getPositionY(position, canvas.height));
              var downloadLink = document.getElementById('downloadLink');
              downloadLink.href = canvas.toDataURL('image/jpeg');
              downloadLink.style.display = 'block';
          };
      };
      reader.readAsDataURL(imageUploadInput.files[0]);
  }
}

function getPositionAlign(position) {
  if (position.includes('left')) {
      return 'start';
  } else {
      return 'end';
  }
}

function getPositionBaseline(position) {
  if (position.includes('top')) {
    return 'top';
    } else {
    return 'bottom';
    }
    }
    
    function getPositionX(position, canvasWidth, watermarkWidth) {
    if (position.includes('left')) {
    return 0;
    } else {
    return canvasWidth - watermarkWidth;
    }
    }
    
    function getPositionY(position, canvasHeight) {
    if (position.includes('top')) {
    return 24;
    } else {
    return canvasHeight - 24;
    }
    }
