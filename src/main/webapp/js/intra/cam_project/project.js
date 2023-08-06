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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" onclick="camPrj.fn_delPjt(this)">' +
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

                    console.log(self.dataItem(this));
                    switch (self.dataItem(this).PJT_STEP) {
                        case "E0":
                            $("#ps0").attr("check", "Y");
                            break;
                        case "E1":
                            $("#ps1").attr("check", "Y");
                            break;
                        case "E2":
                            $("#ps2").attr("check", "Y");
                            break;
                        case "E3":
                            $("#ps3").attr("check", "Y");
                            break;
                        case "E4":
                            $("#ps4").attr("check", "Y");
                            break;
                        case "E5":
                            $("#ps5").attr("check", "Y");
                            break;
                        case "E6":
                            $("#ps6").attr("check", "Y");
                            break;
                        case "E7":
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
                        $("#ps" + i).attr("onClick","camPrj.setPrjPop("+self.dataItem(this).PJT_SN+")");
                    }
                    $("#ps" + (index + 1)).addClass("ready");
                    $("#ps" + (index + 1)).attr("onClick","javascript:alert('작성창 개발중')");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="camPrj.fn_allCheck(this)" class=""/>',
                    template : function (e){
                        if(e.PJT_CD != null && e.PJT_CD != ""){
                            return "";
                        } else {
                            return "<input type='checkbox' id='' name='pjtCheck' value='"+e.PJT_SN+"' class=''/>"
                        }
                    },
                    width: "3%"
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: "5%"
                }, {
                    field: "PJT_STEP_NM",
                    title: "진행단계",
                    width: "5%"
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: "7%"
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: "20%"
                }, {
                    field: "COMP_NM",
                    title: "업체명",
                    width: "10%"
                }, {
                    field: "STR_DT",
                    title: "수주일",
                    width: "7%",
                    template: function(e){

                        if(e.STR_DT == null || e.STR_DT == ""){
                            return "";
                        }
                        var date = new Date(e.STR_DT);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth()+1;
                        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy+'-'+mm+'-'+dd;
                    }
                }, {
                    field: "END_EXP_DT",
                    title: "완료예정일",
                    width: "7%",
                    template: function(e){
                        if(e.END_EXP_DT == null || e.END_EXP_DT == ""){
                            return "";
                        }
                        var date = new Date(e.END_EXP_DT);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth()+1;
                        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy+'-'+mm+'-'+dd;
                    }
                }, {
                    field: "END_DT",
                    title: "완료일",
                    width: "7%",
                    template: function(e){
                        if(e.END_DT == null || e.END_DT == ""){
                            return "";
                        }
                        var date = new Date(e.END_DT);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth()+1;
                        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy+'-'+mm+'-'+dd;
                    }
                }, {
                    field: "PJT_AMT",
                    title: "수주금액",
                    width: "7%",
                    template: function(e){
                        return '<div style="text-align: right;">'+camPrj.comma(e.PJT_AMT)+'</div>';
                    }
                }, {
                    field: "PM",
                    title: "PM",
                    width: "5%"
                }]
        }).data("kendoGrid");
    },

    fn_allCheck : function (e){
        if($(e).is(":checked"))
            $("input[name='pjtCheck']").prop("checked", true);
        else
            $("input[name='pjtCheck']").prop("checked", false);
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    setPrjPop: function (key){
        var url = "/project/pop/viewRegProject.do?pjtSn=" + key;

        if(key == null || key == ""){
            url = "/project/pop/viewRegProject.do";
        }

        var name = "popup";
        var option = "width = 900, height = 850, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },
    fn_delPjt : function(t){
        $("input[name='pjtCheck']").each(function(e){
            if($(this).is(":checked")){
                // alert(this.value);
                alert("삭제하시겠습니까?");

                // Todo. project 삭제 처리

            }
        })
    }

}