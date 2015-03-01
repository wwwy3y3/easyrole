var should = require('should');

var Rbac= require('../');
var rbac= new Rbac();
rbac.setRoles(['admins', 'editors', 'developers', 'users']);

// admins
rbac.admins.allow('*');

// editors
rbac.editors.allow({
	blogs: ['create', 'read', 'update', 'delete'],
	settings: ['read'],
	sth: '*',
	pay: ['use']
})

// developers
rbac.developers.extend(rbac.editors)
			   .allow({
			   		blogs: ['other_permission'],
			   		settings: ['read', 'update'],
			   		pay: '*'
			   })

// users
rbac.users.allow({
	blogs: ['read']
})

// tests
describe('admins', function () {
	it('should have all permissions', function () {
		rbac.can('admins').do('blogs.create').should.be.true;
		rbac.can('admins').do('settings.update').should.be.true;
	})
})


describe('editors', function () {
	it('should create a blog', function () {
		rbac.can('editors').do('blogs.create').should.be.true;
	})

	it('should not be allowed to update settings', function () {
		rbac.can('editors').do('settings.update').should.be.false;
	})
})

describe('developers', function () {
	it('should create a blog', function () {
		rbac.can('developers').do('blogs.create').should.be.true;
	})

	it('should update settings', function () {
		rbac.can('developers').do('settings.update').should.be.true;
	})

	it('should do sth', function () {
		rbac.can('developers').do('sth.cool').should.be.true;
	})

	it('should pay use', function () {
		rbac.can('developers').do('pay.use').should.be.true;
	})

	it('should pay all', function () {
		rbac.can('developers').do('pay.all').should.be.true;
	})	
})

describe('users', function () {
	it('should read a blog', function () {
		rbac.can('users').do('blogs.read').should.be.true;
	})

	it('should not be allowed to create a blog', function () {
		rbac.can('users').do('blogs.create').should.be.false;
	})
})

describe('get roles', function () {
	var admin;
	it('should get a admin role', function () {
		admin= rbac.getRoles('admins');
		admin.should.be.ok;
	})

	it('should use admin object to test permissions', function () {
		admin.can('blogs.create').should.be.true;
	})

	it('should use user object to test permissions', function () {
		rbac.getRoles('users').can('blogs.create').should.be.false;
	})
})