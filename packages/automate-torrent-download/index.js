const drivelist = require('drivelist');
const prettyBytes = require('pretty-bytes');
const { inspect } = require('util');
const path = require('path');
const fs = require('fs');

drivelist.list((error, drives) => {
  if (error) {
    throw error;
  }
 
  console.log(inspect(drives, { depth: null }));

  const [ , usb] = drives;
  const { mountpoints: [ { path: dir } ], size } = usb;
  console.log(prettyBytes(size))
  /* const filePath = path.resolve(dir, 'hello.txt');
  const writeStream = fs.createWriteStream(filePath);
  writeStream.write("hello");
  writeStream.end(); */
});