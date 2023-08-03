var camPrj = {


    global : {

    },




    fn_defaultScript : function (){
        customKendo.fn_textBox(["deptName", "searchText"]);

        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        }
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");

        $("#consultDt").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "시작일자", value: "1" },
                { text: "완료일자", value: "2" }
            ],
            index: 0
        });

        var date = new Date();
        customKendo.fn_datePicker("startDt", "depth", "yyyy-MM-dd", date);
        customKendo.fn_datePicker("endDt", "depth", "yyyy-MM-dd", new Date(date.setMonth(date.getMonth() + 1)));

        $("#searchValue").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "진행 프로젝트(담당)", value: "1" },
                { text: "전체 프로젝트(담당)", value: "2" },
                { text: "진행중 프로젝트(전체)", value: "3" },
            ],
            index: 0
        });

        $("#searchValue2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "프로젝트코드", value: "1" },
                { text: "프로젝트명", value: "2" },
                { text: "업체명", value: "3" },
                { text: "담당자", value: "4" },
            ],
            index: 0
        });

        var parameters = {
            busnClass : $("#busnClass").val(),
            consultDt : $("#consultDt").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            searchValue : $("#searchValue").val(),
            searchValue2 : $("#searchValue2").val(),
            searchText : $("#searchText").val(),
            deptSeq : $("#deptSeq").val(),
            myEmpSeq : $("#myEmpSeq").val(),
            myDeptSeq : $("#myDeptSeq").val()
        }

        camPrj.mainGrid("/project/getProjectList", parameters);
    },

    gridReload : function (){
        $(".container").css("display", "none");
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function (url, parameters){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/project/getProjectList", parameters, 10),
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="camPrj.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="camPrj.setPrjPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-primary" onclick="camPrj.gridReload()">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" onclick="camPrj.gridReload()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function (e){
                var self = e.sender;
                self.tbody.find("tr").dblclick(function(e) {
                    $(".container").css("display", "");
                    $(".circle").each(function(){
                        $(this).removeClass("active")
                        $(this).removeClass("ready")
                        $(this).removeAttr("check");
                        $(this).removeAttr("onClick");
                    });

                    switch (self.dataItem(this).B){
                        case "상담":
                            $("#ps0").attr("check", "Y");
                            break;
                        case "견적":
                            $("#ps1").attr("check", "Y");
                            break;
                        case "수주보고":
                            $("#ps2").attr("check", "Y");
                            break;
                        case "개발계획":
                            $("#ps3").attr("check", "Y");
                            break;
                        case "설계":
                            $("#ps4").attr("check", "Y");
                            break;
                        case "납품":
                            $("#ps5").attr("check", "Y");
                            break;
                        case "결과보고":
                            $("#ps6").attr("check", "Y");
                            break;
                        case "원가보고":
                            $("#ps7").attr("check", "Y");
                            break;
                        default:
                            break;
                    }

                    var index = -1;

                    $(".circle").each(function(e){
                        if($(this).attr("check") == "Y"){
                            index = e;
                        }
                    });

                    for(var i = 0 ; i <= index ; i++){
                        $("#ps" + i).addClass("active");
                        $("#ps" + i).attr("onClick","javascript:alert('뷰페이지 개발중')");
                    }
                    $("#ps" + (index + 1)).addClass("ready");
                    $("#ps" + (index + 1)).attr("onClick","javascript:alert('작성창 개발중')");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: "3%"
                }, {
                    field: "A",
                    title: "사업구분",
                    width: "5%"
                }, {
                    field: "B",
                    title: "진행단계",
                    width: "5%",
                    template : function(e){
                        return e.B;
                    }
                }, {
                    field: "C",
                    title: "프로젝트 코드",
                    width: "7%"
                }, {
                    field: "D",
                    title: "상담제목",
                    width: "20%"
                }, {
                    field: "E",
                    title: "업체명",
                    width: "10%"
                }, {
                    field: "F",
                    title: "수주일",
                    width: "7%"
                }, {
                    field: "G",
                    title: "완료예정일",
                    width: "7%"
                }, {
                    field: "H",
                    title: "완료일",
                    width: "7%"
                }, {
                    field: "I",
                    title: "수주금액",
                    width: "10%",
                    template: function(e){
                        return '<div style="text-align: right;">'+e.I+'</div>';
                    }
                }, {
                    field: "J",
                    title: "PM",
                    width: "5%"
                }, {
                    field: "K",
                    title: "비고",
                    width: "10%"
                }]
        }).data("kendoGrid");
    },

    setPrjPop: function (){
        var url = "/project/pop/viewRegProject.do";
        var name = "popup";
        var option = "width = 900, height = 850, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },
}