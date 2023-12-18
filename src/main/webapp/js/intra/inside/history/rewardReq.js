var now = new Date();

var rewardReq = {

    init: function(){
        rewardReq.dataSet();
        rewardReq.mainGrid();
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getRewardList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.rewardTypeA = $("#rewardTypeA").val();
                    data.rewardName = $("#rewardName").val();
                    data.deptSeq = $("#dept").val();
                    data.teamSeq = $("#team").val();
                    data.start_date = $("#start_date").val().replace(/-/g, "");
                    data.end_date = $("#end_date").val().replace(/-/g, "");
                    data.searchType = $("#searchType").val();
                    data.searchText = $("#searchText").val();
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
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardReq.rewardReqBatchPop();">' +
                            '	<span class="k-button-text">포상 일괄등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "포상목록.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: 100,
                    template: function(row){
                        return "<span style='font-weight: bold' class='hover' onclick='rewardReq.rewardReqBatchPop(\"upd\", "+row.REWORD_ID+");'>"+row.EMP_NAME+"</span>";
                    }
                }, {
                    field: "REWORD_TYPE_NAME",
                    title: "내/외부",
                    width: 100
                }, {
                    field: "REWORD_NAME",
                    title: "포상명",
                    width: 150
                }, {
                    field: "REWORD_DAY",
                    title: "포상일자",
                    width: 100
                }, {
                    field: "RWD_OFM",
                    title: "공적사항"
                }, {
                    field: "RWD_ST_COMP",
                    title: "시행처",
                    width: 200
                }, {
                    title: "관련파일",
                    width: 150,
                    template: function(row){
                        if(row.file_no > 0){
                            return '<span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">보기</span>';
                        }else{
                            return '-';
                        }

                    }
                }, {
                    field: "RWD_ETC",
                    title: "비고",
                    width: 150
                }, {
                    field: "APPROVE_EMP_NAME",
                    title: "기록인",
                    width: 100
                }
            ],
            dataBinding: function() {
                record = this.dataSource._data.length+1 - ((this.dataSource.page() -1) * this.dataSource.pageSize());
            }
        }).data("kendoGrid");
    },

    dataSet: function() {
        customKendo.fn_textBox(["searchText"])
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

       /* let statusDataSource = [
            { text: "내부표창", value: "내부표창" },
            { text: "외부표창", value: "외부표창" }
        ]
        customKendo.fn_dropDownList("rewardTypeA", statusDataSource, "text", "value", 2);*/

        $("#rewardTypeA").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "내부", value: "0" },
                { text: "외부", value: "1" }
            ],
            index: 0,
            width: 300,
            change: function(e) {
                var selectedValue = this.text();
                let rewardDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeListReward", { cmGroupCodeId: "32", specificValue: selectedValue });
                customKendo.fn_dropDownList("rewardName", rewardDataSource, "CM_CODE_NM", "CM_CODE", "2");
            }
        });

        customKendo.fn_dropDownList("rewardName", [], "CM_CODE_NM", "CM_CODE", "2");

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "성명", value: "1" },
                { text: "공적 사항", value: "2" },
                { text: "시행처", value: "3" },
                { text: "포상번호", value: "4" }
            ],
            index: 0,
            width: 300
        });
        fn_deptSetting();
    },

    rewardReqBatchPop : function(mode, pk) {
        var url = "/Inside/pop/rewardReqBatchPop.do";
        if(mode == "upd"){
            url += "?mode="+mode+"&pk="+pk;
        }
        var name = "rewardReqBatchPop";
        var option = "width=1800, height=695, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    rewardGubunPop : function() {
        var url = "/Inside/pop/rewardGubunPop.do";
        var name = "rewardGubunPop";
        var option = "width=550, height=450, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
