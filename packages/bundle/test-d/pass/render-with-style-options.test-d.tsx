import React from 'react';
import ReactDOM from 'react-dom';

import ReactWebChat, { createDirectLine } from '../../src/module/exports';

const directLine = createDirectLine({ token: '...' });
const styleOptions = { accent: 'black', cardEmphasisBackgroundColor: 'orange' };

ReactDOM.render(<ReactWebChat directLine={directLine} styleOptions={styleOptions} />, document.getElementById('app'));
