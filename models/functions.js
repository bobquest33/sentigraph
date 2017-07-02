Date.prototype.addHours = function(h) {    
   this.setTime(this.getTime() + (h*60*60*1000)); 
   return this;   
}

exports.getDateForNames = function(hours) {
        var d = new Date();
                d.addHours(hours||0);

        var  year = d.getFullYear().toString().split('').splice(2,2).join(''),
                month = d.getMonth() + 1,
                date = d.getDate(),
                hours = d.getHours(),
                num;

        if(month < 10) {
                month = "0" + month.toString();
        }

        if(date < 10) {
                date = "0" + date.toString();
        }

        if(hours < 10) {
                hours = "0" + hours.toString();
        }

        num = year.toString() + month.toString() + date.toString() + hours.toString();
        return num;
};
