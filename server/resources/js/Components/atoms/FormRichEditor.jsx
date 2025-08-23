import React from 'react';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function FormRichEditor({
  label,
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  error,
  onReady = () => {},
  value,
}) {
  const config = {
    toolbarButtons: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      '|',
      'paragraphFormat',
      '|',
      'fontFamily',
      'fontSize',
      'textColor',
      'backgroundColor',
      '|',
      'align',
      'formatOL',
      'formatUL',
      'outdent',
      'indent',
      '|',
      'insertLink',
      'insertTable',
      '|',
      'emoticons',
      'specialCharacters',
      'insertHR',
      'clearFormatting',
      '|',
      'print',
      'help',
      'html',
      '|',
      'undo',
      'redo',
    ],
    paragraphFormat: {
      N: 'Normal',
      H1: 'Heading 1',
      H2: 'Heading 2',
      H3: 'Heading 3',
      H4: 'Heading 4',
      H5: 'Heading 5',
      H6: 'Heading 6',
    },
  };
  return (
    <div>
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text font-bold'>{label}</span>
        </div>
      </label>
      <FroalaEditorComponent
        tag='textarea'
        model={value}
        config={config}
        onModelChange={onChange}
      />
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
}
