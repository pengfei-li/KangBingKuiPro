let tools = require('../../utils/tools');
let MemoUtil = require('../memo/util');
let ScheduleUtil = require('../schedule/util');
Page({
    clearAllMemo: () => {
        //提示是否清除
        tools.tipDialog('是否确认清空所有备忘录，这会清除所有的备忘录数据！', () => {
            //获取用户所有的数据的id
            MemoUtil.getAllDataId((data) => {
                tools.ApiCloudDeleteUserAllData('memo', data, (data) => {
                    tools.showToast('清除成功');
                });
            });
        });
    },
    clearAllSchedule: () => {
        //提示是否清除
        tools.tipDialog('是否确认清空所有日程，这会清除所有的日程数据！', () => {
            //获取用户所有的数据的id
            ScheduleUtil.getAllDataId((data) => {
                tools.ApiCloudDeleteUserAllData('schedule', data, (data) => {
                    tools.showToast('清除成功');
                });
            });
        });
    }
})
