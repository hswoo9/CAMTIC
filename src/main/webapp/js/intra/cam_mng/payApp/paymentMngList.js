var paymentMngList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){

        paymentMngList.global.dropDownDataSource = [
            { text: "작성중", value: "0" },
            { text: "결재대기", value: "10" },
            { text: "결재완료", value: "100" },
        ]
        customKendo.fn_dropDownList("searchDept", paymentMngList.global.dropDownDataSource, "text", "value");

        paymentMngList.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "신청건명", value: "B" },
            { text: "거래처", value: "D" },
            { text: "프로젝트명", value: "C" },
        ]

        $("#payAppType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: ""},
                { text: "지급신청서", value: "1" },
                { text: "여입신청서", value: "2" },
                { text: "반납신청서", value: "3" },
                { text: "대체신청서", value: "4" },
            ]
        });



        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2)

        customKendo.fn_datePicker("payAppStrDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("payAppEndDe", "depth", "yyyy-MM-dd", new Date());

        customKendo.fn_dropDownList("searchKeyword", paymentMngList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        customKendo.fn_datePicker("payExnpDe", "depth", "yyyy-MM-dd", new Date());

        $("#payAppStrDe, #payAppEndDe").attr("readonly", true);

        $("#payAppStrDe").data("kendoDatePicker").bind("change", paymentMngList.gridReload);
        $("#payAppEndDe").data("kendoDatePicker").bind("change", paymentMngList.gridReload);
        $("#payAppType").data("kendoDropDownList").bind("change", paymentMngList.gridReload);
        $("#searchDept").data("kendoDropDownList").bind("change", paymentMngList.gridReload);
        paymentMngList.gridReload();
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="paymentMngList.fn_enxpChangeModal()">' +
                            '	<span class="k-button-text">지출예정일 변경</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="paymentMngList.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">지급신청서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="paymentMngList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="paymentMngList.fn_checkAll(this)"/>',
                    template : function (e){
                        if(e.ORG_YN == 'N'){
                            return "<input type='checkbox' id='payAppSn"+e.PAY_APP_SN+"' name='payChk' value='"+e.PAY_APP_SN+"'/>"
                        } else {
                            return "";
                        }
                    },
                    width: 30
                }, {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서유형",
                    width: 90,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 1){
                            return "지급신청서";
                        } else if (e.PAY_APP_TYPE == 2){
                            return "여입신청서";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "반납신청서";
                        } else if(e.PAY_APP_TYPE == 4){
                            return "대체신청서";
                        }
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 150,
                }, {
                    title: "신청건명",
                    field: "APP_TITLE",
                    width: 280,
                    template: function(e){
                        var status = "";
                        if(e.PAY_APP_TYPE == 1){
                            status = "rev";
                        } else if (e.PAY_APP_TYPE == 2){
                            status = "in";
                        } else if (e.PAY_APP_TYPE == 3){
                            status = "re";
                        } else if (e.PAY_APP_TYPE == 4){
                            status = "alt";
                        }

                        if(e.ORG_YN == 'N'){
                            return '<div style="cursor: pointer; font-weight: bold" onclick="paymentList.fn_reqRegPopup('+e.PAY_APP_SN+', \''+status+'\', \'user\')">'+e.APP_TITLE+'</div>';
                        } else {
                            return '<div style="cursor: pointer; font-weight: bold">'+e.APP_TITLE+'</div>';
                        }
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 240,
                    template: function(e){
                        var pjtNm = e.PJT_NM.toString().substring(0, 25);
                        return pjtNm;
                    }
                }, {
                    title: "신청자",
                    width: 80,
                    field: "EMP_NAME"
                }, {
                    title: "신청일",
                    width: 70,
                    field: "APP_DE",
                    template: function(e){

                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    title: "지출요청일",
                    width: 80,
                    field: "REQ_DE",
                    template : function(e){
                        if(e.EXNP_ISS != null && e.EXNP_ISS != "" && e.EXNP_ISS != undefined){
                            return '<a href="javascript:alert(\''+e.EXNP_ISS+'\')" style="font-weight: bold">'+e.REQ_DE+'</a>';
                        } else {
                            return e.REQ_DE
                        }
                    }
                }, {
                    title: "지출예정일",
                    width: 80,
                    field: "PAY_EXNP_DE"
                }, {
                    title: "지출완료일",
                    width: 80,
                    field: "REQ_END_DE",
                    template : function(e){
                        if(e.DOC_STATUS == "100"){
                            if(e.ITEM_COUNT == e.EXNP_DOC_STATUS && e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.EXNP_STATUS != 0 && e.EXNP_DOC_STATUS2 == 100){
                                return e.REQ_END_DE;
                            } else {
                                return "";
                            }
                        } else {
                            return "";
                        }
                    }
                },{
                    title: "지출금액",
                    width: 110,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "상태",
                    width: 70,
                    template : function(e){
                        console.log(e);
                        var stat = "";
                        if(e.DOC_STATUS == "100"){
                            stat = "결재완료"
                            if(e.ITEM_COUNT == e.EXNP_DOC_STATUS && e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.EXNP_DOC_STATUS2 == 100){
                                stat = "지출완료";
                            } else if(e.ITEM_COUNT != e.EXNP_DOC_STATUS && e.EXNP_DOC_STATUS != 0){
                                stat = "부분지출";
                            } else if (e.EXNP_STATUS != 0){
                                stat = "지출대기";
                            }
                        } else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "50"){
                            stat = "결재중"
                        } else if(e.DOC_STATUS == "30"){
                            stat = "반려"
                        } else {
                            stat = "작성중"
                        }

                        return stat;
                    }
                }, {
                    title : "삭제",
                    template : function(e){
                        if(e.REG_EMP_SEQ == $("#myEmpSeq").val()){
                            if(e.DOC_STATUS == 0){
                                return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="paymentMngList.fn_delReqReg('+e.PAY_APP_SN+', '+e.REG_EMP_SEQ+')">' +
                                    '	<span class="k-button-text">삭제</span>' +
                                    '</button>';
                            } else {
                                return "";
                            }
                        } else {
                            return "";
                        }
                    },
                    width: 60
                }, {
                    title : "결재선",
                    template : function(e){
                        if(e.REG_EMP_SEQ == $("#myEmpSeq").val()){
                            if(e.DOC_STATUS != 0){
                                return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docApproveLineView('+e.DOC_ID+');">' +
                                    '	<span class="k-icon k-i-hyperlink-open-sm k-button-icon"></span>' +
                                    '</button>';
                            } else {
                                return "";
                            }
                        } else {
                            return "";
                        }
                    },
                    width: 60
                }, {
                    title : "비용처리",
                    template : function(e){
                        return '<button type="button" class="k-button k-button-solid-info" onclick="paymentMngList.fn_reqRegPayPopup('+e.PAY_APP_SN+')">비용처리</button>';
                    },
                    width: 120
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function(){
        paymentMngList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            payAppType : $("#payAppType").val(),

            strDe : $("#payAppStrDe").val(),
            endDe : $("#payAppEndDe").val(),

            pageType : "USER",
        }

        paymentMngList.mainGrid("/pay/getPaymentList", paymentMngList.global.searchAjaxData);
    },

    fn_reqRegPopup : function(key, status, auth){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key;
        }
        if(status != null && status != ""){
            url += "&status=" + status;
        }
        if(auth != null && auth != ""){
            url += "&auth=" + auth;
        }
        url += "&vType=M";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_reqRegPayPopup : function(key, status, auth){
        var url = "/payApp/pop/regPayAppCostPop.do?payAppSn=" + key + "&auth=mng&status=rev&reqType=costProcess";
        if(key != null && key != ""){

        }
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_enxpChangeModal : function(){
        var flag = false
        $("input[name='payChk']:checked").each(function(){
            flag = true
        });

        if(!flag){
            alert("선택된 신청건이 없습니다.");
            return;
        }

        var dialog = $("#dialog").data("kendoWindow");

        dialog.center();
        dialog.open();
    },

    fn_changeExnpDe : function (){
        var checkValue = [];
        $("input[name='payChk']:checked").each(function(){
            checkValue.push($(this).val());
        });

        var data = {
            payAppSn : checkValue,
            payExnpDe : $("#payExnpDe").val()
        }

        $.ajax({
            url : "/pay/updExnpDe",
            type : "POST",
            data : data,
            dataType : 'json',
            traditional : true,
            success : function (rs){
                if(rs.code == 200){
                    alert("변경되었습니다.");

                    paymentMngList.gridReload();

                    $("#dialog").data("kendoWindow").close();
                }
            }
        });
    },

    // 삭제 function
    fn_delReqReg : function (key, owner){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        var checkValue = [];
        checkValue.push(key);

        var data = {
            payAppSn : checkValue,
        }

        $.ajax({
            url : "/pay/delPayApp",
            type : "POST",
            data : data,
            dataType : 'json',
            traditional : true,
            success : function (rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");

                    paymentMngList.gridReload();
                }
            }
        });

    },

    fn_checkAll : function(e){
        if($(e).is(":checked")) {
            $("input[name='payChk']").prop("checked", true);
        } else {
            $("input[name='payChk']").prop("checked", false);
        }
    },

    docApproveLineView : function (docId){
        var pop = "" ;
        var url = '/approval/approvalLineViewPop.do?docId='+docId+'&view=lineView';
        var width = "1000";
        var height = "355";
        windowX = Math.ceil( (window.screen.width  - width) / 2 );
        windowY = Math.ceil( (window.screen.height - height) / 2 );
        pop = window.open(url, '결재선 보기', "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", resizable=NO, scrollbars=NO");
    }
}