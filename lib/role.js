var Role= function (rolename) {
	var self= this;
	self.permissions= {};
	self.name= rolename;
}

Role.prototype.allow = function(obj) {
	// permissions
	var self= this;

	// all
	if(obj=='*')
		self.permissions= '*';

	// object
	for(key in obj){
		self.permissions[key]= obj[key];
	}
	return self;
};

Role.prototype.extend = function(role) {
	// extend a role's permissions
	var self= this;

	// all permissions
	if(role.permissions=='*')
		self.permissions= '*';

	for(key in role.permissions){
		self.permissions[key]= role.permissions[key];
	}
	return self;
};

Role.prototype.do = function(param) {
	// can this role do the action
	var self= this;
	var arr= param.split('.');
	var resource= arr[0];
	var action= arr[1];

	// all
	if(self.permissions=='*')
		return true;

	if(self.permissions[resource] && self.permissions[resource].indexOf(action))
		return true;
	else
		return false;
};

module.exports= Role;