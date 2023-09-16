var bustrip = {
    global: {
        pageName: "",
        /** 기간 var */
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        afMonth: new Date().getMonth()+1,

        /** 관련사업 var */
        waypointArr: []
    },

    fn_setPageName: function(){
        bustrip.global.pageName = $("#pageName").val();
    },

    /** 출장코드 세팅 */
    fn_tripCodeSet: function(){
        let tripCodeDataSource = [
            { text: "도내(시내)", value: "1" },
            { text: "도내(시외)", value: "2" },
            { text: "도외", value: "3" },
            { text: "해외", value: "4" }
        ]
        customKendo.fn_dropDownList("tripCode", tripCodeDataSource, "text", "value", 2);
        $("#tripCode").data("kendoDropDownList").bind("change", function(){
            if($("#tripCode").val() == 4){
                $("#carLine").css("display", "none");
                $("#carList").data("kendoDropDownList").select(0);
                $("#car1").prop("checked", true);
            } else {
                $("#carLine").css("display", "");
            }
        })
    },

    /** 차량코드 세팅 */
    fn_carCodeSet: function(){
        const carArr = customKendo.fn_customAjax('/inside/getCarCode').list;
        customKendo.fn_dropDownList("carList", carArr, "text", "value", 2);
    },

    /** 경유지코드 세팅 */
    fn_waypointCodeSet: function(){
        const waypointArr = customKendo.fn_customAjax('/bustrip/getWaypointCostList').list;
        const pageName = bustrip.global.pageName;

        //bustrip.global.waypointArr = waypointArr;
        waypointArr.unshift({WAYPOINT_NAME: "없음", HR_WAYPOINT_INFO_SN: ""});
        waypointArr.push({WAYPOINT_NAME: "직접입력", HR_WAYPOINT_INFO_SN: "999"});
        customKendo.fn_dropDownList("visitLocCode", waypointArr, "WAYPOINT_NAME", "HR_WAYPOINT_INFO_SN", 3);

        $("#visitLocCode").data("kendoDropDownList").bind("change", function(){
            /** 직접입력 일때 경유지명 입력받게 */
            if($("#visitLocCode").val() == "999"){
                $(".visitLocSub").show();
                $(".visitMove").hide();
                $(".visitMoveSpan").hide();
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", false);
                    $("#moveBtn").attr("disabled", false);
                }
            /** 없음 일때 경유지명 사라지게 */
            }else if($("#visitLocCode").val() == ""){
                $(".visitLocSub").hide();
                $(".visitMove").show();
                $(".visitMoveSpan").hide();
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", false);
                    $("#moveBtn").attr("disabled", false);
                }
            /** 경유지 코드 선택 일때 km표시 */
            }else{
                $(".visitLocSub").hide();
                $(".visitMove").show();
                $(".visitMoveSpan").show();
                let code = $("#visitLocCode").data("kendoDropDownList").value();
                let distance = 0;
                for(let i=0; i<waypointArr.length; i++){
                    let pk = waypointArr[i].HR_WAYPOINT_INFO_SN;
                    if(pk == code){
                        distance = waypointArr[i].DISTANCE;
                    }
                }
                $("#moveDst").val(distance);

                $(".visitMoveSpan").text(distance+" km");
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", true);
                    $("#moveBtn").attr("disabled", true);
                }
            }
        });
    },

    /** 출장기간 세팅 */
    fn_periodSet: function(){
        customKendo.fn_datePicker("start_date", 'month', "yyyy-MM-dd", new Date(bustrip.global.year, bustrip.global.month, 1));
        customKendo.fn_datePicker("end_date", 'month', "yyyy-MM-dd", new Date(bustrip.global.year, bustrip.global.afMonth, 0));
    },

    /** 출장신청기간 세팅 */
    fn_reqDtSet: function(){
        customKendo.fn_datePicker("date1", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("date2", 'month', "yyyy-MM-dd", new Date());
        $("#date1").on("change", function(){
            if($(this).val() > $("#date2").val()){
                $("#date2").val($(this).val());
            }
        });
        $("#date2").on("change", function(){
            if($(this).val() < $("#date1").val()){
                $("#date1").val($(this).val());
            }
        });
        customKendo.fn_timePicker("time1", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("time2", '10', "HH:mm", "18:00");
    },

    /** 관련사업 세팅 */
    fn_busnLgSet: function(){
        let busnLgDataSource = [
            { text: "정부사업", value: "1" },
            { text: "민간사업", value: "2" }
        ]
        customKendo.fn_dropDownList("busnLgClass", busnLgDataSource, "text", "value", 7);

        $("#busnLgClass").data("kendoDropDownList").bind("change", function(){
            let bcDsUrl = "/common/commonCodeList";
            let bcDsData = {
                cmGroupCode: "BUSN_CLASS"
            }

            const pageName = bustrip.global.pageName;
            let type;
            if(pageName == "bustripList"){
                type = 1;
            }else if(pageName == "bustripReqPop"){
                type = 2;
            }

            const bcDs = customKendo.fn_customAjax(bcDsUrl, bcDsData);
            if(this.value() == "1"){
                $("#project").css("display", "");
                customKendo.fn_dropDownList("project", bcDs.rs.splice(0, 2), "CM_CODE_NM", "CM_CODE", type);
            }else if(this.value() == "2"){
                $("#project").css("display", "");
                customKendo.fn_dropDownList("project", bcDs.rs.splice(2, 3), "CM_CODE_NM", "CM_CODE", type);
            }else{
                $("#project").kendoDropDownList();
                $("#project").data("kendoDropDownList").wrapper.hide();
                $("#busnLine").css("display", "none");
            }

            $("#project").data("kendoDropDownList").bind("change", function(){
                if(this.value() == 0 || this.value() == ""){
                    $("#busnLine").css("display", "none");
                }else{
                    $("#busnLine").css("display", "");
                }
            });
        });
    }
}