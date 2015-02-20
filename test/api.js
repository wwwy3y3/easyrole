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
rbac.can('admins').do('create.blog').should.be.true;