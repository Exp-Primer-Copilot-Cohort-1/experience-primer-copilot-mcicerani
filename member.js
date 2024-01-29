function skillsMember() {
  this.name = 'John';
  this.age = 23;
  this.skills = ['HTML', 'CSS', 'JS'];
  this.address = {
    city: 'London',
    country: 'England'
  };
  this.getSkills = function() {
    return this.skills;
  };
}
  
