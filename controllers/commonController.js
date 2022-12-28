const Country = require('../models/countryModel');
const Role = require('../models/permissions/roleModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Permission = require('../models/permissions/permissionModel');
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
        countryName:req.body.countryName,
        Code:req.body.countryName
    });  
    res.status(200).json({
      status: 'success',
      data: {
        Country:newCountry
      }
    }); 
  });

  
  exports.getRoleByName = catchAsync(async (req, res, next) => {    
    const role = await Role.find({}).where('roleName').equals(req.body.roleName);  
    res.status(200).json({
      status: 'success',
      data: {
        role: role
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
  exports.deletePermission = catchAsync(async (req, res, next) => {  
    const document = await Permission.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  
  exports.updatePermission = factory.updateOne(Permission);
  
  exports.getPermission = catchAsync(async (req, res, next) => {       
    const permission = await Permission.find({}).where('_id').equals(req.params.id);   
    if (!permission) {
      return next(new AppError('No permission found', 403));
    }  
    res.status(200).json({
      status: 'success',
      data: permission
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

  //Country region
  exports.getCountries = catchAsync(async (req, res, next) => {    
    const countries = await Country.find({});  
    res.status(200).json({
      status: 'success',
      data:countries 
    });  
  });

  exports.saveCountry = catchAsync(async (req, res, next) => {        
    const newCountry = await Country.create({      
      Name:req.body.Name,
      Code:req.body.Code      
    });
    res.status(200).json({
      status: 'success',
      data:newCountry 
    });  
  });

  //End Country region
  

