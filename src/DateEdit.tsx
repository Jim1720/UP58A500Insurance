 
/*

  DateEdit.tsx

*/

// keep var globals
var currentYear = 0;
var currentCentury = 0;
var currentYear2Digits = 0;


export function editDate(dateParmValue:any)
{
      // screen is 'claim' etc and will determine the year range that is if claim
      // date can be +/- 1 year. if 'register','update' date can be -90 years or now for
      // birth date or 1 month in future for medicare.

      var dateParm = { input: "", screen: "", valid: false, formatted: "", message: ""}

      dateParm = dateParmValue;

      let check = dateParm.input
      if(check.trim() ==='') {

        let lit = ''
        switch(dateParm.screen) {

            case 'register' : lit = "Birth Date"; break;
            case 'update'   : lit = "Birth Date"; break;
            case 'claim'   : lit = "Service Date"; break;

        }
        dateParm.message = `${lit} is blank`
        dateParm.valid = false;
        return dateParm
      }

       //setUp();
       let d = new Date();
       let currentYear = d.getFullYear();
       let currentYear2Digits = parseInt(currentYear.toString().substring(2,4));

      // edit screen
      var validScreen = dateParm.screen === "register" || dateParm.screen === "update"
                          || dateParm.screen === "claim";
      if(!validScreen) {

        dateParm.message = "invalid screen type.";
        dateParm.valid = false;
        return dateParm
      }

      //console.log('removing slashes ');
      // remove slashes
      var regularDate = intakeSlashes(dateParm.input);
      //console.log('date parm [' + dateParm.input + '] used in numeric check');
      //console.log('regular date [' + regularDate + ']');

      // todo: fix coding error here should be regularDate.
      // soft edit left in to verify issue was this
      //console.log("num check 1");
      var r = parseInt(dateParm.input);
    //  if(Number.isNaN(r)) {
    //        console.log("false error using input with possible slashes.");
    //  }

      // fixed logic should use date with slashes removed
      //console.log('num check 2');
      var s = parseInt(regularDate);
      if(Number.isNaN(s)) {
           dateParm.valid = false;
           // should have passed field lit to this method. xx date not numeric.
           // dateParm.message = "Date not numeric:" + s + ".";
           dateParm.message = "Date is invalid";
           return dateParm
      }


      var mm = regularDate.substring(0,2);
      var dd = regularDate.substring(2,4);
      var yy = regularDate.substring(4);

      //console.log("mm" + mm + ".");
      //console.log("dd" + dd + ".");
      //console.log("yy" + yy + ".");

      if(!editMonth(mm)) {
           dateParm.valid = false;
           dateParm.message = "date month invalid";
           return dateParm
      }

      if(!editYear(yy,dateParm.screen, currentYear)) {
           dateParm.valid = false;
           dateParm.message = "date year invalid";
           return dateParm
      }

      if(!editDay(dd, mm, yy)) {
            dateParm.valid = false;
            dateParm.message = "date day invalid";
            return dateParm
      }

      const needCenturyAddded = 2;
      if(yy.length === needCenturyAddded) {
         var century = addCentury(yy, currentYear2Digits);
         yy = century + yy;
      }

      var slash = "/";

      //
      //  var formattedDate = mm + slash + dd + slash + yy;

      var suffix = "T00:00:00";
      var dash = '-';

      // sample : yyyy-mm-ddT00:00:00 for sql server.

      //var formattedDate = yy + dash + mm + dash + dd + suffix;
 
      var formattedDate = mm + slash + dd + slash + yy

      dateParm.valid = true;
      dateParm.formatted = formattedDate;
      return dateParm

}


function setUp()
{
 
    let d = new Date();
    currentYear = d.getFullYear();
    currentYear2Digits = parseInt(currentYear.toString().substring(2,4));
}


function addCentury(y2Digits:string, currentYear2Digits:number)
{

    // TODO: det impact on lciam dates timing of prior edits...
    // we need to add century
    let  inputYear = parseInt(y2Digits);
    let  nextYear = currentYear2Digits + 1;
    let  useCentury = (inputYear > nextYear) ? "19" : "20";
    return useCentury;

}


function intakeSlashes(dateToEdit:string)
{
        // allow for dates like
        // 1/1/20:
        // rules. find 2 slashes
        // pad m,d with 0 if good rules
        // remove slashes leave year untouched
        // if fail rules just return origional value.

        // example: 1/1/20 gives 010120

        var slash = "/";
        var dateItems:any  = dateToEdit.split(slash);
        var haveEnoughItems = 3;
        if(dateItems.length < haveEnoughItems) {
            // no dashes or too few terms in date ; return date.
            return dateToEdit;
        }

        // m d y are in the dateItems array. pad m, d if needed...
        if (dateItems[0].length === 1) { dateItems[0] = "0" + dateItems[0] }; // pad m if 1 digit
        if (dateItems[1].length === 1) { dateItems[1] = "0" + dateItems[1] }; // pad d if 1 digit

        // do nothing with the year

        // return mmdd(year) without slashes.

        return dateItems[0] + dateItems[1] + dateItems[2];

}

 function editMonth(mm:string) {

        var month = parseInt(mm);
        var monthValid = month >= 1 && month <= 12;
        return monthValid;
}


function editDay(dd:string, mm:string, yy:string)  {

        var thirtyMonth = [4,6,9,11];
        var day = parseInt(dd);
        var month = parseInt(mm);
        var year = parseInt(yy);
        const feburary = 2;

        var dayLimit = 31;
        if(thirtyMonth.indexOf(month) > -1) {
            dayLimit = 30;
        }
        if(month === feburary) {

            dayLimit = (year % 4 === 0) ? 29 : 28;
        }
        var dayValid = (day > 0 && day <= dayLimit);
        return dayValid;
}


function editYear(yy:string, fromScreen:string, currentYear:number)  {

        var year = parseInt(yy);
        // reasonable check only.
        var len = yy.length;
        var validLength = len === 2 || len === 4;
        if(!validLength) { return false; }
        const centuryOmitted = 2;

        // fix rel 3 - get current year - avoid hard coded.
        var currentTime = new Date();
        var fullYear = currentTime.getFullYear().toString();
        var strThisYear = fullYear.substring(2,4);
        var thisYear = Number(strThisYear);
        var min = thisYear - 1;
        var max = thisYear + 1;

        if(len === centuryOmitted) {

            // registration can be any year since it is birth date
            // claim dates can be +1/-1 current year only
            // correspond with screen input...
            if(fromScreen === "claim" && (year < min || year > max))
            {
              return false;
            }
            return true;

        }

        const dateIncludesCentury = 4;
        if(len === dateIncludesCentury) {

            const earlyLimit = 1900;
            var currentYear = currentYear;
            var lastYear = currentYear - 1;
            var nextYear = currentYear + 1;
            // procedure dates
            if(fromScreen === "claim" && (year < lastYear || year > nextYear))
            {
               return false;
            }
            // birth date
            if((fromScreen === "register" || fromScreen === "update")
               && (year < earlyLimit || year > currentYear))
            {
               return false;
            }
            return true;
        }

        return false;

    }
