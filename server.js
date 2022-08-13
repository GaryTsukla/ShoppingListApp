const express = require('express');
const app = express();
const path = require('path');
// Helper functions
const addPath = function (p) {
  return path.join(__dirname, p);
};
const setCache = function (r, seconds) {
  // Cache control means how long another server can keep a copy of our file for us
  r.set('Cache-Control', 'public, max-age=' + seconds);
};
const setCacheSend = function (r, seconds, file) {
  r.set('Cache-Control', 'public, max-age=' + seconds);
  r.sendFile(addPath(file));
};

// Set the render to use ejs
app.set('view engine', 'ejs');

// Static directories
app.use('/css', express.static(addPath('/css')));
app.use('/js', express.static(addPath('/js')));

// Individual files we want to send
//  h=header & request information
//  r=our response
app.get('/', (h, r) => {
  setCacheSend(r, 60, '/index.html');
});

// For ejs files, we use r.render instead of r.sendFile. The file to render must be in the views directory
/* app.get('/',(h,r)=>{
  setCache(r,60);
  r.render(addPath('index.ejs'));
}); */

// Throw 404 if no page found
app.use((h, r) => {
  r.status(404).sendFile(addPath('/index.html'));
});
const PORT = process.env.PORT || 8080;
app.listen(PORT);
