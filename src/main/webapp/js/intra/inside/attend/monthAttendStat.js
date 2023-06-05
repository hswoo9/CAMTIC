/**
 * 2023.06.04
 * 작성자 : 김지혜
 * 내용 : 근태관리 - 월별근태보고
 */

var monthAttendStat = {
    global : {
        now: new Date()
    },

    fn_defaultScript: function () {

        $("#datePicker").kendoDatePicker({
            value: new Date(),
            start: "year",
            depth: "year",
            format: "yyyy-MM",
            width: "150px"
        });
    }
}

