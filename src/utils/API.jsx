import Request from 'superagent';

const API_PATH = 'http://exwd.csie.org:43001/api';


export const getAPIHost = () => API_PATH;

/**
 * API GET
 * @param {string} url 路徑 
 * @param {object} query 查詢條件
 * @param {Function(data)} callback 
 * apiGet(resource, callback)
 * apiGet(resource, query, callback)
 */
export function get(url, query, cb) {
	if (typeof(url) !== 'string') {
		return console.debug('request url 請填入字串');
	} 

	if (query instanceof(Function)) {
		cb = query;
		query = {};
	}

	Request
		.get(`${API_PATH}${url}`)
		.query(query)
		// .withCredentials()
		.end((err, res) => {
			if (err) {
				console.error('取得資料失敗', err);
				return cb(undefined);
			} else if (
				res && 
				res.body &&
				res.body instanceof(Object) && 
				res.body.error
			) {
	console.log('get');

				console.error(res.body);
				return cb(undefined);
			} else if (
				res && 
				res.body 
			) {
				return cb(res.body);
			}
		});
}


