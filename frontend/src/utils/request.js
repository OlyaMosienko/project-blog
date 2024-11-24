export const request = (url, method, data) =>
	fetch(`/api${url}`, {
		method: method || 'GET',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: data ? JSON.stringify(data) : null,
	}).then((response) => {
		const contentType = response.headers.get('Content-Type');

		if (contentType && contentType.includes('application/json')) {
			return response.json();
		} else {
			return { error: true };
		}
	});
