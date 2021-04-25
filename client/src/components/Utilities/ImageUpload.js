import React from 'react';
import {DropzoneArea} from 'material-ui-dropzone';

export default function ImageUpload(props) {
  return <DropzoneArea filesLimit={1} onChange={props.upload} onDelete={props.delete} />;
}
