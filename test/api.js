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
rbac.developers.extend(rbac.editors)
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


describe('editors', function () {
	it('should create a blog', function () {
		rbac.can('editors').do('create.blogs').should.be.true;
	})

	it('should not be allowed to update settings', function () {
		rbac.can('editors').do('update.settings').should.be.false;
	})
})

describe('developers', function () {
	it('should create a blog', function () {
		rbac.can('developers').do('create.blogs').should.be.true;
	})

	it('should update settings', function () {
		rbac.can('developers').do('update.settings').should.be.true;
	})
})

describe('users', function () {
	it('should read a blog', function () {
		rbac.can('users').do('read.blogs').should.be.true;
	})

	it('should not be allowed to create a blog', function () {
		rbac.can('users').do('create.blogs').should.be.false;
	})
})