var should = require('should');

var Rbac= require('../');
var rbac= new Rbac();
rbac.setRoles(['admins', 'editors', 'developers', 'users']);

// admins
rbac.admins.allow('*');

// editors
rbac.editors.allow({
	blogs: ['create', 'read', 'update', 'delete'],
	settings: ['read']
})

// developers
rbac.developers.extend('editors')
			   .allow({
			   		settings: ['read', 'update']
			   })

// users
rbac.users.allow({
	blogs: ['read']
})


// tests
describe('admins', function () {
	it('should have all permissions', function () {
		rbac.can('admins').do('create.blogs').should.be.true;
		rbac.can('admins').do('update.settings').should.be.true;
	})
})
