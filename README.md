# easyrole
Easy Role Based Access Control

# Install
``` javascript
npm install easyrole
```

# Example
``` javascript
var Rbac= require('easyrole');
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

// can admin creare blog
rbac.can('admins').do('create.blogs') //return true

// can editor update settings
rbac.can('editors').do('update.settings') //return false
```

# Getting Start
## set roles first
``` javascript
var Rbac= require('easyrole');
var rbac= new Rbac();
rbac.setRoles(['admins', 'editors', 'developers', 'users']);
```

## set permissions to roles
``` javascript
// give admins all permissions
rbac.admins.allow('*');

// editors
rbac.editors.allow({
	blogs: ['create', 'read', 'update', 'delete'],
	settings: ['read']
})

// extend editors permissoins to developers
rbac.developers.extend(rbac.editors)
			   .allow({
			   		settings: ['read', 'update']
			   })
```

## use it
``` javascript
rbac.can('admins').do('create.blogs') //return true
```

# Api
## rbac.can('role').do('action.resource')
return boolean
``` javascript
rbac.can('admins').do('create.blogs') //return true
```
## rbac.getRoles('role')
return a role object
``` javascript
var admin= rbac.getRoles('admins');
admin.can('create.blogs') // return true
```

# Todo
- [ ] use merge instead of replace in permission extend