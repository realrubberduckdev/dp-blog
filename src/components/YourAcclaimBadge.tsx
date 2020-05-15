import React, { useEffect } from 'react';

const YourAcclaimBadge = (props: any) => {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = '//cdn.youracclaim.com/assets/utilities/embed.js';
		script.async = true;
		document.body.appendChild(script);
	});

	return <div
		data-iframe-width="150"
		data-iframe-height="270"
		data-share-badge-id={props.badgeId}
		data-share-badge-host="https://www.youracclaim.com"
	/>;
}

export default YourAcclaimBadge