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
            value : new Date()
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "사용자", value: "1" },
                { text: "작업내용", value: "2" },
                { text: "의뢰업체", value: "3" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
        $("#searchVal").on("keyup", function(key){
            if(key.keyCode == 13){
                equipmentList.mainGrid();
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name: '',
                    text: '조회',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="equipmentList.mainGrid();">' +
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
                    field: "SORT_SN",
                    title: "순번"
                }, {
                    field: "EQIPMN_GBN_NAME",
                    title: "구분"
                }, {
                    field: "EQIPMN_NAME",
                    title: "장비명"
                }, {
                    title : "사용기간",
                    columns : [
                        {
                            field : "USE_PD_STR_DE",
                            title : "시작일자",
                            template : function(e){
                                return e.USE_PD_STR_DE.substring(0,4) + "년 " + e.USE_PD_STR_DE.substring(4,6) + "월 " + e.USE_PD_STR_DE.substring(6,8) + "일";
                            }
                        }, {
                            field: "USE_PD_END_DE",
                            title: "종료일자",
                            template : function(e){
                                return e.USE_PD_END_DE.substring(0,4) + "년 " + e.USE_PD_END_DE.substring(4,6) + "월 " + e.USE_PD_END_DE.substring(6,8) + "일";
                            }
                        }
                    ]
                }, {
                    field: "USER_NAME",
                    title: "사용자"
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
                }
            ]
        }).data("kendoGrid");

        //장비사용 목록 리스트 더블 클릭시 수정 팝업창
        $("#mainGrid").on("dblclick", "tr.k-state-selected", function (e) {
            var selectedItem = $("#mainGrid").data("kendoGrid").dataItem(this);
            console.log(selectedItem);
            console.log(selectedItem.EQIPMN_USE_SN);
            /*equipmentList.equipmentUsePopup(123);*/
            //pk
            equipmentList.equipmentUseUpdatePop(selectedItem.EQIPMN_USE_SN);

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
        location.reload();
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
    }

}
