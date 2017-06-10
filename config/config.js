var ipaddress = process.env.OPENSHIFT_NODEJS_IP;

if (typeof ipaddress === "undefined") {
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    ipaddress = "127.0.0.1";
}

var host = 'http://localhost:8080';
var localhost = 'mongodb://127.0.0.1:27017/';
var connection_string = localhost+'shop';

var db_login = 'ivan';
var db_password = '123';

if(process.env.OPENSHIFT_APP_NAME){
	host = 'http://wood-theare.rhcloud.com'
    connection_string = localhost + process.env.OPENSHIFT_APP_NAME;
	db_login = 'admin';
	db_password = 'ZJX-RQncgTKz';
}

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
}

exports.db_login = 'ivan';
exports.db_password = '123';
exports.host = host;
exports.ipaddress = ipaddress;
exports.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
exports.db_url = connection_string;