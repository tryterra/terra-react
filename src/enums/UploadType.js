export var UploadType;
(function (UploadType) {
  UploadType[(UploadType['UNKNOWN'] = 0)] = 'UNKNOWN';
  UploadType[(UploadType['AUTOMATIC'] = 1)] = 'AUTOMATIC';
  UploadType[(UploadType['MANUAL'] = 2)] = 'MANUAL';
  UploadType[(UploadType['UPDATE'] = 3)] = 'UPDATE';
  UploadType[(UploadType['DELETE'] = 4)] = 'DELETE';
  UploadType[(UploadType['PENDING'] = 5)] = 'PENDING';
})(UploadType || (UploadType = {}));
