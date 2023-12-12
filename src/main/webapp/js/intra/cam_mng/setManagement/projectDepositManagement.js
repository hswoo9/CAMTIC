let sum=0;
var prjDepositMng = {

    fn_defaultScript : function (){
        customKendo.fn_textBox(["deptName", "searchText"]);

        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        };
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");

        $("#searchValue").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "진행 프로젝트(담당)", value: "1" },
                { text: "전체 프로젝트(담당)", value: "2" },
                { text: "진행중 프로젝트(전체)", value: "3" }
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
                { text: "담당자", value: "4" }
            ],
            index: 0
        });

        $("#busnSubClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "미수주", value: "Y" },
                { text: "예상", value: "'Y', 'E', 'E1', 'E2', 'R', 'S'" },
                { text: "진행", value: "'E3', 'E4', 'E5', 'R2', 'R2', 'S2'" },
                { text: "완료", value: "'E6', 'E7', 'R3', 'S3'" }
            ],
            index: 4
        });

        this.mainGrid();
    },

    gridReload : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/project/getProjectList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.busnClass = $("#busnClass").val();
                    data.consultDt = $("#consultDt").val();
                    data.searchValue = $("#searchValue").val();
                    data.searchValue2 = $("#searchValue2").val();
                    data.searchText = $("#searchText").val();
                    data.deptSeq = $("#deptSeq").val();
                    data.regEmpSeq = $("#regEmpSeq").val();
                    data.myDeptSeq = $("#myDeptSeq").val();
                    data.busnSubClass = "'E6', 'E7', 'R3', 'S3'";
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
            height: 551,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="prjDepositMng.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, /*{
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="prjDepositMng.setPrjPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" onclick="prjDepositMng.fn_delPjt(this)">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },*/

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            detailTemplate : kendo.template($("#template").html()),
            detailInit: prjDepositMng.detailInit,
            dataBound: function(e){
                /** 합계 */
                $("#total").text(fn_numberWithCommas(sum));
                sum = 0;

                /** 협업 없을때 조회 기능 숨김처리 */
                const grid = this;
                grid.tbody.find("tr").each(function(){
                    var dataItem = grid.dataItem($(this));
                    if(dataItem.PNT_PJT_SN_CK == null){
                        $(this).find(".k-i-expand").hide();
                    }
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="prjDepositMng.fn_allCheck(this)" class=""/>',
                    template : function (e){
                        if(e.PJT_CD != null && e.PJT_CD != ""){
                            return "";
                        } else {
                            return "<input type='checkbox' id='' name='pjtCheck' value='"+e.PJT_SN+"' class=''/>"
                        }
                    },
                    width: 50
                }, {
                    title: "연번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 100
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 100
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    template: function(e){
                        var pjtNm = e.PJT_NM;
                        if(e.BUSN_CLASS == "S"){
                            pjtNm = e.BS_TITLE;
                        }
                        var pjtEx = pjtNm;
                        if(pjtNm.toString().length > 62){
                            pjtEx = pjtNm.toString().substring(0, 62)+ "...";
                        }
                        if(e.TEAM_STAT == "N"){
                            return "<a href='javascript:void(0);' style='font-weight: bold' onclick='prjDepositMng.fn_projectPopView("+e.PJT_SN+", \"" + e.BUSN_CLASS + "\")'>" + pjtEx + "</a>";
                        } else {
                            return "<a href='javascript:void(0);' style='font-weight: bold' onclick='prjDepositMng.fn_projectPopView("+e.PJT_SN+", \"" + e.BUSN_CLASS + "\")'>" + pjtEx + "</a>";
                        }
                    }
                }, {

                    field: "STR_DT",
                    title: "수주일",
                    width: 100,
                    template: function (e) {
                        if (e.STR_DT == null || e.STR_DT == "") {
                            return "";
                        }
                        var date = new Date(e.STR_DT);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth() + 1;
                        mm = mm >= 10 ? mm : '0' + mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0' + dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy + '-' + mm + '-' + dd;
                    }
                }, {
                    field: "END_DT",
                    title: "종료일자",
                    width: 100,
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
                    },
                    footerTemplate: "합계"
                }, /*{
                    title: "종료예정일",
                    width: 100
                }, */{
                    field: "PJT_AMT",
                    title: "수주금액",
                    width: 100,
                    template: function(e){
                        sum += Number(e.PJT_AMT);
                        return '<div style="text-align: right;">'+prjDepositMng.comma(e.PJT_AMT)+'</div>';
                    },
                    footerTemplate : function () {
                        return "<span id='total'></span>";
                    }
                }, {
                    field: "PM",
                    title: "PM",
                    width: 60
                }, {
                    field: "PJT_STEP_NM",
                    title: "진행단계",
                    width: 80,
                    template: function(e){
                        console.log(e.BUSN_CLASS);

                        var pjtStepNm = "";
                        if(e.BUSN_CLASS == "D"){
                            pjtStepNm = "상담";
                            if(e.PJT_STOP == "Y"){
                                pjtStepNm = "미수주";
                            } else if(e.PJT_STEP == "E0"){
                                pjtStepNm = "상담";
                            } else if(e.PJT_STEP == "E1"){
                                pjtStepNm = "견적";
                            } else if(e.PJT_STEP == "E2"){
                                pjtStepNm = "수주";
                            } else if(e.PJT_STEP == "E3"){
                                pjtStepNm = "개발계획";
                            } else if(e.PJT_STEP == "E4"){
                                pjtStepNm = "공정";
                            } else if(e.PJT_STEP == "E5"){
                                pjtStepNm = "납품";
                            } else if(e.PJT_STEP == "E6"){
                                pjtStepNm = "결과보고";
                            } else if(e.PJT_STEP == "E7"){
                                pjtStepNm = "원가보고";
                            }
                        } else if (e.BUSN_CLASS == "R") {
                            if(e.PJT_STEP == "R"){
                                pjtStepNm = "예상수주";
                            } else if(e.PJT_STEP == "R2"){
                                pjtStepNm = "수주보고";
                            } else if(e.PJT_STEP == "R3"){
                                pjtStepNm = "결과보고";
                            }
                        } else if(e.BUSN_CLASS == "S"){
                            if(e.PJT_STEP == "S"){
                                pjtStepNm = "예상수주";
                            } else if(e.PJT_STEP == "S2"){
                                pjtStepNm = "수주보고";
                            } else if(e.PJT_STEP == "S3"){
                                pjtStepNm = "결과보고";
                            }
                        } else {
                            pjtStepNm = "";
                        }

                        return pjtStepNm;
                    }
                }, {
                    title : "조회",
                    width: "5%",
                    template : function (e){
                        if(e.TEAM_STAT == "Y"){
                            return "";
                        } else {
                            return "<button type='button' onclick='prjDepositMng.projectDoc("+e.PJT_SN+")' class='k-button k-button-solid-base'>조회</button>"
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        // $("#mainGrid").data("kendoGrid").setOptions({
        //     selectable : true
        // });
    },

    detailInit : function(e) {
        console.log(e);
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/project/getTeamProjectList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.pjtSn = e.data.PJT_SN;
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

        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: dataSource,
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                {
                    field: "BUSN_NM",
                    title: "사업구분",
                }, {
                    field: "PJT_NM",
                    title:"프로젝트명",
                    template : function(e){
                        if(e.TEAM_STAT == "N"){
                            return "<a href='javascript:void(0);' style='font-weight: bold' onclick='prjDepositMng.fn_projectPopView("+e.PJT_SN+", \"" + e.BUSN_CLASS + "\")'>" + e.PJT_NM + "</a>";
                        } else {
                            return "<a href='javascript:void(0);' style='font-weight: bold' onclick='prjDepositMng.fn_projectPopView("+e.PJT_SN+", \"" + e.BUSN_CLASS + "\", \"" + e.TEAM_STAT + "\")'>" + e.PJT_NM + "</a>";
                        }
                    }
                }, {
                    title:"수주금액",
                    template: function(e) {
                        return '<div style="text-align: right">'+prjDepositMng.comma(e.TM_AMT)+'</div>';
                    },
                    width: "150px"
                },
            ]
        });
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

    setPrjPop: function (i, key){
        var url = "";

        if(i == 1){
            url = "/project/pop/viewRegProject.do?pjtSn=" + key;
        } else {
            url = "/project/pop/engnStep.do?step=" + (i-1) + "&pjtSn=" + key;
        }
        if(key == null || key == ""){
            url = "/project/pop/viewRegProject.do";
        }

        var name = "_blank";
        var option = "width = 1680, height = 850, top = 100, left = 200, location = no"

        if((i-1) == 3){
            option = "width = 1680, height = 820, top = 100, left = 200, location = no";
        }

        var popup = window.open(url, name, option);
    },

    fn_delPjt : function(t){
        $("input[name='pjtCheck']").each(function(e){
            if($(this).is(":checked")){
                // alert(this.value);
                alert("삭제하시겠습니까?");
                var data = {
                    pjtSn : this.value
                }
                customKendo.fn_customAjax("/project/delProject", data);

                prjDepositMng.gridReload();
            }
        })
    },


    // project 상세페이지
    fn_projectPopView : function (key, cs){
        var url = "/project/pop/viewRegProject.do?pjtSn=" + key;

        if(cs == "R"){
            url = "/projectRnd/pop/regProject.do?pjtSn=" + key;
        } else if (cs == "S"){
            url = "/projectUnRnd/pop/regProject.do?pjtSn=" + key;
        }
        var name = "blank";
        var option = "width = 1680, height = 850, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    projectDoc: function(key) {
        var url = "/project/pop/projectDoc.do?pjtSn=" + key;
        var name = "_blank";
        var option = "width = 680, height = 200, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    dateValidationCheck : function (id, val){
        var sDt = new Date($("#frDt").val());
        var nDt = new Date($("#toDt").val());

        if(id == "frDt"){
            if(sDt > nDt){
                $("#toDt").val(val);
            }
        }else{
            if(sDt > nDt){
                $("#frDt").val(val);
            }
        }
    }
}

function gridReload(){
    prjDepositMng.gridReload();
}