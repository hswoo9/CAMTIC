var mainCt = {

    global : {

    },

    fnDefaultScript : function (){
        mainCt.fnCarDispatchOpenPop();
        $("#leaveTime").attr("disabled", "disabled");
        $("#attendTime").click(function(){
            // ex ) 2023년 01월 05일 관리자님 14:42분 출근 하셨습니다.
            alert("2023년 01월 05일 관리자님 \n 14:42분 출근 하셨습니다.");

            // 조건추가

            $("#attendTime").attr("disabled", "disabled");
            $("#leaveTime").removeAttr("disabled");

        });

        $("#leaveTime").click(function(){
            alert("퇴근");

            // 조건추가
            $("#attendTime").removeAttr("disabled");
            $("#leaveTime").attr("disabled", "disabled");
        });

    },

    fnCarDispatchOpenPop : function(){
        $("#workTimeSettingPop").kendoWindow({
            height: "350px",
            width : "500px",
            visible: false,
            title: '출/퇴근 체크',
            modal : true,
            actions: ["Close"]
        }).data("kendoWindow").center();
    },

    openPopWorkTimeSet : function (){
        $("#workTimeSettingPop").data("kendoWindow").open();
    }
}