const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const ProjectUser = require('../models/projectUserModel');
const Productivity = require('./../models/productivityModel');
const AppError = require('../utils/appError');
const TimeLog = require('../models/timeLog');
const AppWebsite = require('./../models/commons/appWebsiteModel');
exports.getActivity = catchAsync(async (req, res, next) => {
//let date = `${req.body.date}.000+00:00`;
//console.log("getTimeLogs, date:" + date);
const timeLogsAll = [];
var timeLogs;
let filter;
  
if(req.body.users!='' && req.body.projects!='' && req.body.tasks!='')
  {
    filter = { 'user': { $in: req.body.users },'project': { $in: req.body.projects },'task': { $in: req.body.tasks }, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}  };
  }
  else if(req.body.users!='' && req.body.tasks!='')
  {
    filter = { 'user': { $in: req.body.users },'task': { $in: req.body.tasks }, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}  };
  }
  else if(req.body.users!='' && req.body.projects!='')
  {
    filter = { 'user': { $in: req.body.users },'project': { $in: req.body.projects }, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}  };
  }
  else if(req.body.tasks!='' && req.body.projects!='')
  {
    filter = { 'project': { $in: req.body.projects } , 'date' : {$gte: req.body.fromdate,$lte: req.body.todate} };  
  }
  else if(req.body.projects!='')
  {
    filter = { 'project': { $in: req.body.projects }, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate} }; 
  }  
  else if(req.body.tasks!='')
  {
    filter = { 'task': { $in: req.body.tasks }, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}  };   
  }
  else if(req.body.users!='')
  {
    filter = { 'user': { $in: req.body.users }, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}  };
  }
  else{
      filter={
        'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};
   }
   
   timeLogs = await TimeLog.find(filter).distinct('user') 
 
   for(var i = 0; i < timeLogs.length; i++) 
   {    
    let filterProject ={};  
      if(req.body.projects!='')
        {
          filterProject = {'user': timeLogs[i],'project': { $in: req.body.projects }, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate} }; 
        }  
      else
      {
        filterProject = {'user': timeLogs[i], 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};  
      }
     const timeLog = await TimeLog.find(filterProject).distinct('project');
     
     for(var j = 0; j < timeLog.length; j++) 
     {
      let filterTask ={};
        if(req.body.tasks!='' && req.body.projects!='')
        {
          filterTask = { 'project': { $in: req.body.projects } ,'task': { $in: req.body.tasks },'user': timeLogs[i], 'date' : {$gte: req.body.fromdate,$lte: req.body.todate} };  
        }
        else if(req.body.tasks!='')
        {
          filterTask = { 'task': { $in: req.body.tasks }, 'user': timeLogs[i],'project':timeLog[j],'date' : {$gte: req.body.fromdate,$lte: req.body.todate}  };   
        }
        else if(req.body.projects!='')
        {
          filterTask = {'user': timeLogs[i],'project':req.body.projects,'date' : {$gte: req.body.fromdate,$lte: req.body.todate}  };   
        }
        else
        {
          filterTask = {'user': timeLogs[i],'project':timeLog[j], 'date' : {$gte: req.body.fromdate,$lte: req.body.todate} };
        }
        const timeLogTask = await TimeLog.find(filterTask).distinct('task');
        if(timeLogTask.length>0) 
         {
              for(var k = 0; k < timeLogTask.length; k++) 
              {   
                const dateFrom = new Date(req.body.fromdate).getDate();
                const dateTo = new Date(req.body.todate).getDate();
                let days = dateTo - dateFrom;
                for(var day = 0;day < days; day++)
                {                 
                  var tomorrow = new Date(new Date(req.body.fromdate).setDate(new Date(req.body.fromdate).getDate() + day));
                  let filterAll = {'user': timeLogs[i],'project':timeLog[j],'task':timeLogTask[k],'date': tomorrow.toISOString().slice(0, 10)};                  
                  const timeLogAll = await TimeLog.find(filterAll);                
                  if(timeLogAll.length>0)    
                  {                   
                    const newLogInUSer = {};
                    newLogInUSer.user = timeLogAll[0].user;
                    if(timeLogAll[0].project)
                    {
                     newLogInUSer.project = timeLogAll[0].project.projectName;
                    }
                    if(timeLogAll[0].task)
                    {
                        newLogInUSer.task = timeLogAll[0].task.taskName;
                    }
                    newLogInUSer.time = timeLogAll.length*10;      
                    newLogInUSer.date = timeLogAll[0].date;
                    timeLogsAll.push(newLogInUSer);
                  }
                }
              }
          }
       }   
   }
  res.status(200).json({
    status: 'success',
    data: timeLogsAll
  });  
});

