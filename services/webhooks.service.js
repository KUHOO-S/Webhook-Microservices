"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const DbService = require("../mixin/db.mixin.js");
const CacheCleanerMixin = require("../mixin/cache.cleaner.mixin.js");

module.exports = {
	name: "webhooks",
	mixins: [
		DbService("follows"),
		CacheCleanerMixin([
			"cache.clean.users",
			"cache.clean.follows",
		])
	],
	actions: {
		register: {
			auth: "required",
			parameters: {
				targetUrl: { type: "string" }
			},
			handler(ctx) {
				var uniqueID = 4500;
				console.log(uniqueID);
				console.log(ctx.params.targetUrl)
				let dataEntry = { 'targetUrl': ctx.params.targetUrl, 'uniqueID': uniqueID };
				var x = this.adapter.insert(dataEntry);
				console.log(x);
				return x;
			}
		},
		update: {
			auth: "required",
			parameters: {
				uniqueID: { type: "number" },
				newTargetUrl: { type: "string" }
			},
			handler(ctx) {
				console.log(ctx.params.newTargetUrl)
				let dataEntry = { 'targetUrl': ctx.params.newTargetUrl, 'uniqueID': ctx.params.uniqueID };
				var _id;
				return this.Promise.resolve()
					.then(() => {
						if (ctx.params.newTargetUrl)
							return this.adapter.findOne({ uniqueID: ctx.params.uniqueID })
								.then(data => {
									if (!data)
										return this.Promise.reject(new MoleculerClientError("Oops! no such id found"));
									_id=data._id;
									});
					})
					.then(() => {
						const update = {
							"$set": dataEntry
						};
						return this.adapter.updateById(_id, update);
					})
				}
		},
		list: {
			auth: "required",
			handler(ctx) {

				let dataEntry = { 'targetUrl': "abc", 'uniqueID': "xyz" };
				var x = this.adapter.find();
				console.log(x);
				return x;
			}
		},
		delete: {
			auth: "required",
			parameters: {
				uniqueID: { type: "number" }
			},
			handler(ctx) {
				console.log("hi",ctx.params.uniqueID)
				//let dataEntry = { 'targetUrl': ctx.params.newTargetUrl, 'uniqueID': ctx.params.uniqueID };
				var _id;
				return this.Promise.resolve()
					.then(() => {
							return this.adapter.findOne({ uniqueID: ctx.params.uniqueID })
								.then(data => {
									if (!data)
										return this.Promise.reject(new MoleculerClientError("Oops! no such id found"));
									_id=data._id;
									});
					})
					.then(() => {
						return this.adapter.removeById(_id);
					})
				}
		},
		
		trigger : {
			auth: "required",
			parameters: {
				ipAddress : { type: "string" }
			},
			handler(ctx) {
				console.log(ctx.params.ipAddress)
				return ctx.params.ipAddress;
			}
		}
	}
};

