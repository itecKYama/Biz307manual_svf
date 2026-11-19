var sdp = new SDP();

function print(){
  sdp.print('http://localhost:8080/webdirectprint/servlet/ExecStreamPrintServlet').then(function(res){
    location.href="http://localhost:8080/webdirectprint/end.html";
  }).catch(function(err){
    location.href="http://localhost:8080/webdirectprint/error.html";
  });
}

function showPrinterSelectDialog(){
  sdp.showPrinterSelectDialog('http://localhost:8080/webdirectprint/servlet/ExecStreamPrintServlet').then(function(res){
    location.href="http://localhost:8080/webdirectprint/end.html";
  }).catch(function(err){
    location.href="http://localhost:8080/webdirectprint/error.html";
  })
}

function showPreviewWindow_directPrint(){
  var windowObj;
  sdp.showPreviewWindow('http://localhost:8080/webdirectprint/servlet/ExecStreamPrintServlet', 1, 1,
   function(res){ windowObj.close(); location.href="http://localhost:8080/webdirectprint/end.html"; },
   function(err){ windowObj.close(); location.href="http://localhost:8080/webdirectprint/error.html"; })
   .then(function(res){
     console.log('window open');
     windowObj = res.window;
   }).catch(function(err){
     console.log('error');
   });
}

function showPreviewWindow_dialogPrint(){
  var windowObj;
  sdp.showPreviewWindow('http://localhost:8080/webdirectprint/servlet/ExecStreamPrintServlet', 2, 1,
   function(res){ windowObj.close(); location.href="http://localhost:8080/webdirectprint/end.html"; },
   function(err){ windowObj.close(); location.href="http://localhost:8080/webdirectprint/error.html"; })
   .then(function(res){
     console.log('window open');
     windowObj = res.window;
   }).catch(function(err){
     console.log('error');
   });
}

function embedPreviewWindow_directPrint(){
  sdp.embedPreviewWindow('iframeID', 'http://localhost:8080/webdirectprint/servlet/ExecStreamPrintServlet', 1, 1,
   function(res){ location.href="http://localhost:8080/webdirectprint/end.html"; },
   function(err){ location.href="http://localhost:8080/webdirectprint/error.html"; })
   .then(function(res){
     console.log('window open');
   }).catch(function(err){
     console.log('error');
   });
}

function embedPreviewWindow_dialogPrint(){
  sdp.embedPreviewWindow('iframeID', 'http://localhost:8080/webdirectprint/servlet/ExecStreamPrintServlet', 2, 1,
   function(res){ location.href="http://localhost:8080/webdirectprint/end.html"; },
   function(err){ location.href="http://localhost:8080/webdirectprint/error.html"; })
   .then(function(res){
     console.log('window open');
   }).catch(function(err){
     console.log('error');
   });
}

function getPrintersInfo(){
  sdp.getPrintersInfo(true, true, true).then(function(res){
    window.alert(JSON.stringify(res.data.printer));
    location.href="http://localhost:8080/webdirectprint/end.html";
  }).catch(function(err){
    location.href="http://localhost:8080/webdirectprint/error.html";
  })
}

function updateConfigFile(){
  sdp.updateConfigFile('http://localhost:8080/webdirectprint/xsvfweb.xml').then(function(res) {
    location.href="http://localhost:8080/webdirectprint/end.html";
  }).catch(function(err){
    location.href="http://localhost:8080/webdirectprint/error.html";
  });
}

function updateTraymap(){
  sdp.updateTraymap('http://localhost:8080/webdirectprint/traymap.xml').then(function(res) {
    location.href="http://localhost:8080/webdirectprint/end.html";
  }).catch(function(err){
    location.href="http://localhost:8080/webdirectprint/error.html";
  });
}

