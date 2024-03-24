var rewardReq = {

    global: {
        now: new Date(),
        searchAjaxData: {}
    },

    fn_defaultScript: function(){
        rewardReq.pageSet();
        rewardReq.gridReload();
    },

    pageSet: function() {
        customKendo.fn_textBox(["searchText"])
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(rewardReq.global.now.setMonth(rewardReq.global.now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

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
                if(this.value()){
                    let rewardDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "32"});
                    rewardDataSource = rewardDataSource.filter(e => e.CM_CODE_DESC.indexOf(this.text()) > -1);
                    rewardDataSource.unshift({CM_CODE_NM : "선택하세요", CM_CODE : ""});
                    $("#rewardName").kendoDropDownList({
                        dataTextField: "CM_CODE_NM",
                        dataValueField: "CM_CODE",
                        dataSource: rewardDataSource,
                        index: 0
                    });
                }
            }
        });

        $("#rewardName").kendoDropDownList({
            dataTextField: "CM_CODE_NM",
            dataValueField: "CM_CODE",
            dataSource: [{
                CM_CODE_NM : "선택하세요", CM_CODE : ""
            }],
            index: 0
        });

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

    gridReload: function(){
        rewardReq.global.searchAjaxData = {
            rewardTypeA : $("#rewardTypeA").val(),
            rewardName : $("#rewardName").val(),
            deptSeq : $("#dept").val(),
            teamSeq : $("#team").val(),
            start_date : $("#start_date").val().replace(/-/g, ""),
            end_date : $("#end_date").val().replace(/-/g, ""),
            searchType : $("#searchType").val(),
            searchText : $("#searchText").val()
        }
        rewardReq.mainGrid("/inside/getRewardList", rewardReq.global.searchAjaxData);
    },

    mainGrid: function(url, params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: url,
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    for(var key in params){
                        data[key] = params[key];
                    }
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardReq.gridReload()">' +
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
                    width: 40
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: 90,
                    template: function(row){
                        return "<span style='font-weight: bold' class='hover' onclick='rewardReq.rewardReqBatchPop(\"upd\", "+row.REWORD_ID+");'>"+row.EMP_NAME+"</span>";
                    }
                }, {
                    field: "REWORD_TYPE_NAME",
                    title: "내/외부",
                    width: 170
                }, {
                    field: "REWORD_NAME",
                    title: "포상 구분",
                    width: 120
                }, {
                    field: "REWORD_DAY",
                    title: "포상일자",
                    width: 100
                }, {
                    field: "RWD_OFM",
                    title: "공적사항",
                    template: function(e){
                        var rwdOfm = e.RWD_OFM;
                        var rwdOfmEx = rwdOfm;
                        if(rwdOfm.toString().length > 36){
                            rwdOfmEx = rwdOfm.toString().substring(0, 36)+ "...";
                        }

                        return rwdOfmEx;
                    }
                }, {
                    field: "RWD_ST_COMP",
                    title: "시행처",
                    width: 200
                }, {
                    title: "관련파일",
                    width: 100,
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
                    field: "REG_EMP_NAME",
                    title: "기록인",
                    width: 100
                }
            ],
            dataBinding: function() {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
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

function gridReload(){
    rewardReq.gridReload();
}