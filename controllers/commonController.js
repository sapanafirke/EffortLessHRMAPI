const Country = require('../models/countryModel');
const Role = require('../models/roleModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Permission = require('../models/permissionModel');
const RolePerms = require('../models/rolePermsModel');

 // Get Country List
 exports.getCountryList = catchAsync(async (req, res, next) => {    
    const countryList = await Country.find({}).all();  
    res.status(200).json({
      status: 'success',
      data: {
        countryList: countryList
      }
    });  
  });

 // Save Country
  exports.saveCoutry = catchAsync(async (req, res, next) => {
    const newCountry = await Country.create({      
        countryName:req.body.countryName
    });  
    res.status(200).json({
      status: 'success',
      data: {
        Country:newCountry
      }
    }); 
  });

  // Save Role List
  exports.getRoleList = catchAsync(async (req, res, next) => {    
    const roleList = await Role.find({}).all();  
    res.status(200).json({
      status: 'success',
      data: {
        roleList: roleList
      }
    });  
  });
  exports.getRole = catchAsync(async (req, res, next) => {    
    const role = await Role.find({}).where('id').equals(req.body.id);  
    res.status(200).json({
      status: 'success',
      data: {
        role: role
      }
    });  
  });
  // Save New Role
  exports.saveRole = catchAsync(async (req, res, next) => {
    const newRole = await Role.create({      
        roleName:req.body.roleName
    });  
    res.status(200).json({
      status: 'success',
      data: {
        Role:newRole
      }
    }); 
  });

  // Save Permission List
  exports.getPermissionList = catchAsync(async (req, res, next) => {    
    const permissionList = await Permission.find({}).all();  
    res.status(200).json({
      status: 'success',
      data: {
        permissionList: permissionList
      }
    });  
  });

  // Save Permission
  exports.savePermission = catchAsync(async (req, res, next) => {
    const newPermission = await Permission.create({      
      permissionName:req.body.permissionName,
      permissionDetails:req.body.permissionDetails

    });  
    res.status(200).json({
      status: 'success',
      data: {
        Permission:newPermission
      }
    }); 
  });

  // Get RolePermission List
  exports.getRolePermsList = catchAsync(async (req, res, next) => {    
    const rolePermsList = await RolePerms.find({}).all();  
    res.status(200).json({
      status: 'success',
      data: {
        rolePermsList: rolePermsList
      }
    });  
  });

  // Save New RolePermission
  exports.saveRolePermission = catchAsync(async (req, res, next) => {
    
    const newRolePerms = await RolePerms.create({      
      perms:req.body.perms,
      permission:req.body.permission,
      role:req.body.role
    });  
    res.status(200).json({
      status: 'success',
      data: {
        RolePerms:newRolePerms
      }
    }); 
  });

  exports.getRolePermsByRole = catchAsync(async (req, res, next) => {    
    const rolePerms = await RolePerms.find({}).where('role').equals(req.body.role);  
    res.status(200).json({
      status: 'success',
      data: {
        rolePerms: rolePerms
      }
    });  
  });