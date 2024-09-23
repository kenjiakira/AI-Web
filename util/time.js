const moment = require('moment-timezone');

const getVietnamTime = () => {
    return moment().tz('Asia/Ho_Chi_Minh').format('dddd, HH:mm, DD/MM/YYYY');
};

module.exports = {
    getVietnamTime
};