exports.getProductivityByMember = catchAsync(async (req, res, next) => {
  //let date = `${req.body.date}.000+00:00`;
  //console.log("getTimeLogs, date:" + date);
  var appWebsiteSummary={};
  var appwebsiteDetails=[];
  let filter;
  filter={'userReference': req.body.user
          };
  const appWebsites = await AppWebsite.find({}).where('userReference').equals(req.body.user);  
  let mouseClicks=0,keyboardStrokes=0,scrollingNumber=0,totalTimeSpent=0,TimeSpentProductive=0,TimeSpentNonProductive=0;
  if(appWebsites.length>0)    
    { 
      for(var i = 0; i < appWebsites.length; i++) 
         {                
            mouseClicks=mouseClicks+appWebsites[i].mouseClicks;
            keyboardStrokes=keyboardStrokes+appWebsites[i].keyboardStrokes;
            scrollingNumber=scrollingNumber+appWebsites[i].scrollingNumber;                  
         }
      totalTimeSpent = appWebsites.length*10;  
    appWebsiteSummary.mouseClicks=mouseClicks;
    appWebsiteSummary.keyboardStrokes=keyboardStrokes;
    appWebsiteSummary.scrollingNumber=scrollingNumber;                 
    appWebsiteSummary.TimeSpent= totalTimeSpent; 
    const appWebsitename = await AppWebsite.find(filter).distinct('appWebsite');                               
    if(appWebsitename.length>0) 
      {
        for(var c = 0; c < appWebsitename.length; c++) 
            { 
              filterforcount = {'appWebsite':appWebsitename[c],'userReference': req.body.user,'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};  
              let TimeSpent=0,appWebsite={};
              filterforproductivity = {'name':appWebsitename[c]};  
              const appIsProductive = await Productivity.find(filterforproductivity);  
              appWebsite.isProductive=appIsProductive[0].isProductive;
              const appWebsitecount = await AppWebsite.find(filterforcount);  
              if(appWebsitecount.length>0) 
                {
                  for(var j = 0; j < appWebsitecount.length; j++) 
                     { 
                        TimeSpent=TimeSpent+appWebsitecount[j].TimeSpent;
                     }
                }
              if(appWebsite.isProductive==true)
              {
                 TimeSpentProductive=TimeSpentProductive+TimeSpent;
              }
              else
              {
                TimeSpentNonProductive=TimeSpentNonProductive+TimeSpent;
              }
              appWebsite.TimeSpent=TimeSpent;
              appWebsite.name=appWebsitename[c];             
              appwebsiteDetails.push(appWebsite);
           }
     }
         
   appWebsiteSummary.appwebsiteDetails=appwebsiteDetails;
   appWebsiteSummary.TimeSpentProductive=TimeSpentProductive;
   appWebsiteSummary.TimeSpentNonProductive=TimeSpentNonProductive;
  }
   res.status(200).json({
      status: 'success',
      data: appWebsiteSummary
    });  
  });
exports.getAppWebsite = catchAsync(async (req, res, next) => {
  //let date = `${req.body.date}.000+00:00`;
  //console.log("getTimeLogs, date:" + date);
  const appWebsiteAll = [];
  var timeLogs;
  let filter;
    
  if(req.body.users.length>0 && req.body.projects.length>0)
    {
      filter = { 'userReference': { $in: req.body.users },'projectReference': { $in: req.body.projects } , 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};
    }
    else if(req.body.projects.length>0)
    {
      filter = { 'projectReference': { $in: req.body.projects } , 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}}; 
    }  
    else if(req.body.users.length>0)
    {
      filter = { 'userReference': { $in: req.body.users } , 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};
    }
    else{
        filter={
          'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};
     }
    console.log(filter);
     appWebsiteusers = await AppWebsite.find(filter).distinct('userReference') 

     for(var i = 0; i < appWebsiteusers.length; i++) 
     {          
        let filterProject;
        if(req.body.users.length>0)
        {
             filterProject = {'userReference': req.body.users, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};  
        } 
        else
        {
          filterProject = {'userReference': appWebsiteusers[i],'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};  
      
        }   
        const appWebsiteprojects = await AppWebsite.find(filterProject).distinct('projectReference');      
       if(appWebsiteprojects.length>0) 
           {
                for(var k = 0; k < appWebsiteprojects.length; k++) 
                {  
                 
                  filternames = {'userReference': appWebsiteusers[i]._id,'projectReference':appWebsiteprojects[k]._id, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};  
                  const appWebsitename = await AppWebsite.find(filternames).distinct('appWebsite'); 
                            
                  if(appWebsitename.length>0) 
                      {
                           for(var c = 0; c < appWebsitename.length; c++) 
                           { 
                             filterforcount = {'appWebsite':appWebsitename[c],'userReference': appWebsiteusers[i]._id,'projectReference':appWebsiteprojects[k]._id, 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};  
                             let mouseClicks=0,keyboardStrokes=0,scrollingNumber=0,TimeSpent=0;
                             const appWebsitecount = await AppWebsite.find(filterforcount);  
                             if(appWebsitecount.length>0) 
                                 {
                                 
                                      for(var j = 0; j < appWebsitecount.length; j++) 
                                      { 
                                        mouseClicks=mouseClicks+appWebsitecount[j].mouseClicks;
                                        keyboardStrokes=keyboardStrokes+appWebsitecount[j].keyboardStrokes;
                                        scrollingNumber=scrollingNumber+appWebsitecount[j].scrollingNumber;
                                        TimeSpent=TimeSpent+appWebsitecount[j].TimeSpent;

                                      }
                                    }
                                    const newLogInUSer = {};
                           newLogInUSer.name = appWebsitename[c]; 
                           newLogInUSer.user = appWebsitecount[0].userReference.firstName;  
                           newLogInUSer.project = appWebsitecount[0].projectReference.projectName;   
                           newLogInUSer.mouseClicks=mouseClicks;
                           newLogInUSer.keyboardStrokes=keyboardStrokes;
                           newLogInUSer.scrollingNumber=scrollingNumber;
                           newLogInUSer.TimeSpent=TimeSpent;
                           newLogInUSer.isProductive=appWebsitecount[0].isProductive;
                           appWebsiteAll.push(newLogInUSer);
                          }
                      }
                      
                }
            }
     }
    res.status(200).json({
      status: 'success',
      data: appWebsiteAll
    });  
  });