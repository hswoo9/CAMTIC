var mngPartRate = {



    fn_defaultScript: function (){

        customKendo.fn_textBox(["pjtNm"]);

        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        }
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");


        let statusDataSource = [
            { text: "전체", value: "" },
            { text: "검토중", value: "R" },
            { text: "설정완료", value: "S" },
            { text: "참여율 확정", value: "C" }
        ]
        customKendo.fn_dropDownList("status", statusDataSource, "text", "value", 2);

        mngPartRate.mainGrid()
    },

    gridReload : function (){
        $(".container").css("display", "none");
        var parameters = {
            busnClass : $("#busnClass").val(),
            status : $("#status").val(),
            pjtNm : $("#pjtNm").val()
        }
        mngPartRate.mainGrid("/project/getProjectList", parameters);
    },

    gridReload2 : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid : function (url, parameters){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/project/getPartRateVersionList", parameters, 10),
            sortable: true,
            scrollable: true,
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="mngPartRate.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function (e){
                var self = e.sender;

            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "REQ_SORT",
                    title: "구분",
                    width: "5%",
                    template: function(e){
                        if(e.PART_RATE_VER == 1){
                            return '<span>신규</span>'
                        } else {
                            return '<span style="color:red">변경</span>'
                        }
                    }
                }, {
                    title: "버전",
                    width: "7%",
                    template: function(e){
                        return "Ver." + e.PART_RATE_VER;
                    }
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: "20%",
                    template: function(e){
                        return "<a href='javascript:void(0);' style='font-weight: bold' onclick='mngPartRate.fn_popPartRate("+e.PART_RATE_VER_SN+")'>" + e.PJT_NM + "</a>";
                    }
                }, {
                    field: "STR_DT",
                    title: "프로젝트 시작",
                    width: "7%"
                }, {
                    field: "END_DT",
                    title: "프로젝트 종료",
                    width: "7%"
                }, {
                    title: "인건비 예산(원)",
                    width: "7%",
                    template: function(e){
                        return comma(Number(e.PAY_BUDGET) + Number(e.ITEM_BUDGET));
                    }
                }, {
                    field: "REQ_EMP_NM",
                    title: "요청자",
                    width: "7%"
                }, {
                    field: "REQ_DT",
                    title: "요청일",
                    width: "7%"
                }, {
                    field: "BUSN_NM",
                    title: "시스템 구분",
                    width: "7%"
                }, {
                    title: "상태",
                    width: "7%",
                    template :function(e){
                        var mngStat = "";
                        if(e.MNG_STAT == "S"){
                            mngStat = "설정완료";
                        } else if (e.MNG_STAT == "C"){
                            mngStat = "참여율확정";
                        } else {
                            mngStat = "검토중"
                        }

                        return mngStat;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#mainGrid").data("kendoGrid").setOptions({
            selectable : true
        })
    },

    fn_popPartRate : function (key){

        var url = "/project/pop/partRate.do?partRateVerSn=" + key;

        var name = "blank";
        var option = "width = 1680, height = 850, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    }
}

function inputNumberFormat (obj){
    obj.value = comma(uncomma(obj.value));
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function gridReload(){
    mngPartRate.gridReload();
}