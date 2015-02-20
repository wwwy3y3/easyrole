# easyrole
Easy Role Based Access Control

# install
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

# api
