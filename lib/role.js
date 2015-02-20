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
	var action= arr[0];
	var resource= arr[1];
	
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