import React from 'react';
import { createDevTools } from 'redux-devtools';
/*LogMonitor вызывает варнинг из за react-json-tree, тут обещают выкатить фикс: https://github.com/alexkuz/react-json-tree/issues/94 , на 15 реакте  нет таких проблем*/
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(

	<DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q'>
		<LogMonitor/>
	 </DockMonitor>

);