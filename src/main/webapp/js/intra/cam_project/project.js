let sum=0;
var camPrj = {

    global : {
        allPjtYear : new Array()
    },

    fn_defaultScript : function (){

        var pjtYear = customKendo.fn_customAjax("/project/getPjtYear", {});
        console.log("pjtYear", pjtYear);

        const pjtYearArr = pjtYear.list;
        const yearArr = new Array();
        for(let i=0; i<pjtYearArr.length; i++){
            yearArr.push(pjtYearArr[i].YEAR);
        }

        camPrj.global.allPjtYear = yearArr;

        customKendo.fn_dropDownList("pjtYear", pjtYear.list, "TEXT", "YEAR");

        customKendo.fn_textBox(["deptName", "searchText", "empName"]);

        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        }
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");


        $("#busnSubClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "미수주", value: "Y" },
                { text: "예상", value: "'Y', 'E', 'E1', 'E2', 'R', 'S'" },
                { text: "진행", value: "'E3', 'E4', 'E5', 'E6', 'E7', 'R2', 'R2', 'S2', 'R3', 'S3'" },
                { text: "완료", value: "res" }
            ],
            index: 0
        });

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
        $("#searchValue").data("kendoDropDownList").value("1");

        $("#searchValue2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "프로젝트명", value: "2" },
                { text: "프로젝트코드", value: "1" },
                { text: "업체명", value: "3" },
                { text: "담당자", value: "4" },
            ],
            index: 0
        });

        $("#empName").on("keyup", function(key){
            if(key.keyCode == 13){
                camPrj.mainGrid();
            }
        })

        this.mainGrid();

        $("#pjtYear").data("kendoDropDownList").bind("change", camPrj.gridReload)
    },

    gridReload : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
        $("#mainGrid").data("kendoGrid").dataSource.page(1);
        camPrj.fn_tableSet();
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
                    data.busnSubClass = $("#busnSubClass").val();
                    data.consultDt = $("#consultDt").val();
                    data.searchValue = $("#searchValue").val();
                    data.searchValue2 = $("#searchValue2").val();
                    data.searchText = $("#searchText").val();
                    data.deptSeq = $("#deptSeq").val();
                    data.regEmpSeq = $("#regEmpSeq").val();
                    data.myDeptSeq = $("#myDeptSeq").val();
                    data.empName = $("#empName").val();
                    data.pjtYear = $("#pjtYear").val();
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
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
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="camPrj.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }

            ],
            excel : {
                fileName : "프로젝트 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            detailTemplate : kendo.template($("#template").html()),
            detailInit: camPrj.detailInit,
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="camPrj.fn_allCheck(this)" class=""/>',
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
                    width: 100,
                    template: function(e){
                        if(e.DELV_APPROVE_STAT == "100"){
                            return e.PJT_CD;
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    template: function(e){
                        var pjtNm = e.PJT_NM;
                        /*if(e.BUSN_CLASS == "S"){
                            pjtNm = e.BS_TITLE;
                        }*/
                        return '<div style="text-align: left; font-weight: bold; cursor: pointer" onclick="camPrj.fn_projectPopView('+e.PJT_SN+', \'' + e.BUSN_CLASS + '\')">' + pjtNm + '</div>';
                    }
                }, {
                    field: "CRM_NM",
                    title: "주관기관(업체명)",
                    width: 120,
                    template: function(e){
                        return "<div style=\"text-align: left;\">" + (e.CRM_NM || '') + "</div>";
                    }
                }, {

                    field: "STR_DT",
                    title: "수주일",
                    width: 100,
                    template: function (e) {
                        if(e.BUSN_CLASS == "S" || e.BUSN_CLASS == "R"){
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
                        } else {
                            return e.DELV_EST_DE || "";
                        }
                    }
                }, {
                    field: "DELV_DE",
                    title: "종료예상일",
                    width: 100
                }, {
                    field: "END_DT",
                    title: "종료일",
                    width: 100,
                    template: function(e){
                        if(e.BUSN_CLASS == "S" || e.BUSN_CLASS == "R"){
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
                        } else {
                            return e.GOODS_DT || "";
                        }

                    },
                    footerTemplate: "합계"
                }, {
                    field: "PJT_AMT",
                    title: "수주금액",
                    width: 100,
                    template: function(e){
                        sum += Number(e.PJT_AMT);
                        return '<div style="text-align: right;">'+camPrj.comma(e.PJT_AMT)+'</div>';
                    },
                    footerTemplate : function () {
                        return "<span id='total'></span>";
                    }
                }, {
                    field: "PM",
                    title: "PM",
                    width: 60,
                    template : function (e){
                        var html = "";

                        if(e.BUSN_CLASS == "S" || e.BUSN_CLASS == "R"){
                            html = e.EMP_NAME || "";
                        } else {
                            html = e.PM || "";
                        }
                        return html;
                    }
                }, {
                    field: "PJT_STEP_NM",
                    title: "진행단계",
                    width: 80,
                    template: function(e){

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
                            if(e.PJT_STOP == "Y"){
                                pjtStepNm = "미수주";
                            } else if(e.PJT_STEP == "R"){
                                pjtStepNm = "예상수주";
                            } else if(e.PJT_STEP == "R2"){
                                pjtStepNm = "수주보고";
                            } else if(e.PJT_STEP == "R3"){
                                pjtStepNm = "결과보고";
                            }
                        } else if(e.BUSN_CLASS == "S"){
                            if(e.PJT_STOP == "Y"){
                                pjtStepNm = "미수주";
                            } else if(e.PJT_STEP == "S"){
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
                            return "<button type='button' onclick='camPrj.projectDoc("+e.PJT_SN+")' class='k-button k-button-solid-base'>조회</button>"
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

        camPrj.fn_tableSet();
    },

    detailInit : function(e) {
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
                            return "<a href='javascript:void(0);' style='font-weight: bold' onclick='camPrj.fn_projectPopView("+e.PJT_SN+", \"" + e.BUSN_CLASS + "\")'>" + e.PJT_NM + "</a>";
                        } else {
                            return "<a href='javascript:void(0);' style='font-weight: bold' onclick='camPrj.fn_projectPopView("+e.PJT_SN+", \"" + e.BUSN_CLASS + "\", \"" + e.TEAM_STAT + "\")'>" + e.PJT_NM + "</a>";
                        }
                    }
                }, {
                    title:"협업금액",
                    template: function(e) {
                        return '<div style="text-align: right">'+camPrj.comma(e.PJT_AMT)+'</div>';
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
        var option = "width = 1680, height = 850, top = 100, left = 200, location = no";

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

                camPrj.gridReload();
            }
        })
    },


    // project 상세페이지
    fn_projectPopView : function (key, cs){
        var uid = $("#myEmpSeq").val()
        var rs = customKendo.fn_customAjax("/project/getProjectData", { pjtSn: key });
        var mem = customKendo.fn_customAjax("/project/projectEnterMemberList", { pjtSn: key });
        console.log(rs);
        console.log(mem);


        var pral = mem.list.partRateAdminList;
        var prml = mem.list.partRateMemberList;
        var pml = mem.list.psMemberList;
        var aml = mem.list.aceMemberList;
        var trl = mem.list.teamReaderList;
        var flag = false;

        if(rs.data.PM_EMP_SEQ == uid || rs.data.REG_EMP_SEQ == uid || rs.data.EMP_SEQ == uid){
            flag = true;
        }

        for(var i = 0; i < prml.length; i++){
            if(prml[i].PART_EMP_SEQ == uid){
                flag = true
            }
        }

        for(var i = 0; i < pral.length; i++){
            if(pral[i].EMP_SEQ == uid){
                flag = true
            }
        }

        for(var i = 0 ; i < pml.length ; i++){
            if(pml[i].PS_EMP_SEQ == uid){
                flag = true
            }
        }

        for(var i = 0 ; i < aml.length ; i++){
            if(aml[i].EMP_SEQ == uid){
                flag = true
            }
        }

        for(var i = 0 ; i < trl.length ; i++){
            if(trl[i].EMP_SEQ == uid){
                flag = true
            }
        }

        if(flag){
            var url = "/project/pop/viewRegProject.do?pjtSn=" + key;

            if(cs == "R"){
                url = "/projectRnd/pop/regProject.do?pjtSn=" + key;
            } else if (cs == "S"){
                url = "/projectUnRnd/pop/regProject.do?pjtSn=" + key;
            }
            var name = "_blank";
            var option = "width = 1680, height = 850, top = 100, left = 200, location = no";

            var popup = window.open(url, name, option);
        } else {
            alert("참여중인 프로젝트가 아닙니다.");
            return;
        }

    },

    projectDoc: function(key) {
        var url = "/project/pop/projectDoc.do?pjtSn=" + key;
        var name = "_blank";
        var option = "width = 680, height = 200, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    fn_tableSet: function(){
        const pjtYear = $("#pjtYear").val();
        const data = { busnClass: "D", pjtYear: pjtYear};
        const totalData = customKendo.fn_customAjax("/project/getProjectTotalData", data).data;

        $("#expectEngnCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"D\", 1)'>"+camPrj.comma(totalData.ENGN_EXPECT_COUNT)+ "건</span>");
        let expectEngnSum = Math.floor(totalData.ENGN_EXPECT_SUM / 1000000);
        $("#expectEngnSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"D\", 1)'>"+camPrj.comma(expectEngnSum)+"백만원</span>");

        $("#progressEngnCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"D\", 2)'>"+camPrj.comma(totalData.ENGN_PROGRESS_COUNT)+ "건</span>");
        let progressEngnSum = Math.floor(totalData.ENGN_PROGRESS_SUM / 1000000);
        $("#progressEngnSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"D\", 2)'>"+camPrj.comma(progressEngnSum)+"백만원</span>");

        $("#completeEngnCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"D\", 3)'>"+camPrj.comma(totalData.ENGN_COMPLETE_COUNT)+ "건</span>");
        let completeEngnSum = Math.floor(totalData.ENGN_COMPLETE_SUM / 1000000);
        $("#completeEngnSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"D\", 3)'>"+camPrj.comma(completeEngnSum)+"백만원</span>");

        $("#engnCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"D\", 0)'>"+camPrj.comma(totalData.ENGN_EXPECT_COUNT + totalData.ENGN_PROGRESS_COUNT + totalData.ENGN_COMPLETE_COUNT)+ "건</span>");
        $("#engnSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"D\", 0)'>"+camPrj.comma(expectEngnSum + progressEngnSum + completeEngnSum)+"백만원</span>");

        $("#expectVCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"V\", 1)'>"+camPrj.comma(totalData.V_EXPECT_COUNT)+ "건</span>");
        let expectVSum = Math.floor(totalData.V_EXPECT_SUM / 1000000);
        $("#expectVSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"V\", 1)'>"+camPrj.comma(expectVSum)+"백만원</span>");

        $("#progressVCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"V\", 2)'>"+camPrj.comma(totalData.V_PROGRESS_COUNT)+ "건</span>");
        let progressVSum = Math.floor(totalData.V_PROGRESS_SUM / 1000000);
        $("#progressVSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"V\", 2)'>"+camPrj.comma(progressVSum)+"백만원</span>");

        $("#completeVCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"V\", 3)'>"+camPrj.comma(totalData.V_COMPLETE_COUNT)+ "건</span>");
        let completeVSum = Math.floor(totalData.V_COMPLETE_SUM / 1000000);
        $("#completeVSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"V\", 3)'>"+camPrj.comma(completeVSum)+"백만원</span>");

        $("#vCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"V\", 0)'>"+camPrj.comma(totalData.V_EXPECT_COUNT + totalData.V_PROGRESS_COUNT + totalData.V_COMPLETE_COUNT)+ "건</span>");
        $("#vSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"V\", 0)'>"+camPrj.comma(expectVSum + progressVSum + completeVSum)+"백만원</span>");


        $("#expectRndCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"R\", 1)'>"+camPrj.comma(totalData.RND_EXPECT_COUNT)+ "건</span>");
        let expectRndSum = Math.floor(totalData.RND_EXPECT_SUM / 1000000);
        $("#expectRndSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"R\", 1)'>"+camPrj.comma(expectRndSum)+"백만원</span>");

        $("#progressRndCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"R\", 2)'>"+camPrj.comma(totalData.RND_PROGRESS_COUNT)+ "건</span>");
        let progressRndSum = Math.floor(totalData.RND_PROGRESS_SUM / 1000000);
        $("#progressRndSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"R\", 2)'>"+camPrj.comma(progressRndSum)+"백만원</span>");

        $("#completeRndCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"R\", 3)'>"+camPrj.comma(totalData.RND_COMPLETE_COUNT)+ "건</span>");
        let completeRndSum = Math.floor(totalData.RND_COMPLETE_SUM / 1000000);
        $("#completeRndSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"R\", 3)'>"+camPrj.comma(completeRndSum)+"백만원</span>");

        $("#rndCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"R\", 0)'>"+camPrj.comma(totalData.RND_EXPECT_COUNT + totalData.RND_PROGRESS_COUNT + totalData.RND_COMPLETE_COUNT)+ "건</span>");
        $("#rndSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"R\", 0)'>"+camPrj.comma(expectRndSum + progressRndSum + completeRndSum)+"백만원</span>");


        $("#expectUrndCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"S\", 1)'>"+camPrj.comma(totalData.URND_EXPECT_COUNT)+ "건</span>");
        let expectUrndSum = Math.floor(totalData.URND_EXPECT_SUM / 1000000);
        $("#expectUrndSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"S\", 1)'>"+camPrj.comma(expectUrndSum)+"백만원</span>");

        $("#progressUrndCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"S\", 2)'>"+camPrj.comma(totalData.URND_PROGRESS_COUNT)+ "건</span>");
        let progressUrndSum = Math.floor(totalData.URND_PROGRESS_SUM / 1000000);
        $("#progressUrndSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"S\", 2)'>"+camPrj.comma(progressUrndSum)+"백만원</span>");

        $("#completeUrndCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"S\", 3)'>"+camPrj.comma(totalData.URND_COMPLETE_COUNT)+ "건</span>");
        let completeUrndSum = Math.floor(totalData.URND_COMPLETE_SUM / 1000000);
        $("#completeUrndSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"S\", 3)'>"+camPrj.comma(completeUrndSum)+"백만원</span>");

        $("#unRndCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"S\", 0)'>"+camPrj.comma(totalData.URND_EXPECT_COUNT + totalData.URND_PROGRESS_COUNT + totalData.URND_COMPLETE_COUNT)+ "건</span>");
        $("#unRndSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"S\", 0)'>"+camPrj.comma(expectUrndSum + progressUrndSum + completeUrndSum)+"백만원</span>");

        $("#expectCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"\", 1)'>"+camPrj.comma(totalData.ENGN_EXPECT_COUNT + totalData.RND_EXPECT_COUNT + totalData.URND_EXPECT_COUNT + totalData.V_EXPECT_COUNT)+ "건</span>");
        $("#expectSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"\", 1)'>"+camPrj.comma(expectEngnSum + expectRndSum + expectUrndSum + expectVSum)+"백만원</span>");

        $("#progressCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"\", 2)'>"+camPrj.comma(totalData.ENGN_PROGRESS_COUNT + totalData.RND_PROGRESS_COUNT + totalData.URND_PROGRESS_COUNT + totalData.V_PROGRESS_COUNT)+ "건</span>");
        $("#progressSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"\", 2)'>"+camPrj.comma(progressEngnSum + progressRndSum + progressUrndSum + progressVSum)+"백만원</span>");

        $("#completeCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"\", 3)'>"+camPrj.comma(totalData.ENGN_COMPLETE_COUNT + totalData.RND_COMPLETE_COUNT + totalData.URND_COMPLETE_COUNT + totalData.V_COMPLETE_COUNT)+ "건</span>");
        $("#completeSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"\", 3)'>"+camPrj.comma(completeEngnSum + completeRndSum + completeUrndSum + completeVSum)+"백만원</span>");

        $("#totCount").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"\", 0)'>"+camPrj.comma(totalData.ENGN_EXPECT_COUNT + totalData.RND_EXPECT_COUNT + totalData.URND_EXPECT_COUNT + totalData.V_EXPECT_COUNT +
            totalData.ENGN_PROGRESS_COUNT + totalData.RND_PROGRESS_COUNT + totalData.URND_PROGRESS_COUNT + totalData.V_PROGRESS_COUNT + totalData.ENGN_COMPLETE_COUNT + totalData.RND_COMPLETE_COUNT + totalData.URND_COMPLETE_COUNT + totalData.V_COMPLETE_COUNT)+ "건</span>");
        $("#totSum").html("<span class='hoverSpan' style='cursor:pointer' onclick='camPrj.searchGrid(\"\", 0)'>"+camPrj.comma(expectEngnSum + expectRndSum + expectUrndSum + expectVSum + progressEngnSum + progressRndSum + progressUrndSum + progressVSum + completeEngnSum + completeRndSum + completeUrndSum + completeVSum)+"백만원</span>");



    },

    searchGrid: function(busnClass, row){
        if(row != 0){
            row = row + 1;
        }
        $("#busnClass").data("kendoDropDownList").value(busnClass);
        $("#busnSubClass").data("kendoDropDownList").select(row);
        $("#deptName").val("");
        $("#deptSeq").val("");
        $("#searchValue").data("kendoDropDownList").select(0);
        $("#searchValue2").data("kendoDropDownList").select(0);
        $("#searchText").val("");
        camPrj.gridReload();
    },

    fn_statTableShowHide : function(){
        if($("#statTable").attr("view") == "Y"){
            $("#statTable").attr("view", "N");
            $("#statTable").hide();
            $("#displayBtn").text("통계 ▼");
        } else {
            $("#statTable").attr("view", "Y");
            $("#statTable").show();
            $("#displayBtn").text("통계 ▲");
        }
    }
}

function gridReload(){
    camPrj.gridReload();
}