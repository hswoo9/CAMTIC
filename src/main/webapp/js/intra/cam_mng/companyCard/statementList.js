let sumAmt = 0;
var statementList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },


    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date().getFullYear()+"-01-01");
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date().getFullYear()+"-12-31");

        statementList.global.dropDownDataSource = [
            { text : "카드번호", value : "CARD_NUM" },
            { text : "반출자", value : "USER_NAME" },
        ]
        customKendo.fn_dropDownList("searchKeyword", statementList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", statementList.mainGrid());

        $("#regHistYn").kendoDropDownList({
            dataSource : [
                {text : "선택하세요", value : ""},
                {text : "등록", value : "Y"},
                {text : "미등록", value : "N"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });




        statementList.mainGrid();
    },

    gridReload: function (){
        statementList.mainGrid();
    },

    mainGrid: function(){

        var mainGrid = $("#mainGrid").data("kendoGrid");

        if(mainGrid != null){
            mainGrid.destroy();
        }

        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getCardTOData',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.regHistYn = $("#regHistYn").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : statementList.onDataBound,
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="statementList.fn_regCardToPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="statementList.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, /*{
                    field: "",
                    title: "카드구분",
                    width: 100
                },*/ {
                    field: "LAST_CARD_NUM",
                    title: "카드번호",
                    width: 80
                }, {
                    field: "CARD_TO_DE",
                    title: "반출일자",
                    width: 80,
                    template: function(e){
                        return e.CARD_TO_DE;
                    }
                }, {
                    field: "USE_EMP_NAME",
                    title: "반출자",
                    width: 80
                }, {
                    field: "CARD_TO_PURPOSE",
                    title: "반출목적",
                    width: 100
                }, {
                    field: "",
                    title: "사용내역등록",
                    width: 100,
                    template: function(e){
                        if(e.REG_HISTORY > 0){
                            return "등록";
                        } else {
                            return "미등록";
                        }
                    }
                }, {
                    field: "",
                    title: "사용내역",
                    width: 300,
                    template: function(e){
                        if(e.REG_HISTORY > 0){
                            if(e.REG_HISTORY == 1){
                                return e.LAST_MER_NM;
                            } else {
                                return e.LAST_MER_NM + "외 " + Number(e.REG_HISTORY - 1) + "건";
                            }
                        } else {
                            return "미등록";
                        }
                    }
                }, {
                    field: "",
                    title: "사용금액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: right;">' + comma(e.SUM_AMT) + '</div>';
                    }
                }, {
                    field: "",
                    title: "반납일시",
                    width: 100,
                    template: function(e){
                        var cardFromTime = "";
                        if(e.CARD_FROM_TIME != null && e.CARD_FROM_TIME != "" && e.CARD_FROM_TIME != undefined){
                            cardFromTime = " " + e.CARD_FROM_TIME
                        }
                        if(e.REG_HISTORY > 0 && e.RT_YN == 'Y'){
                            return e.CARD_FROM_DE + cardFromTime
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "사용이력등록",
                    width: 80,
                    template: function(e){
                        if(e.USE_EMP_SEQ == $("#myEmpSeq").val()){
                            if(e.RT_YN == 'N'){
                                return '<button type="button" class="k-button k-button-solid k-button-solid-info" onclick="statementList.fn_addCardHist('+e.CARD_TO_SN+')">추가</button>'
                            } else {
                                return '<button type="button" class="k-button k-button-solid k-button-solid-info" disabled>추가</button>'
                            }
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "반납",
                    width: 80,
                    template: function(e){
                        console.log(e);
                        if(e.USE_EMP_SEQ == $("#myEmpSeq").val()){
                            if(e.RT_YN == 'N'){
                                return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.fn_updCardTi('+e.CARD_TO_SN+', \''+e.CARD_TO_DE+'\', \''+e.CARD_BA_NB+'\')">반납</button>'
                            } else {
                                return '<button type="button" class="k-button k-button-solid k-button-solid-base" disabled>반납</button>'
                            }
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "기타",
                    width: 80,
                    template: function(e){
                        if(e.USE_EMP_SEQ == $("#myEmpSeq").val()){
                            if(e.RT_YN == 'N'){
                                return '<button type="button" class="k-button k-button-solid k-button-solid-error" onclick="statementList.fn_del('+e.CARD_TO_SN+')">삭제</button>'
                            } else {
                                return '<button type="button" class="k-button k-button-solid k-button-solid-error" disabled>삭제</button>'
                            }
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "",
                    width: 120,
                    template: function(e){
                        if(e.REG_HISTORY == 0 && e.CARD_TO_PURPOSE != "회의"){
                            return "";
                        }

                        if(e.USE_EMP_SEQ == $("#myEmpSeq").val()){
                            if(e.RT_YN == 'Y'){
                                if(e.CARD_TO_PURPOSE == "출장"){
                                    if(e.HR_BIZ_REQ_RESULT_ID != null && e.HR_BIZ_REQ_RESULT_ID != "" && e.HR_BIZ_REQ_RESULT_ID != undefined){
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-info" onclick="statementList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.FR_KEY+', '+e.TRIP_CODE+')">출장결과보고</button>'
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.popBustripRes(\'N\', '+e.FR_KEY+', '+e.TRIP_CODE+')">출장결과보고</button>'
                                    }
                                } else if (e.CARD_TO_PURPOSE == "구매"){
                                    if(e.FR_KEY != null && e.FR_KEY != "" && e.FR_KEY != undefined){
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-info" onclick="statementList.fn_purcPopup('+e.FR_KEY+')">구매요청서</button>'
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.fn_purcPopup()">구매요청서 작성</button>'
                                    }
                                } else if (e.CARD_TO_PURPOSE == "영업"){
                                    if(e.FR_KEY != null && e.FR_KEY != "" && e.FR_KEY != undefined){
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-info" onclick="statementList.fn_reqRegPopup('+e.FR_KEY+')">지급신청서</button>'
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.fn_reqRegPopup(\'\', \'\', \'\', '+ e.CARD_TO_SN + ')">지급신청서 작성</button>'
                                    }
                                } else if (e.CARD_TO_PURPOSE == "식대"){
                                    if(e.FR_KEY != null && e.FR_KEY != "" && e.FR_KEY != undefined){
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-info" onclick="statementList.snackPopup('+e.FR_KEY+')">식대</button>'
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.snackPopup(\'\', \'\', '+e.CARD_TO_SN+')">식대 등록</button>'
                                    }
                                } else {
                                    if(e.FR_KEY != null && e.FR_KEY != "" && e.FR_KEY != undefined){
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-info" onclick="statementList.fn_reqRegPopup('+e.FR_KEY+')">지급신청서</button>'
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.fn_reqRegPopup(\'\', \'\', \'\', '+ e.CARD_TO_SN + ', \''+e.PJT_CD+'\', \''+e.PJT_NM+'\')">지급신청서 작성</button>'
                                    }
                                }
                            } else {
                                if(e.CARD_TO_PURPOSE == "회의"){
                                    if(e.FR_KEY != null && e.FR_KEY != "" && e.FR_KEY != undefined){
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.fn_regMeetingPop('+e.CARD_TO_SN+','+e.FR_KEY+')">사전승인신청서</button>'
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.fn_regMeetingPop('+e.CARD_TO_SN+')">사전승인신청서 작성</button>'
                                    }
                                } else {
                                    return "";
                                }
                            }
                        } else {
                            return "";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainHistGrid: function(){
        var mainHistGrid = $("#mainHistGrid").data("kendoGrid");

        if(mainHistGrid != null){
            mainHistGrid.destroy();
        }

        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getCardTOHistList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.cardToSn = $("#cardToSn").val()
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainHistGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                /*{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="statementList.fn_addCardHist($(\'#cardToSn\').val())">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                },*/ {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="statementList.mainHistGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "승인일시",
                    width: 130,
                    template : function (e){
                        return e.AUTH_DD.substring(0, 4) + "-" + e.AUTH_DD.substring(4, 6) + "-" + e.AUTH_DD.substring(6, 8) + " " + e.AUTH_HH.substring(0, 2) + ":" + e.AUTH_HH.substring(2, 4) + ":" + e.AUTH_HH.substring(4, 6);
                    }
                }, {
                    title: "승인번호",
                    width: 80,
                    template : function (e){
                        return e.AUTH_NO;
                    }
                }, {
                    title: "사용처",
                    field: "MER_NM",
                    width: 250
                }, {
                    title: "사업자번호",
                    field : "MER_BIZNO",
                    width: 120,
                    template : function(e){
                        return e.MER_BIZNO.substring(0, 3) + "-" + e.MER_BIZNO.substring(3, 5) + "-" + e.MER_BIZNO.substring(5, 11);
                    }
                }, {
                    title: "카드번호",
                    field: "CARD_NO",
                    width: 160,
                    template : function (e){
                        return e.CARD_NO.substring(0,4) + "-" + e.CARD_NO.substring(4,8) + "-" + e.CARD_NO.substring(8,12) + "-" + e.CARD_NO.substring(12,16);
                    },
                    footerTemplate: "합계"
                }, {
                    title: "금액",
                    width: 120,
                    template : function(e){
                        sumAmt  += Number(uncomma(e.AUTH_AMT));
                        return '<div style="text-align: right;">' + comma(e.AUTH_AMT) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(sumAmt)+"</div>";
                    }
                }, {
                    title: "기타",
                    width: 80,
                    template : function (e){
                        console.log(e);
                        var rtYn = e.RT_YN;
                        if(rtYn == 'Y'){
                            return '<button type="button" class="k-button k-button-solid k-button-solid-error" disabled onclick="statementList.fn_histDel('+e.CARD_TO_HIST_SN+')">삭제</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid k-button-solid-error" onclick="statementList.fn_histDel('+e.CARD_TO_HIST_SN+')">삭제</button>';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            // const key = dataItem.CARD_TO_SN;
            // statementList.fn_regCardToPop(key);
            sumAmt = 0;
            $("#cardToSn").val(dataItem.CARD_TO_SN);

            grid.tbody.find("tr").each(function (){
                $(this).css("background-color", "");
            });

            $("#mainHistGrid").css("display", "");


            $(this).css("background-color", "#a7e1fc");

            statementList.mainHistGrid();
        });
    },

    onDataBoundSelect: function(sn){
        $("#cardToSn").val(sn);
        var grid = $("#mainGrid").data("kendoGrid");

        if (grid.tbody) {
            grid.tbody.find("tr").each(function (){
                var dataItem = grid.dataItem(this);

                if(dataItem.CARD_TO_SN == sn){
                    $(this).css("background-color", "#a7e1fc");

                    $("#mainHistGrid").css("display", "");

                    statementList.mainHistGrid();
                }
            })
        }
    },

    fn_regCardToPop : function(key){
        var url = "/card/regCardToPop.do";

        if(key != null && key != "" && key != undefined){
            url += "?cardToSn=" + key;
        }
        var name = "_blank";
        var option = "width = 900, height = 560, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_del : function(key){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var parameters = {
            cardToSn : key,
        }

        $.ajax({
            url : "/card/delCardTo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");
                    statementList.mainGrid();
                    $("#mainHistGrid").css("display", "none");
                }
            }
        });
    },

    fn_histDel : function (key) {
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        var parameters = {
            cardHistSn : key
        };

        $.ajax({
            url : "/card/delCardHist",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    statementList.mainHistGrid();
                }
            }
        });
    },

    fn_addCardHist: function(key, endDt){
        var url = "/card/pop/cardToHist.do?cardToSn=" + key;

        if(endDt != null && endDt != "" && endDt != undefined){
            url += "&cardFromDe=" + endDt;
        }

        var name = "_blank";
        var option = "width = 1000, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },

    fn_updCardTi : function (key, toDe, cardBaNb){

        var rs = customKendo.fn_customAjax("/card/getCardTOHistList", {cardToSn: key});
        console.log(rs.list.length);

        if(rs.list.length == 0){
            if(!confirm("사용내역이 등록되지 않았습니다.\n반납하시겠습니까?")){
                return;
            }
        }
        statementList.fn_updCardTi2(key, toDe, cardBaNb);
    },

    fn_updCardTi2 : function (key, toDe, cardBaNb){
        var returnDialog = $("#returnDialog").data("kendoWindow");

        returnDialog.center();
        returnDialog.open();

        // $("#cardFromDe").val(toDe);
        $("#tmpCardToDe").val(toDe);
        $("#cardToSnModal").val(key);
        $("#tmpCardBaNb").val(cardBaNb);
    },

    fn_updFromDe : function (){

        // var data = {
        //     startDt: $("#tmpCardToDe").val(),
        //     endDt: $("#cardFromDe").val(),
        //     cardToSn : $("#cardToSnModal").val(),
        //     searchValue : $("#tmpCardBaNb").val(),
        // }
        // var result = customKendo.fn_customAjax("/card/cardToUseList", data);
        //
        // console.log(result);

        // if(result.list.length > 0){
        //     if(!confirm("[해당 카드 사용내역이 있습니다.] \n사용내역 등록 후 반납처리하시기 바랍니다.")) {
        //         return;
        //     } else {
        //         statementList.fn_addCardHist(data.cardToSn, data.endDt);
        //         $("#returnDialog").data("kendoWindow").close();
        //     }
        // } else {
            if(!confirm("반납처리 하시겠습니까?")){
                return;
            }

            var data = {
                cardToSn : $("#cardToSnModal").val(),
                cardFromDe : $("#cardFromDe").val(),
                cardFromTime: $("#cardFromTime").val(),
            }

            $.ajax({
                url : "/card/updCardFromDe",
                data : data,
                type : "post",
                dataType: "json",
                success : function(rs){
                    if(rs.code == 200){
                        alert("반납처리 되었습니다.");

                        $("#returnDialog").data("kendoWindow").close();
                        statementList.mainGrid();
                    }
                }
            });
        // }
    },

    popBustripRes: function(e, d, t) {
        if(e == "N"){
            var url = "/bustrip/pop/bustripResultPop.do?hrBizReqId="+d+"&tripType="+t;
        }else{
            var url = "/bustrip/pop/bustripResultPop.do?hrBizReqResultId="+e+"&hrBizReqId="+d+"&tripType="+t;;
        }
        var name = "bustripResListPop";
        var option = "width=1200, height=795, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    fn_purcPopup : function(key){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key;
        }
        var name = "blank";
        var option = "width = 1820, height = 820, top = 100, left = 400, location = no";;
        var popup = window.open(url, name, option);
    },

    fn_reqRegPopup : function(key, status, auth, cardToSn, pjtCd, pjtNm){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key;

            if(cardToSn != null && cardToSn != ""){
                url += "&cardToSn=" + cardToSn;
            }
        } else {
            if(cardToSn != null && cardToSn != ""){
                url += "?cardToSn=" + cardToSn;

                if(pjtCd != null && pjtCd != ""){
                    url += "&cardPjtCd=" + pjtCd;
                }

                if(pjtNm != null && pjtNm != ""){
                    url += "&cardPjtNm=" + pjtNm;
                }
            }
        }
        if(status != null && status != ""){
            url += "&status=" + status;
        }
        if(auth != null && auth != ""){
            url += "&auth=" + auth;
        }


        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    snackPopup: function(snackInfoSn, mode, cardToSn){
        let urlParams = "";
        if(!isNaN(snackInfoSn) && snackInfoSn != null && snackInfoSn != ""){
            // if(urlParams == "") {
            //     urlParams += "?";
            // }else {
            //     urlParams += "&";
            // }
            // urlParams += "snackInfoSn=" + snackInfoSn;

            open_in_frame('/Inside/snackList.do');
            return;
        }
        if(mode != null && mode != "") {
            if(urlParams == "") {
                urlParams += "?";
            }else {
                urlParams += "&";
            }
            urlParams += "mode=" + mode;
        }

        if(cardToSn != null && cardToSn != "") {
            if(urlParams == "") {
                urlParams += "?";
            }else {
                urlParams += "&";
            }
            urlParams += "cardToSn=" + cardToSn;
        }
        const url = "/Inside/pop/snackPop.do"+urlParams;
        const name = "popup test";
        const option = "width = 1100, height = 700, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_regMeetingPop: function (key, frKey){
        var url = "/card/pop/regMeeting.do?cardToSn=" + key + "&metSn=" + frKey;

        if(frKey == null || frKey == "" || frKey == undefined){
            url = "/card/pop/regMeeting.do?cardToSn=" + key;
        }
        var name = "_blank";
        var option = "width = 1000, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    }
}