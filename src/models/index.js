import { CUSTOMER_MODAL } from '../constants';
import ModelFactory from './models.factory';
import Cache from '../helpers/cache';
import { Sequelize, sequelize } from '../database/models';

class DatabaseWrapper {
	/**
	 *
	 * @param objectName { string }
	 * @param document {Object}, the object to be saved/created
	 * @returns {document}
	 */
	static async createOne(objectName, document) {
		const Modal = ModelFactory.getModel(objectName);
		const data = Modal.create(document);
		
		if (data && data.dataValues && objectName !== CUSTOMER_MODAL) return data.dataValues;
		return data;
	}

	/**
	 *
	 * @param objectName {string}
	 * @param where {Object}
	 * @param attributes {Array}
	 * @param include {Array}
	 * @param order {Array}
	 * @param raw {boolean}
	 * @returns {*}
	 */
	static async findAll(
		objectName, where = {}, attributes = undefined,
		include = [{ all: true }], order = [], raw = false
	) {
		const cache = new Cache();
		const data = await cache.get(`findAll-${objectName}`, async () => {
			const Modal = ModelFactory.getModel(objectName);
			
			return Modal.findAll({
				attributes,
				where,
				raw,
				include,
				order
			});
		});
		
		if (data && data.dataValues && objectName !== CUSTOMER_MODAL) return data.dataValues;
		return data;
	}
	
	/**
	 *
	 * @param objectName {string}
	 * @param where {Object}
	 * @param attributes {Array}
	 * @param include {Array}
	 * @param order {Array}
	 * @param raw {boolean}
	 * @param limit
	 * @param offset
	 * @returns {*}
	 */
	static async findAndCountAll(
		objectName, where = {}, attributes = undefined,
		include = [{ all: true }], order = [], raw = false, limit, offset
	) {
		const Modal = ModelFactory.getModel(objectName);
		
		const data = Modal.findAndCountAll({
			limit,
			offset,
			attributes,
			where,
			raw,
			include,
			order
		});
		
		if (data && data.dataValues && objectName !== CUSTOMER_MODAL) return data.dataValues;
		return data;
	}
	
	/**
	 *
	 * @param tableName
	 * @param returnColumns
	 * @param searchColumns
	 * @param limit
	 * @param offset
	 * @param query
	 * @returns {*}
	 */
	static async fullTextSearchQuery(tableName, returnColumns = '*', searchColumns, limit, offset, query) {
		
		const searchQuery = `SELECT ${returnColumns} FROM ${tableName} WHERE MATCH(${searchColumns}) AGAINST("${query}" in natural language mode) LIMIT ${limit} OFFSET ${offset}`;
		
		const data = await sequelize.query(searchQuery, { type: Sequelize.QueryTypes.SELECT });
		if (data && data.dataValues) return data.dataValues;
		return data;
	}

	/**
	 *
	 * @param objectName {string}
	 * @param where {Object || string}
	 * @param attributes {Array}
	 * @param include {Array}
	 * @param raw {boolean}
	 * @returns {*|Query|void|Promise}
	 */
	static async findOne(
		objectName, where = {}, attributes = undefined, include = [{ all: true }], raw = false
	) {
		const cache = new Cache();
		const data = await cache.get(`findOne-${objectName}`, async () => {
			const Modal = ModelFactory.getModel(objectName);
			let data_;
			if (typeof where === 'string') {
				data_ = await Modal.findByPk(where, {
					include,
					attributes,
					raw
				});
			} else {
				data_ = await Modal.findOne({
					where,
					include,
					attributes,
					raw
				});
			}
			return data_;
		});
		
		if (data && data.dataValues && objectName !== CUSTOMER_MODAL) return data.dataValues;
		return data;
	}

	/**
	 *
	 * @param objectName {string}
	 * @param update {Object} data on the record to update
	 * @param where {Object}
	 * @param attributes {Array}
	 * @param raw {boolean}
	 * @returns {Query}
	 */
	static async updateOne(
		objectName, where = {}, update, attributes = undefined, raw = false
	) {
		const data = await ModelFactory.getModel(objectName).findOne({
			where,
			attributes,
			raw
		})
			.then(modal => modal.update(update, { returning: true }))
			.catch(error => error);

		if (!data.dataValues) {
			if (data instanceof TypeError) {
				throw new Error(
					`We were unable to update this ${objectName}. Its probably due to an invalid ID`
				);
			}
			throw new Error(
				`Record could not be updated. we were unable to find the ${
					data.table || data.message
				}.`
			);
		}
		if (data && data.dataValues && objectName !== CUSTOMER_MODAL) return data.dataValues;
		return data;
	}

	/**
	 *
	 * @param objectName { string }
	 * @param where {Object}
	 * @returns {Query}
	 */
	static async deleteOne(objectName, where = {}) {
		const Modal = ModelFactory.getModel(objectName);
		const data = await Modal.destroy({ where });

		if (data && data.dataValues && objectName !== CUSTOMER_MODAL) return data.dataValues;
		return data;
	}
}

export default DatabaseWrapper;
