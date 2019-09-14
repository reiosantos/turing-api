import NodeCache from 'node-cache';
import { TTL } from '../constants';

class Cache {
	constructor(ttlSeconds = TTL) {
		if (!this.cache) {
			this.cache = new NodeCache({
				deleteOnExpire: true,
				stdTTL: ttlSeconds,
				useClones: false,
				checkperiod: ttlSeconds * 0.2
			})
		}
	}
	
	async get(key, storeFunction) {
		const value = this.cache.get(key);
		if (value) {
			return Promise.resolve(value);
		}
		const result = await storeFunction();
		this.cache.set(key, result);
		return Promise.resolve(result);
	}
	
	del(keys) {
		this.cache.del(keys);
	}
	
	delStartWith(startStr = '') {
		if (!startStr) {
			return;
		}
		
		const keys = this.cache.keys();
		for (const key of keys) {
			if (key.indexOf(startStr) === 0) {
				this.del(key);
			}
		}
	}
	
	flush() {
		this.cache.flushAll();
	}
}

export default Cache;
