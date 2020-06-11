import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});

window.addEventListener('mousedown', () => {
	document.body.classList.add('clicking');
	document.body.classList.remove('tabbing');
});

window.addEventListener('keydown', e => {
	if (e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
		document.body.classList.add('tabbing');
		document.body.classList.remove('clicking');
	}
});