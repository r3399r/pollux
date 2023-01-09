import { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload/src/filerepository';
import { file2Base64 } from 'src/util/fileConverter';

export class MyUploadAdapter implements UploadAdapter {
  loader;
  url;
  xhr?: XMLHttpRequest;

  constructor(loader: FileLoader) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;

    // URL where to send files.
    this.url = '/api/image';
  }

  // Starts the upload process.
  async upload(): Promise<{ default: string }> {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        }),
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) this.xhr.abort();
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Authorization', localStorage.getItem('token') ?? '');
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve: any, reject: any, file: any) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${String(loader.file)}.`;

    xhr?.addEventListener('error', () => reject(genericErrorText));
    xhr?.addEventListener('abort', () => reject());
    xhr?.addEventListener('load', () => {
      const response = xhr.response;

      if (!response || response.error)
        return reject(response && response.error ? response.error.message : genericErrorText);

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.url,
      });
    });

    if (xhr?.upload)
      xhr.upload.addEventListener('progress', (evt: any) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
  }

  // // Prepares the data and sends the request.
  async _sendRequest(file: any) {
    const data = new FormData();
    console.log(file);

    const base64 = await file2Base64(file);
    console.log(base64);
    data.append('upload', base64);
    data.append('upload', file);

    this.xhr?.send(data);
  }
}
