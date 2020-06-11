export function mainclick(node, fn) {
	const handler = e => {
		if (e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 0) return;

		e.preventDefault();
		fn();
	};

	node.addEventListener('click', handler);

	return {
		destroy() {
			node.removeEventListener('click', handler);
		}
	};
}