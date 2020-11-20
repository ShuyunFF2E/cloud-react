function getError(option, xhr) {
	const msg = '上传失败';
	const error = new Error(msg);

	error.status = xhr.status;
	error.method = 'post';
	error.url = option.action;

	return error;
}

function getBody(xhr) {
	const text = xhr.responseText || xhr.response;

	if (!text) {
		return text;
	}

	try {
		return JSON.parse(text);
	} catch (e) {
		return text;
	}
}

export default function http(option) {
	const xhr = new XMLHttpRequest();

	const { onProgress, file, action, withCredentials, headers = {}, unify } = option;

	// 上传进度显示
	if (onProgress && xhr.upload) {
		xhr.upload.onprogress = function progress(event) {
			const { total, loaded } = event;

			if (total > 0) {
				Object.assign(event, { percent: (loaded / total) * 100 });
			}

			option.onProgress(event);
		};
	}

	const formData = new FormData();
	if (unify) {
		file.forEach(fileItem => {
			formData.append('file', fileItem, fileItem.name);
		});
	} else {
		formData.append('file', file, file.name);
	}

	// 为 xhr 添加事件监听
	xhr.onerror = function error(e) {
		option.onError(e);
	};

	xhr.onload = function onload() {
		// staus code:  https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
		if (xhr.status < 200 || xhr.status >= 300) {
			return option.onError(getError(option, xhr));
		}
		return option.onSuccess(getBody(xhr), xhr);
	};

	xhr.open('post', action, true);

	if (withCredentials && 'withCredentials' in xhr) {
		xhr.withCredentials = true;
	}
	// setRequestHeader 必须在 open 之后，在 send 之前
	if (headers['X-Requested-With'] !== null) {
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	}

	Object.keys(headers)
		.filter(key => headers[key] !== null)
		.forEach(key => {
			xhr.setRequestHeader(key, headers[key]);
		});

	xhr.send(formData);

	return {
		abort() {
			return xhr.abort();
		}
	};
}
