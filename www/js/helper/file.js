/* global document, atob, Blob, Uint8Array */
import npmLoadImage from 'blueimp-load-image';

// will resolve canvas
export function loadImage(image, option) {
    return new Promise((resolve, reject) => npmLoadImage(image, resolve, option));
}

export function dataURItoBlob(dataURI, option = {type: 'image/jpeg'}) {
    const array = atob(dataURI.split(',')[1]).split('').map(char => char.charCodeAt(0));

    return new Blob([new Uint8Array(array)], option);
}

export function fromCanvasToAvatarFile(canvas) {
    return dataURItoBlob(canvas.toDataURL('image/jpeg', 0.8), {type: 'image/jpeg'});
}
