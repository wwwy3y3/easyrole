var Role= require('./lib/role');

var rbac= function () {
	var self= this;
}

rbac.prototype.setRoles = function(roles) {
	var self= this;
	self.roles= roles;
	self.roles.forEach(function (role) {
		self[role]= new Role(role);
	})
	return self;
};

rbac.prototype.can = function(role) {
	var self= this;
	return {
		do: function (action) {
			return self.roles[role].do(action);
		}
	}
};

module.exports= rbac;