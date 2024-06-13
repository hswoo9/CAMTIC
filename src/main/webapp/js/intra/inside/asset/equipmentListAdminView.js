var now = new Date();

var equipmentListAdminView = {

    init : function(){
        equipmentListAdminView.dataSet();
        equipmentListAdminView.mainGrid();
    },

    dataSet() {
        $("#usePdStrDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#usePdEndDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() + 2))

        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "담당자", value: "1" },
                { text: "작업내용", value: "2" },
                { text: "의뢰업체", value: "3" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
        $("#searchVal").on("keyup", function(key){
            if(key.keyCode == 13){
                equipmentListAdminView.mainGrid();
            }
        })
        $.ajax({
            url : "/asset/getEqipmnList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '전체', VALUE: ''});

                $("#mainEqipmnGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                })
            }
        })

        $.ajax({
            url : "/asset/getPrtpcoGbnNameList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '전체', VALUE: ''});

                $("#mainPrtpcoGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                })
            }
        })

    },

    mainGrid : function(e) {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/asset/getEqipmnUseList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {

                    data.usePdStrDe = $("#usePdStrDe").val().replaceAll('-','');
                    data.usePdEndDe = $("#usePdEndDe").val().replaceAll('-','');
                    data.eqipmnGbnCmmnCdSn = $("#mainEqipmnGbnName").getKendoDropDownList().value();
                    data.prtpcoGbnSn = $("#mainPrtpcoGbnName").getKendoDropDownList().value();
                    var searchType = $("#searchType").getKendoDropDownList().value()
                    if(searchType == 1) {
                        data.searchText = "A.USER_NAME"
                    }else if(searchType == 2) {
                        data.searchText = "A.OPER_CN"
                    }else if(searchType == 3) {
                        data.searchText = ""
                    }
                    /*data.searchText = "A.USER_NAME"*/
                    data.searchVal = $("#searchVal").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.rs;
                },
                total: function (data) {
                    return data.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 538,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name: '',
                    text: '마감상태 변경',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="equipmentListAdminView.selectChkEnd();">' +
                            '   <span class="k-button-text">마감상태 변경</span>' +
                            '</button>';
                    }
                }, {
                    name: '',
                    text: '장비관리',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="equipmentListAdminView.equipmentmangePopup();">' +
                            '   <span class="k-button-text">장비관리</span>' +
                            '</button>';
                    }
                }, {
                    name: '',
                    text: '결재',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="equipmentListAdminView.equipAppPop();">' +
                            '   <span class="k-button-text">결재</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="equipmentListAdminView.equipStatPopup();">' +
                            '	<span class="k-button-text">장비통계</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: '',
                    text: '조회',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="equipmentListAdminView.mainGrid();">' +
                            '   <span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "장비활용실적 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : equipmentListAdminView.onDataBound,
            columns: [
                {
                    //장비관리(관리자) 체크박스 - 김민주 추가
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="equipmentListAdminView.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template : "<input type='checkbox' id='eqmnUsePk#=EQIPMN_USE_SN#' name='eqmnUsePk' value='#=EQIPMN_USE_SN#'/>",
                    width: 50
                },{
                    field: "EQIPMN_GBN_NAME",
                    title: "구분"
                }, {
                    field: "EQIPMN_NAME",
                    title: "장비명"
                }, {
                    field : "USE_PD_STR_DE",
                    title : "사용일자",
                    template : function(e){
                        return e.USE_PD_STR_DE.substring(0,4) + "년 " + e.USE_PD_STR_DE.substring(4,6) + "월 " + e.USE_PD_STR_DE.substring(6,8) + "일";
                    }
                }, {
                    field: "USER_NAME",
                    title: "담당자"
                }, {
                    field: "OPER_CN",
                    title: "작업내용"
                }, {
                    field: "USE_TIME",
                    title: "총 사용시간"
                }, {
                    field: "USE_AMT",
                    title: "사용대금",
                    template :function(e){
                        return equipmentListAdminView.fn_comma(e.USE_AMT);
                    }
                }, {
                    field: "CLIENT_PRTPCO_NAME",
                    title: "의뢰업체"
                }, {
                    field: "PRTPCO_GBN_NAME",
                    title: "업체구분"
                },{
                    //나중에 필드 바꿔야 함
                    field: "END_STAT",
                    title: "마감상태",
                    template: function (dataItem) {
                        // END_STAT 값이 "Y"인 경우 "마감완료", 그 외의 경우 "-"
                        return dataItem.END_STAT === "Y" ? "마감완료" : "-";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    equipmentmangePopup : function(){
        var url = "/Inside/Pop/equipmentmangePop.do";
        var name = "equipmentmangePop";
        var option = "width = 1300, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    equipAppPop : function (){
        var url = "/Inside/pop/equipAppPop.do";
        var name = "equipApprovalPop";
        var option = "width = 540, height = 260, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    equipStatPopup: function(){
        const url = "/Inside/pop/equipStatPop.do";
        const name = "equipStatPop";
        const option = "width = 1600, height = 640, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },


    //선택한 장비 마감 - 김민주 추가


    selectChkEnd : function (){
        if($("input[name='eqmnUsePk']:checked").length == 0){
            alert("마감상태를 변경할 장비목록을 선택해주세요.");
            return;
        }else if(!confirm("선택한 데이터의 마감상태를 변경하시겠습니까?")){
            return;
        }

        var eqmnUsePk = new Array();
        $("input[name='eqmnUsePk']").each(function(){
            if(this.checked){
                eqmnUsePk.push(this.value);
            }
        })

        $.ajax({
            url : '/asset/setEquipmenUseEndStat',
            data : {
                eqmnUsePk : eqmnUsePk
            },
            dataType: "json",
            type : "POST",
            success : function (rs){
                var rs = rs.rs;
                alert(rs.message);
                if(rs.code == "200"){
                    gridReload();
                }
            }
        });
        location.reload();
    },



    //장비 관리(관리자) 메뉴 그리드 체크박스 - 김민주 추가
    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='eqmnUsePk']").prop("checked", true);
        }else{
            $("input[name='eqmnUsePk']").prop("checked", false);
        }
    },

    fn_comma : function (str){
        if (!str || str=="" || str==undefined) {
            return "0";
        }
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
    }

}
