"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const DbService = require("../mixin/db.mixin.js");
const CacheCleanerMixin = require("../mixin/cache.cleaner.mixin.js");

require('dotenv').config();
var request = require('request');
module.exports = {
	name: "webhooks",
	mixins: [
		DbService(process.env.collection),
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
				let dataEntry = { 'targetUrl': ctx.params.targetUrl, 'uniqueID': uniqueID };
				var dbData = this.adapter.insert(dataEntry);
				return dbData;
			}
		},
		update: {
			auth: "required",
			parameters: {
				uniqueID: { type: "number" },
				newTargetUrl: { type: "string" }
			},
			handler(ctx) {
				let dataEntry = { 'targetUrl': ctx.params.newTargetUrl, 'uniqueID': ctx.params.uniqueID };
				var _id;
				return this.Promise.resolve()
					.then(() => {
						if (ctx.params.newTargetUrl)
							return this.adapter.findOne({ uniqueID: ctx.params.uniqueID })
								.then(data => {
									if (!data)
										return this.Promise.reject(new MoleculerClientError("Oops! no such id found"));
									_id = data._id;
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
				var dbData = this.adapter.find();
				return dbData;
			}
		},
		delete: {
			auth: "required",
			parameters: {
				uniqueID: { type: "number" }
			},
			handler(ctx) {
				var _id;
				return this.Promise.resolve()
					.then(() => {
						return this.adapter.findOne({ uniqueID: ctx.params.uniqueID })
							.then(data => {
								if (!data)
									return this.Promise.reject(new MoleculerClientError("Oops! no such id found"));
								_id = data._id;
							});
					})
					.then(() => {
						return this.adapter.removeById(_id);
					})
			}
		},

		trigger: {
			auth: "required",
			parameters: {
				ipAddress: { type: "string" }
			},
			handler(ctx) {
				return this.adapter.find().
					then((dbData) => {
						return this.sendReq(dbData, ctx.params.ipAddress);
					})
			}
		}
	},
	methods: {

		sendReq(dbData, ipAddress) {
			console.log(dbData)
			var count = 0;
			var i = 0;
			for (i = 0; i < dbData.length; i++) {
				var fl = 0;
				var options = {
					'method': 'POST',
					'url': dbData[i].targetUrl,
					'headers': {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ "ip": ipAddress, "time": Date() })
				};
				request(options, function (error, response) {
					if (error)
						console.log("err", dbData[i].targetUrl)
					else {
						console.log("success", count);
						count = count + 1;
					}

				});


			}
			return "Sent req= " + String(i);
		}
	}
};

