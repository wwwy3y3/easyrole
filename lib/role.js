var _= require('lodash');

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
		var permission= self.permissions[key];
		if(permission)
			self.permissions[key]= _.union(self.permissions[key], obj[key]);
		else
			self.permissions[key]= obj[key];
	}
	return self;
};

Role.prototype.extend = function(role) {
	// extend a role's permissions
	var self= this;

	// all permissions
	if(role.permissions=='*' || self.permissions=='*')
		self.permissions= '*';

	for(key in role.permissions){
		var selfPermission= self.permissions[key];
		var rolePermission= role.permissions[key];

		if(rolePermission=='*' || selfPermission =='*')
			self.permissions[key]= '*';

		self.permissions[key]= _.union(self.permissions[key], role.permissions[key]);
	}
	return self;
};

Role.prototype.can = function(param) {
	// can this role do the action
	var self= this;
	var arr= param.split('.');
	var resource= arr[0];
	var action= arr[1];
	
	// all
	if(self.permissions=='*')
		return true;

	if(!self.permissions[resource]) // resource not found
		return false;

	// if resource permission equals '*'
	// allow all
	if(self.permissions[resource]=='*')
		return true

	// items
	if(self.permissions[resource].indexOf(action) >= 0)
		return true;
	else
		return false;
};

module.exports= Role;