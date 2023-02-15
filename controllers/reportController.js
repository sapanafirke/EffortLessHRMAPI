const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const ProjectUser = require('../models/projectUserModel');
const AppError = require('../utils/appError');
const TimeLog = require('../models/timeLog');

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
   console.log(filter);
   console.log(req.body.projects.length);
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

exports.getAppWebsite = catchAsync(async (req, res, next) => {
  //let date = `${req.body.date}.000+00:00`;
  //console.log("getTimeLogs, date:" + date);
  const timeLogsAll = [];
  var timeLogs;
  let filter;
    
  if(req.body.users!='' && req.body.projects!='' && req.body.tasks!='')
    {
      filter = { 'user': { $in: req.body.users },'project': { $in: req.body.projects },'task': { $in: req.body.tasks } };
    }
    else if(req.body.users!='' && req.body.tasks!='')
    {
      filter = { 'user': { $in: req.body.users },'task': { $in: req.body.tasks } };
    }
    else if(req.body.users!='' && req.body.projects!='')
    {
      filter = { 'user': { $in: req.body.users },'project': { $in: req.body.projects } };
    }
    else if(req.body.tasks!='' && req.body.projects!='')
    {
      filter = { 'project': { $in: req.body.projects } };  
    }
    else if(req.body.projects!='')
    {
      filter = { 'project': { $in: req.body.projects } }; 
    }  
    else if(req.body.tasks!='')
    {
      filter = { 'task': { $in: req.body.tasks } };   
    }
    else if(req.body.users!='')
    {
      filter = { 'user': { $in: req.body.users } };
    }
    else{
        filter={
          'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};
     }
     console.log(filter);
     timeLogs = await TimeLog.find(filter).distinct('user') 
   
     for(var i = 0; i < timeLogs.length; i++) 
     {      
       let filterProject = {'user': timeLogs[i], 'date' : {$gte: req.body.fromdate,$lte: req.body.todate}};  
       const timeLog = await TimeLog.find(filterProject).distinct('project');
       
       for(var j = 0; j < timeLog.length; j++) 
       {
          let filterTask = {'user': timeLogs[i],'project':timeLog[j], 'date' : {$gte: req.body.fromdate,$lte: req.body.todate} };
         
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