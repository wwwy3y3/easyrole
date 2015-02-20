var Role= function (rolename) {
	var self= this;
	self.name= rolename;
}

Role.prototype.allow = function(obj) {
	// permissions
};

Role.prototype.extend = function(role) {
	// extend a role's permissions
};

Role.prototype.do = function(action) {
	// can this role do the action
};