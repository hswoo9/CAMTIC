var dsptReq = {

    global : {
        carList : [],
        fileFlag : false,
        dsptReqFlag : true,
    },

    fnDefaultScript : function(){
        dsptReq.fnCarDispatchOpenPop();
        // 차량 선택 (운행 가능한 차량 List 조회)
        $.ajax({
            url : getContextPath() + "/etc/getCarList",
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs){
                dsptReq.global.carList = rs.list;
            }
        });


        // 차량 선택 DropdownList
        $("#carSel").kendoDropDownList({
            autoWidth: true,
            clearButton: false,
            dataTextField: "CAR_FULL",
            dataValueField: "CAR_NO",
            optionLabel: {
                CAR_FULL: "전체",
                CAR_NO : ""
            },
            dataSource: dsptReq.global.carList,
            index: 0,
            change : function(){

                if($("#carSel").val() != "" && $("#carSel").val() != null){
                    $("#dispatchHist").removeAttr("disabled");

                } else {
                    $("#dispatchHist").attr("disabled", "disabled");
                }
            }
        });

        $("#dispatchHist").attr("disabled", "disabled");

        // 신청일, 사용기간 시작일 Kendo DatePicker 셋팅
        $("#useDay, #startDay, #endDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        // 시작시간 kendoTimePicker 셋팅
        $("#startTime").kendoTimePicker({
            dateInput: true,
            culture : "ko-KR",
            value: "09:00 AM"
        });

        // 종료시간 kendoTimePicker 셋팅
        $("#endTime").kendoTimePicker({
            dateInput: true,
            culture : "ko-KR",
            value: "18:00 PM"
        });

        // 사용목적 kendoTextBox 셋팅
        setKendoTextBox(['usePurpose']);

        // kendoUpload Setting
        dsptReq.initUpload();

        $("#updBtn").on("click", function(e){


            var data = {
                lastUserId : $("#loginId").val(),
                lastUserName : $("#loginName").val(),
                carNo : $("#carSel").val(),
                applyDate : $("#useDay").val(),
                useStrDay : $("#startDay").val(),
                useStrTime : $("#startTime").val().split(" ")[0],
                useEndDay : $("#endDay").val(),
                useEndTime : $("#endTime").val().split(" ")[0],
                memo : $("#usePurpose").val()
            }
            if(data.carNo == null || data.carNo == "") {
                alert("차량을 선택해주세요.");
                return;
            }

            dsptReq.insDsptReqDet(data);

            if(dsptReq.global.dsptReqFlag){
                if ($("#files").closest('.k-upload').find('.k-file').length > 0) {
                    e.preventDefault();

                    var upload = $("#files").data("kendoUpload");
                    upload.upload();
                } else {
                    alert("배차신청이 완료되었습니다.");
                    location.reload();
                }
            }

        });

        dsptReq.mainGrid();
    },

    mainGrid : function(){
        var dataSource = new kendo.data.DataSource({
            serverPaging: true,
            pageSize: 10,
            transport: {
                read : {
                    url : getContextPath() + "/etc/getDsptHist",
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    // data.empSeq = $("#empSeq").val();
                    // data.carNo = $("#carSel").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    record = data.totalCount;

                    return record;
                },
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource : dataSource,
            height: 550,
            sortable: true,
            pageable : {
                refresh : true,
                pageSizes : [10, 20, 50, 100],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection: true,
            columns : [
                {
                    title : "사용기간",
                    width : 150,
                    template: function(e){
                        if(e.USE_STR_DAY != null && e.USE_STR_DAY != ""){
                            return e.USE_STR_DAY + " " + e.USE_STR_TIME + "<br>" + e.USE_END_DAY + " " + e.USE_END_TIME;
                        }else {
                            return ""
                        }
                    }
                }, {
                    title : "신청자",
                    field : "EMP_NAME_KR"
                }, {
                    title : "신청일",
                    field : "APPLY_DATE"
                }, {
                    title : "사유",
                    field : "MEMO1"
                }, {
                    title : "반납일",
                    template: function(e){
                        if(e.RETURN_DATE != null && e.RETURN_DATE != ""){
                            return e.RETURN_DATE + " " + e.RETURN_TIME;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title : "운행거리(KM)",
                    template:function(e){
                        if(e.USE_KM != null && e.USE_KM != ""){
                            return e.USE_KM + "km";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title : "주유유무",
                    template : function(e){
                        if(e.OIL_SUP_CODE != null && e.OIL_SUP_CODE != ""){
                            return e.OIL_SUP_CODE;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title : "주유비",
                    template : function(e){
                        if(e.OIL_SUP_AMT != null && e.OIL_SUP_AMT != ""){
                            return e.OIL_SUP_AMT;
                        } else {
                            return "";
                        }
                    }
                }
            ]
        });
    },

    fnDispatchHist: function(){
        $("#carDispatchPop").data("kendoWindow").open();

        var data ={
            carNo : $("#carSel").val(),
        }

        $.ajax({
            url : getContextPath() + "/etc/getDsptCarInfo",
            data : data,
            type : "post",
            success : function (e){
                $("#repCarNo").text(e.list.CAR_NO);
                $("#repCarName").text(e.list.CAR_NAME);
                var carBuyPurc = "";

                if(e.list.CAR_BUY_CODE == "B"){
                    carBuyPurc = "렌탈";
                } else if (e.list.CAR_BUY_CODE == "A"){
                    carBuyPurc = "구매";
                }
                $("#repCarBuyCode").text(carBuyPurc);

                var carOilVal = "";
                if(e.list.CAR_OIL_CODE == "1"){
                    carOilVal = "휘발유";
                }else if (e.list.CAR_OIL_CODE == "2"){
                    carOilVal = "경유";
                } else if (e.list.CAR_OIL_CODE == "3"){
                    carOilVal = "전기"
                }
                $("#repCarOilCode").text(carOilVal);

                if(e.list.MEMO1 != null && e.list.MEMO1 != ""){
                    $("#repMemo1").text(e.list.MEMO1);
                }
            }
        });

        var dsptHistDataSource = new kendo.data.DataSource({
            serverPaging: true,
            pageSize: 10,
            transport: {
                read : {
                    url : getContextPath() + "/etc/getDsptHist",
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    // data.empSeq = $("#empSeq").val();
                    data.carNo = $("#carSel").val();

                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    record = data.totalCount;

                    return record;
                },
            }
        });

        $("#carDsptHistGrid").kendoGrid({
            dataSource : dsptHistDataSource,
            height: 550,
            sortable: true,
            pageable : {
                refresh : true,
                pageSizes : [10, 20, 50, 100],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection: true,
            columns : [
                {
                    title : "사용기간",
                    width : 150,
                    template: function(e){
                        if(e.USE_STR_DAY != null && e.USE_STR_DAY != ""){
                            return e.USE_STR_DAY + " " + e.USE_STR_TIME + "<br>" + e.USE_END_DAY + " " + e.USE_END_TIME;
                        }else {
                            return ""
                        }
                    }
                }, {
                    title : "신청자",
                    field : "EMP_NAME_KR"
                }, {
                    title : "신청일",
                    field : "APPLY_DATE"
                }, {
                    title : "사유",
                    field : "MEMO1"
                }, {
                    title : "반납일",
                    template: function(e){
                        if(e.RETURN_DATE != null && e.RETURN_DATE != ""){
                            return e.RETURN_DATE + " " + e.RETURN_TIME;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title : "운행거리(KM)",
                    template:function(e){
                        if(e.USE_KM != null && e.USE_KM != ""){
                            return e.USE_KM + "km";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title : "주유유무",
                    template : function(e){
                        if(e.OIL_SUP_CODE != null && e.OIL_SUP_CODE != ""){
                            return e.OIL_SUP_CODE;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title : "주유비",
                    template : function(e){
                        if(e.OIL_SUP_AMT != null && e.OIL_SUP_AMT != ""){
                            return e.OIL_SUP_AMT;
                        } else {
                            return "";
                        }
                    }
                }
            ]
        });
    },

    // 배차내역 이력조회 팝업
    fnCarDispatchOpenPop : function(){
        $("#carDispatchPop").kendoWindow({
            height: "750px",
            width : "900px",
            visible: false,
            title: '배차내역 이력조회',
            modal : true,
            actions: ["Close"]
        }).data("kendoWindow").center();
    },

    // fileupload > onchange
    onChange : function(){
        var upload = $("#files").getKendoUpload();
        upload.destroy();

        dsptReq.initUpload();
    },

    // Dispatch Request Info Insert Function
    insDsptReqDet : function(e){

        $.ajax({
            url : getContextPath() + "/etc/insDsptReqDet",
            data: e,
            type : "post",
            async: false,
            dataType: "json",
            success : function(e){
                console.log(e);
                if(e.rs.valid == "FALSE"){
                    alert("이미 신청된 내역이 있습니다.");
                    dsptReq.global.dsptReqFlag = false;
                } else {
                    $("#tmpPk").val(e.rs.carId);
                }
            },
            error : function (e){
                return;
            }
        });
    },

    // kendo Upload Function
    initUpload : function(){
        var validation = {};
        $("#files").kendoUpload({
            async : {
                saveUrl : getContextPath() + "/etc/insDsptReqFile",
                removeUrl : "",
                autoUpload : false
            },
            localization : {
                select : "파일업로드",
                dropFilesHere : ""
            },
            upload: function(e){
                e.data = {frKey : $("#tmpPk").val()}
            },
            success : dsptReq.onSuccess,
            complete : dsptReq.onComplete
        }).data("kendoUpload");
    },

    // kendo File Upload Success Function
    onSuccess : function(e){
        if(e.operation == "upload"){
            dsptReq.global.fileFlag = true;
        }
    },

    onComplete : function (){
        if(dsptReq.global.fileFlag){
            alert("배차신청이 완료되었습니다.");
            location.reload();
        }
    }
}
