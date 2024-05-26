var weekMeet = {


    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());

        weekMeet.fn_searchData();


    },

    fn_searchData : function(){

        var parameters = {
            year : $("#year").val(),
        }

        
    },

}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}