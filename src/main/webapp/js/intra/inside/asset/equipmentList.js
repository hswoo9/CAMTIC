var now = new Date();

var equipmentList = {

    init : function(){
        equipmentList.dataSet();
        equipmentList.mainGrid();
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
                equipmentList.gridReload();
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
                    name: 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: '',
                    text: '조회',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="equipmentList.gridReload();">' +
                            '   <span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: '',
                    text: '장비사용 등록',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="equipmentList.equipmentUsePopup();">' +
                            '   <span class="k-button-text">장비사용 등록</span>' +
                            '</button>';
                    }
                }, {
                    name: '',
                    text: '선택 삭제',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="equipmentList.selectChkDel()">' +
                            '   <span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            excel: {
                fileName: "장비 목록.xlsx",
                filterable: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : equipmentList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="equipmentList.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template : "<input type='checkbox' id='eqmnUsePk#=EQIPMN_USE_SN#' name='eqmnUsePk' value='#=EQIPMN_USE_SN#'/>",
                    width: 50
                }, {
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
                        return equipmentList.fn_comma(e.USE_AMT);
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
            ],
            excelExport: function(e) {
                var sheet = e.workbook.sheets[0];

                // 기존 헤더셀 삭제
                sheet.rows.splice(0, 1);

                // 헤더에 필드 추가
                sheet.rows.unshift({
                    cells: [
                        {background: '#7a7a7a', color: '#fff', value: "장비명", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "사용기간", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "담당자", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "작업내용", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "총 사용시간", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "의뢰업체", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "업체구분", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "연도", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "월", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "장비사용료", colSpan: 1, firstCell: false},
                        {background: '#7a7a7a', color: '#fff', value: "부서명", colSpan: 1, firstCell: false}
                    ]
                });

                // 행추가 (기존 행에 덮어쓰기)
                for (var i = 0; i < e.data.length; i++) {
                    var dataItem = e.data[i];

                    var totalUsageTime = dataItem.USE_TIME; // 총 사용시간
                    var usageFee = dataItem.USE_AMT; // 사용대금

                    var usageDate = dataItem.USE_PD_STR_DE;
                    var formattedDate = usageDate.substring(4, 6) + '/' + usageDate.substring(6, 8); // 사용기간 -> MM/DD 형식으로 변경

                    var calculatedData = [
                        dataItem.EQIPMN_NAME, // 장비명
                        formattedDate, // 사용기간 (MM/DD 형식)
                        dataItem.USER_NAME, // 사용자
                        dataItem.OPER_CN, // 작업내용
                        totalUsageTime, // 총 사용시간
                        dataItem.CLIENT_PRTPCO_NAME, // 의뢰업체
                        dataItem.PRTPCO_GBN_NAME, // 업체구분
                        dataItem.USE_PD_STR_DE.substring(0, 4), // 연도
                        dataItem.USE_PD_STR_DE.substring(4, 6), // 월
                        totalUsageTime * usageFee, // 장비사용료 (총 사용시간 * 사용대금)
                        dataItem.DEPT_NAME // 부서
                    ];

                    sheet.rows[i+1].cells = calculatedData.map(function(cellData) {
                        return { value: cellData };
                    });
                }
            }
        }).data("kendoGrid");

        //장비사용 목록 리스트 더블 클릭시 수정 팝업창
        $("#mainGrid").on("dblclick", "tr.k-state-selected", function (e) {
            var selectedItem = $("#mainGrid").data("kendoGrid").dataItem(this);

            var columnValue = selectedItem.END_STAT; //<나중에 마감관련 컬럼으로 교체

            /*equipmentList.equipmentUsePopup(123);*/

            if(columnValue !== "Y") {

            //pk
            equipmentList.equipmentUseUpdatePop(selectedItem.EQIPMN_USE_SN);


            }else{
            alert("마감 완료된 정보는 수정할 수 없습니다.");
            }


/*            $("#eqipmnGbnName").val(selectedItem.EQIPMN_GBN_NAME);
            $("#eqipmnGbnCmmnCdSn").val(selectedItem.EQIPMN_GBN_CMMN_CD_SN);*/

        });

    },

    selectChkDel : function (){
        if($("input[name='eqmnUsePk']:checked").length == 0){
            alert("삭제할 장비목록을 선택해주세요.");
            return;
        }else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
            return;
        }

        var eqmnUsePk = new Array();
        $("input[name='eqmnUsePk']").each(function(){
            if(this.checked){
                eqmnUsePk.push(this.value);
            }
        })

        $.ajax({
            url : '/asset/setEquipmenUseDelete',
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
        //location.reload();
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='eqmnUsePk']").prop("checked", true);
        }else{
            $("input[name='eqmnUsePk']").prop("checked", false);
        }
    },

    equipmentUsePopup : function(data){
        console.log(data);
        var url = "/Inside/Pop/equipmentUsePop.do"
        if(data != null){
            url += "?pjtSn="+data;
        }
        var name = "equipmentUsePop";
        var option = "width = 1000, height = 480, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    equipmentUseUpdatePop : function(data){
        console.log(data);
        var url = "/Inside/Pop/equipmentUseUpdatePop.do?pk="+data;
        var name = "equipmentUseUpdatePop";
        var option = "width = 1000, height = 450, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },


    fn_comma : function (str){
        if (!str || str=="" || str==undefined) {
            return "0";
        }
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }

}
