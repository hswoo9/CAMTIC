var bustrip = {
    global: {
        pageName: "",
        /** 기간 var */
        year: new Date().getFullYear(),
        month: new Date().getMonth()-1,
        afMonth: new Date().getMonth()+1,

        /** 관련사업 var */
        waypointArr: [],
        corpCardList: [],
    },

    fn_setPageName: function(){
        bustrip.global.pageName = $("#pageName").val();
    },

    /** 출장코드 세팅 */
    fn_tripCodeSet: function(){
        let tripCodeDataSource;
        tripCodeDataSource = [
            { label: "도내(시내)", value: "1" },
            { label: "도내(시외)", value: "2" },
            { label: "도외", value: "3" },
            { label: "해외", value: "4" }
        ]
        customKendo.fn_radioGroup("tripCode", tripCodeDataSource, "horizontal");
        $("#tripCode").data("kendoRadioGroup").value("1");

        $("#tripCode").data("kendoRadioGroup").bind("change", function(){
            if($("#tripCode").data("kendoRadioGroup").value() == 4){
                $("#carLine").css("display", "none");
                $("#carList").data("kendoDropDownList").select(0);
                $("#car1").prop("checked", true);
                business.fn_nationCodeSet();
                $(".bustripTh").hide();
                $(".businessTh").show();
                $("#crmYn").prop("checked", false);
                $("#visitCrm").data("kendoTextBox").enable(true);
                $("#crmBtn").attr('disabled', true);
            } else {
                $("#carLine").css("display", "");
                $(".bustripTh").show();
                $(".businessTh").hide();
                $("#crmYn").prop("checked", true);
                $("#visitCrm").data("kendoTextBox").enable(false);
                $("#crmBtn").attr('disabled', false);
            }
        })
    },

    /** 차량코드 세팅 */
    fn_carCodeSet: function(){
        const carArr = customKendo.fn_customAjax('/inside/getCarCode', {deptSeq: $("#regDeptSeq").val()}).list;
        carArr.push({text: "자가", value: "10"});
        carArr.push({text: "대중교통", value: "0"});
        customKendo.fn_dropDownList("carList", carArr, "text", "value", 2);

        $("#carList").data("kendoDropDownList").bind("change", function(){
            if($("#carList").data("kendoDropDownList").value() == "0"){
                $("#moveDst").val(0);
                $(".bustripTr").hide();
            } else {
                $(".bustripTr").show();

            }

            if($("#carList").data("kendoDropDownList").text() == "기타"){
                $("#inputWrap").show();
            } else {
                $("#inputWrap").hide();
            }
        })

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
                if(pageName == "bustripResultPop"){
                    $("#moveDst").attr("disabled", false);
                    $("#moveBtn").attr("disabled", false);
                }
            /** 없음 일때 경유지명 사라지게 */
            }else if($("#visitLocCode").val() == ""){
                $(".visitLocSub").hide();
                $(".visitMove").show();
                $(".visitMoveSpan").hide();
                if(pageName == "bustripResultPop"){
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
                if(pageName == "bustripResultPop"){
                    $("#moveDst").attr("disabled", true);
                    $("#moveBtn").attr("disabled", true);
                }
            }
        });
    },

    /** 해외출장 나라등급 세팅 */
    fn_nationCodeSet: function(){
        let nationCodeDataSource = [
            { name: "가", value: "1" },
            { name: "나", value: "2" },
            { name: "다", value: "3" },
            { name: "라", value: "4" }
        ]
        customKendo.fn_dropDownList("nationCode", nationCodeDataSource, "name", "value", 3);
    },

    /** 해외출장 여비구분 세팅 */
    fn_exnpCodeSet: function(){
        let exnpCodeDataSource = [
            { name: "일비(정액)", value: "1" },
            { name: "숙박비(최대한도)", value: "2" },
            { name: "식비(정액)", value: "3" }
        ]
        customKendo.fn_dropDownList("exnpCode", exnpCodeDataSource, "name", "value", 3);
    },

    /** 해외출장 직책구분 세팅 */
    fn_dutyCodeSet: function(){
        let dutyCodeDataSource = [
            { name: "부서장이상", value: "1" },
            { name: "팀장이하", value: "2" },
        ]
        customKendo.fn_dropDownList("dutyCode", dutyCodeDataSource, "name", "value", 3);
    },

    fn_realDriverSet: function(){
        let url = "";
        let data = {

        }
        if(hrBizReqResultId == ""){
            url = "/bustrip/getBustripTotInfo";
            data.hrBizReqId = hrBizReqId;
        }else{
            url = "/bustrip/getBustripResTotInfo";
            data.hrBizReqResultId = hrBizReqResultId;
        }
        let ds = customKendo.fn_customAjax(url, data);
        customKendo.fn_dropDownList("realDriver", ds.list, "EMP_NAME", "EMP_SEQ", "3");
    },

    /** 출장기간 세팅 */
    fn_periodSet: function(){
        customKendo.fn_datePicker("start_date", 'month', "yyyy-MM-dd", new Date(bustrip.global.year, bustrip.global.month, 1));
        customKendo.fn_datePicker("end_date", 'month', "yyyy-MM-dd", new Date(bustrip.global.year, bustrip.global.afMonth, 0));
        $("#start_date, #end_date").attr("readonly", true);
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
        $("#date1, #date2, #time1, #time2").attr("readonly", true);
    },

    /** 관련사업 세팅 */
    fn_busnLgSet: function(){
        let busnLgDataSource = [
            { label: "없음", value: "1" },
            { label: "있음", value: "2" }
        ]
        customKendo.fn_radioGroup("project", busnLgDataSource, "horizontal");
        $("#project").data("kendoRadioGroup").value("1");
        $("#project").data("kendoRadioGroup").bind("change", function(){
            if($("#project").data("kendoRadioGroup").value() != ""){
                // $("#busnName").data("kendoTextBox").enable(true);
            }else{
                $("#busnName").data("kendoTextBox").value("");
                $("#pjtSn").val("");
                // $("#busnName").data("kendoTextBox").enable(false);
            }
        })
    },

    /** 출장코드 조회 필터 */
    fn_tripCodeSearchSet: function(){
        let tripCodeDataSource = [
            { text: "도내(시내)", value: "1" },
            { text: "도내(시외)", value: "2" },
            { text: "도외", value: "3" },
            { text: "해외", value: "4" }
        ]
        customKendo.fn_dropDownList("tripCode", tripCodeDataSource, "text", "value", 1);
    },

    /** 관련사업 조회 필터 */
    fn_projectSearchSet: function(){
        let projectDataSource = [
            { text: "없음", value: "1" },
            { text: "있음", value: "2" }
        ]
        customKendo.fn_dropDownList("project", projectDataSource, "text", "value", 1);
    },

    /** 입금현황 조회 필터 */
    fn_depositStatSearchSet: function(){
        let depositStatDataSource = [
            { text: "입금예정", value: "N" }
        ]
        customKendo.fn_dropDownList("depositStat", depositStatDataSource, "text", "value", 1);
    },

    /** 그리드 컬럼 - 출장구분 */
    fn_getTripCodeText: function(row){
        const tripCode = row.TRIP_CODE;
        let tripCodeText = "";
        if(tripCode == 1){
            tripCodeText = "도내(시내)";
        }else if(tripCode == 2){
            tripCodeText = "도내(시외)";
        }else if(tripCode == 3){
            tripCodeText = "도외";
        }else if(tripCode == 4){
            tripCodeText = "해외";
        }
        return tripCodeText;
    },

    fileDel: function(e, v){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            $.ajax({
                url: "/common/commonFileDel",
                data: {
                    fileNo: e
                },
                type: "post",
                datatype: "json",
                success: function (rs) {
                    var rs = rs.rs;
                    alert(rs.message);
                    if(rs.code == "200"){
                        $(v).parent().hide();
                    }
                }
            });
        }
    },

    /** 첨부파일 */
    addFileInfoTable : function(){
        let size = 0;
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            fCommon.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < fCommon.global.attFiles.length; i++) {
                size = fCommon.bytesToKB(fCommon.global.attFiles[i].size);
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[0] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[1] + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td></td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="bustrip.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }
    },

    fnUploadFile : function(e) {
        let size = 0;
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(fCommon.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        fCommon.global.attFiles = dataTransfer.files;

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <fCommon.global.attFiles.length; i++) {
                size = fCommon.bytesToKB(fCommon.global.attFiles[i].size);
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[0] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[1] + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">';
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }else{
            $("#fileGrid").find(".addFile").remove();

            if($("#fileGrid").find("tr").length == 0){
                $("#fileGrid").html('<tr class="defultTr">' +
                    '	<td colspan="5" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }

        if(fCommon.global.attFiles.length == 0){
            fCommon.global.attFiles = new Array();
        }

    },

    commonFileDel: function(e, v){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            $.ajax({
                url: "/common/commonFileDel",
                data: {
                    fileNo: e
                },
                type: "post",
                datatype: "json",
                success: function (rs) {
                    var rs = rs.rs;
                    alert(rs.message);
                    if(rs.code == "200"){
                        $(v).closest("tr").remove();
                        if($("#fileGrid").find("tr").length == 0){
                            $("#fileGrid").html('<tr class="defultTr">' +
                                '	<td colspan="5" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>' +
                                '</tr>');
                        }
                    }
                }
            });
        }
    },

    getDuplBustrip: function(data){
        const result = customKendo.fn_customAjax("/bustrip/getDuplBustrip", data);
        const list = result.list;

        let flag = true;
        if(list.length > 0){
            flag = false
        }

        return flag;
    },

    getDuplMeetingCard: function(data){
        const result = customKendo.fn_customAjax("/bustrip/getDuplMeetingCard", data);
        const list = result.list;

        let flag = true;
        if(list.length > 0){
            flag = false
        }

        return flag;
    }
}