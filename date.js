exports.getDate = function(){
  const today = new Date();
  const format = {weekday:"long", day:"numeric", month:"long"};

  return today.toLocaleDateString("en-US", format);
}
