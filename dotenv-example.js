console.log('No value for Port yet:', process.env.PORT);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
console.log('Now the value for Port is:', process.env.PORT);