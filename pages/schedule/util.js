const tools = require('../../utils/tools.js');
const URL = require('../../utils/config.js').ScheduleURL;

module.exports = {
    addOneItem: (item, callback) => {
        item.wx_openid = tools.getUserOpenId();
        tools.ApiCloudPost(URL, item, (data) => {
            callback(data);
        });
    },
    deleteOneItem: (id, callback) => {
        tools.ApiCloudDelete(URL, id, (data) => {
            callback(data);
        });
    },
    updateState: (id, state, callback) => {
        let _data = {
            "state": state
        };
        tools.ApiCloudPut(URL, id, _data, (data) => {
            callback(data);
        });
    },
    updateItem: (id, _data, callback) => {
        tools.ApiCloudPut(URL, id, _data, (data) => {
            callback(data);
        });
    },
    getOneItem: (id, callback) => {
        let filter = {
            "where": {
                "id": id
            },
            "fields": {
                "wx_openid": false,
                "createdAt": false,
                "updatedAt": false
            }
        };
        tools.ApiCloudGet(URL, filter, (data) => {
            callback(data);
        });
    },
    getAllData: (callback) => {
        let filter = {
            "where": {
                "wx_openid": tools.getUserOpenId()
            },
            "fields": {
                "wx_openid": false,
                "createdAt": false,
                "updatedAt": false
            }
        };
        tools.ApiCloudGet(URL, filter, (data) => {
            callback(data);
        });
    },
    getAllDataId: (callback) => {
        let filter = {
            "where": {
                "wx_openid": tools.getUserOpenId()
            },
            "fields": {
                "title": false,
                "state": false,
                "desc": false,
                "date": false,
                "startTime": false,
                "endTime": false,
                "wx_openid": false,
                "createdAt": false,
                "updatedAt": false
            }
        };
        tools.ApiCloudGet(URL, filter, (data) => {
            callback(data);
        });
    }
}
