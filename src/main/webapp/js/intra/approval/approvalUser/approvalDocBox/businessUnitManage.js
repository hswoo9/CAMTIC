/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 문서함 > 내 문서함
 *
 * function / global variable / local variable setting
 */
var businessUnitManage = {
    global : {
        _g_compSeq      : $("#compSeq").val(),
        _g_compName      : $("#compName").val(),
        _g_groupSeq      : $("#groupSeq").val(),
        _g_deptSeq      : $("#deptSeq").val(),
        _g_userSe      : $("#userSe").val(),
        _g_manageDeptSeq : $("#selSeq").val(),
        _g_manageDeptName : $("#selName").val(),

        dropDownDataSource : "",
        searchAjaxData  : "",
        saveAjaxData    : "",
        now             : new Date(),

        windowPopUrl    : "",
        popName         : "",
        popStyle        : "",
        share_yn        : "",

        searchNo        : "",
        searchText      : "",
    },

    fnDefaultScript : function(){
        businessUnitManage.global.dropDownDataSource = [
            { text : "전체", value : "" },
            { text : "그룹", value : "g" },
            { text : "회사", value : "c" },
            { text : "부서", value : "d" },
        ];

        $("#searchType").kendoDropDownList({
            dataSource : businessUnitManage.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value",
        });

        $("#searchKeyWord").kendoTextBox();

        Pudd( "#exTab" ).puddTab({
            tabMenu : {
                attributes : { style:"", class:"" }// tabMenu 부모객체에 속성 설정하고자 하는 경우
            },
            tabArea : {
                attributes : { style:"", class:"scroll_on" }// tabMenu 부모객체에 속성 설정하고자 하는 경우
            },
            newTab : false
        });

        businessUnitManage.gridReload();
        businessUnitManage.getPreserveCodeDropDownMake();
        businessUnitManage.kendoSetting();
    },

    gridReload : function() {
        businessUnitManage.global.searchAjaxData = {
            groupSeq : businessUnitManage.global._g_groupSeq,
            deptSeq : businessUnitManage.global._g_deptSeq,
            wiGubun : $("#searchType").val(),
            searchKeyward : $("#searchKeyWord").val(),
        }

        businessUnitManage.mainGrid("/approvalUser/getBusinessUnitCodeList.do", businessUnitManage.global.searchAjaxData);
    },

    mainGrid :  function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 595,
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="businessUnitManage.setNewWorkCodeAdd()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>' +
                            '	<span class="k-button-text">신규</span>' +
                            '</button>';
                    }
                },{
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "목록.xlsx",
                filterable : true,
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : businessUnitManage.onDataBound,
            columns: [
                {
                    field : "C_WICOMPNAME",
                    title : "회사",
                    width: 180
                }, {
                    field : "C_WIDEPTNAME",
                    title : "부서",
                    width: 120
                }, {
                    field : "C_WINAME",
                    title : "단위업무",
                    width: 100
                }
            ]
        }).data("kendoGrid");
    },

    setNewWorkCodeAdd : function(){
        $("#delBtn").hide();
        $("#saveBtn").show();
        $("#updateChk").val("insert");
        $("#c_wikey").val("");

        Pudd( "#exTab" ).getPuddObject().setActiveTab( 0 );

        /** tab 1 기본정보 */
        $("#c_winame").val("");$("#c_winame").prop("disabled", false);$("#c_winame").removeClass("k-disabled");
        $("#c_wiafterexplain").val("");$("#c_wiafterexplain").prop("disabled", false);$("#c_wiafterexplain").removeClass("k-disabled");
        $("#c_asspreserve").data("kendoDropDownList").enable(true);
        $("#c_asspreserve").data("kendoDropDownList").select(0);
        $("#c_refpreserve").data("kendoDropDownList").enable(true);
        $("#c_refpreserve").data("kendoDropDownList").select(0);
        $("#c_effpreserve").data("kendoDropDownList").enable(true);
        $("#c_effpreserve").data("kendoDropDownList").select(0);
        $("#c_dutypreserve").val("");$("#c_dutypreserve").prop("disabled", false);$("#c_dutypreserve").removeClass("k-disabled");
        $("#c_valuepreserve").data("kendoRadioGroup").enable(true);
        $("#c_valuepreserve").data("kendoRadioGroup").value(0);
        $("#c_resppreserve").val("");$("#c_resppreserve").prop("disabled", false);$("#c_resppreserve").removeClass("k-disabled");
        $("#c_widisplay").val("");$("#c_widisplay").prop("disabled", false);$("#c_widisplay").removeClass("k-disabled");

        /** tab 2 추가항목 */
        $("#c_wiafternicname").val("");$("#c_wiafternicname").prop("disabled", false);$("#c_wiafternicname").removeClass("k-disabled");
        $("#c_wiaftermethod").data("kendoDropDownList").enable(true);
        $("#c_wiaftermethod").data("kendoDropDownList").select(0);
        $("#c_wiafterplace").data("kendoDropDownList").enable(true);
        $("#c_wiafterplace").data("kendoDropDownList").select(0);

        $("#c_wiafterprovide").data("kendoRadioGroup").enable(true);
        $("#c_wiaftertransfer").prop("disabled", false);$("#c_wiaftertransfer").removeClass("k-disabled");
        $("#c_wimainreading").data("kendoDropDownList").enable(true);
        $("#c_wimainreading").data("kendoDropDownList").select(0);
        $("#c_wireading").data("kendoRadioGroup").enable(true);
        $("#c_wireading").data("kendoRadioGroup").value(1);
        $("#c_wiafterprovide").data("kendoRadioGroup").trigger("change");

        $("#c_wiafterspecial").data("kendoRadioGroup").enable(true);
        $("#c_wiafterspecial").data("kendoRadioGroup").value(2);
        $("#c_wiafterspecial1").prop("disabled", false);$("#c_wiafterspecial1").removeClass("k-disabled");
        $("#c_wiafterspecial2").prop("disabled", false);$("#c_wiafterspecial2").removeClass("k-disabled");
        $("#c_wiafterspecial3").prop("disabled", false);$("#c_wiafterspecial3").removeClass("k-disabled");
        $("#c_wiafterspecial").data("kendoRadioGroup").trigger("change");
        var useOrgNameText = "[" + businessUnitManage.global._g_compName + "_" + businessUnitManage.global._g_manageDeptName + "]";
        businessUnitManage.fnSetUseGubun("d", businessUnitManage.global._g_compSeq, businessUnitManage.global._g_manageDeptSeq, businessUnitManage.global._g_manageDeptName, useOrgNameText);
        businessUnitManage.getWorkHistGrid([]);
    },

    fnSetUseGubun : function(gubun, compseq, orgcode, orgname, useOrgNameText){
        $("#c_wicompseq").val(compseq) ;
        $("#c_wiorgcode").val(orgcode) ;
        $("#c_wiorgname").html(orgname) ;

        var useText = "";
        if(gubun == "g"){
            useText = "그룹[모든회사] 공용으로 사용합니다.";
            $("#divChildren").hide();
            useOrgNameText = "";
        }else if(gubun == "c"){
            useText = "회사 공용으로 사용합니다.";
            $("#divChildren").hide();
        }else if(gubun == "d"){
            useText = "부서에서 사용합니다.";
            $("#divChildren").show();
            $("#c_wichildrenyn").prop("disabled", false);$("#c_wichildrenyn").removeClass("k-disabled")
        }

        $("#c_wigubun" ).val(gubun);
        $("#useText").html(useText);
        $("#useOrgNameText").html(useOrgNameText) ;
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            businessUnitManage.editing(dataItem);
        });
    },

    editing : function(e){
        $("#updateChk").val("update");
        $("#c_wikey").val(e.C_WIKEY);
        $("#delBtn").show();

        /** editing data setting (Tab 1 : 기본정보) */
        var useOrgNameText = "";
        console.log(e);
        if(e.C_WIGUBUN == "d"){
            if(e.C_WICHILDRENYN == "Y"){
                $("#c_wichildrenyn").prop("checked", true)
            }
            useOrgNameText = "[" +e.C_WICOMPNAME + "_" +e.C_WIORGNAME + "] ";
            businessUnitManage.fnSetUseGubun(e.C_WIGUBUN, e.C_WICOMPSEQ, e.C_WIAFTERORGCODE, e.C_WIORGNAME, useOrgNameText);
        }else{
            useOrgNameText = "[" +e.C_WICOMPNAME + "] ";
            businessUnitManage.fnSetUseGubun(e.C_WIGUBUN, e.C_WICOMPSEQ, e.C_WIAFTERORGCODE, e.C_WICOMPNAME, useOrgNameText);
        }

        // businessUnitManage.wiGubunInfoChange(e);

        $("#c_winame").val(e.C_WINAME);
        $("#c_wiafterexplain").val(e.C_WIAFTEREXPLAIN);
        $("#c_asspreserve").data("kendoDropDownList").value(e.C_ASSPRESERVE);
        $("#c_refpreserve").data("kendoDropDownList").value(e.C_REFPRESERVE);
        $("#c_effpreserve").data("kendoDropDownList").value(e.C_EFFPRESERVE);
        $("#c_dutypreserve").val(e.C_DUTYPRESERVE);
        $("#c_valuepreserve").data("kendoRadioGroup").value(e.C_VALUEPRESERVE);
        $("#c_resppreserve").val(e.C_RESPPRESERVE);
        $("#c_widisplay").val(e.C_WIDISPLAY);

        $("#c_wicompseq").val(e.C_WICOMPSEQ);
        $("#c_wiorgcode").val(e.C_WIAFTERORGCODE);

        /** editing data setting (Tab 2 : 추가정보) */
        $("#c_wiafternicname").val(e.C_WIAFTERNICNAME);
        $("#c_wiaftermethod").data("kendoDropDownList").value(e.C_WIAFTERMETHOD);
        $("#c_wiafterplace").data("kendoDropDownList").value(e.C_WIAFTERPLACE);

        $("#c_wiafterprovide").data("kendoRadioGroup").value(e.C_WIAFTERPROVIDE);
        $("#c_wiafterprovide").data("kendoRadioGroup").trigger("change");
        $("#c_wiaftertransfer").val(e.C_WIAFTERTRANSFER);
        $("#c_wimainreading").data("kendoDropDownList").value(e.C_WIMAINREADING);
        $("#c_wireading").data("kendoRadioGroup").value(e.C_WIREADING);

        $("#c_wiafterspecial").data("kendoRadioGroup").value(e.C_WIAFTERSPECIAL);
        $("#c_wiafterspecial").data("kendoRadioGroup").trigger("change");
        $("#c_wiafterspecial1").val(e.C_WIAFTERSPECIAL1);
        $("#c_wiafterspecial2").val(e.C_WIAFTERSPECIAL2);
        $("#c_wiafterspecial3").val(e.C_WIAFTERSPECIAL3);

        businessUnitManage.getWorkInfo(e.C_WIKEY, e.C_WIGUBUN);

        if((e.C_WIAFTERORGCODE != businessUnitManage.global._g_manageDeptSeq && e.C_WIAFTERORGCODE != businessUnitManage.global._g_deptSeq) || e.C_WIGUBUN != "d" ){
            /** tab 1 기본정보 */
            $("#saveBtn").hide();
            $("#delBtn").hide();
            $("#c_winame").prop("disabled", true);$("#c_winame").addClass("k-disabled");
            $("#c_wiafterexplain").prop("disabled", true);$("#c_wiafterexplain").addClass("k-disabled");
            $("#c_asspreserve").data("kendoDropDownList").enable(false);
            $("#c_refpreserve").data("kendoDropDownList").enable(false);
            $("#c_effpreserve").data("kendoDropDownList").enable(false);
            $("#c_dutypreserve").prop("disabled", true);$("#c_dutypreserve").addClass("k-disabled");
            $("#c_valuepreserve").data("kendoRadioGroup").enable(false);
            $("#c_resppreserve").prop("disabled", true);$("#c_resppreserve").addClass("k-disabled");
            $("#c_widisplay").prop("disabled", true);$("#c_widisplay").addClass("k-disabled");

            /** tab 2 추가정보 */
            $("#c_wiafternicname").prop("disabled", true);$("#c_wiafternicname").addClass("k-disabled");
            $("#c_wiaftermethod").data("kendoDropDownList").enable(false);
            $("#c_wiafterplace").data("kendoDropDownList").enable(false);
            $("#c_wiafterprovide").data("kendoRadioGroup").enable(false);
            $("#c_wiaftertransfer").prop("disabled", true);$("#c_wiaftertransfer").addClass("k-disabled");
            $("#c_wimainreading").data("kendoDropDownList").enable(false);
            $("#c_wireading").data("kendoRadioGroup").enable(false);
            $("#c_wiafterspecial").data("kendoRadioGroup").enable(false);
            $("#c_wiafterspecial1").prop("disabled", true);$("#c_wiafterspecial1").addClass("k-disabled");
            $("#c_wiafterspecial2").prop("disabled", true);$("#c_wiafterspecial2").addClass("k-disabled");
            $("#c_wiafterspecial3").prop("disabled", true);$("#c_wiafterspecial3").addClass("k-disabled");

        }else{
            /** tab 1 기본정보 */
            $("#saveBtn").show();
            $("#delBtn").show();
            $("#c_winame").prop("disabled", false);$("#c_winame").removeClass("k-disabled");
            $("#c_wiafterexplain").prop("disabled", false);$("#c_wiafterexplain").removeClass("k-disabled");
            $("#c_asspreserve").data("kendoDropDownList").enable(true);
            $("#c_refpreserve").data("kendoDropDownList").enable(true);
            $("#c_effpreserve").data("kendoDropDownList").enable(true);
            $("#c_dutypreserve").prop("disabled", false);$("#c_dutypreserve").removeClass("k-disabled");
            $("#c_valuepreserve").data("kendoRadioGroup").enable(true);
            $("#c_resppreserve").prop("disabled", false);$("#c_resppreserve").removeClass("k-disabled");
            $("#c_widisplay").prop("disabled", false);$("#c_widisplay").removeClass("k-disabled");

            /** tab 2 추가정보 */
            $("#c_wiafternicname").prop("disabled", false);$("#c_wiafternicname").removeClass("k-disabled");
            $("#c_wiaftermethod").data("kendoDropDownList").enable(true);
            $("#c_wiafterplace").data("kendoDropDownList").enable(true);

            $("#c_wiafterprovide").data("kendoRadioGroup").enable(true);
            $("#c_wiaftertransfer").prop("disabled", false);$("#c_wiaftertransfer").removeClass("k-disabled");
            $("#c_wiafterprovide").data("kendoRadioGroup").trigger("change");

            $("#c_wiafterspecial").data("kendoRadioGroup").enable(true);
            $("#c_wiafterspecial").data("kendoRadioGroup").trigger("change");

            $("#c_wiafterspecial1").prop("disabled", false);$("#c_wiafterspecial1").removeClass("k-disabled");
            $("#c_wiafterspecial2").prop("disabled", false);$("#c_wiafterspecial2").removeClass("k-disabled");
            $("#c_wiafterspecial3").prop("disabled", false);$("#c_wiafterspecial3").removeClass("k-disabled");
        }
    },

    /** Tab3 : 수정이력 목록 */
    getWorkInfo : function(c_wikey, c_wigubun){
        if(!c_wikey){
            alert("단위업무 정보가 없습니다.");
            return;
        }
        $("#tab3").show();

        $.ajax({
            url : getContextPath() + '/approvalManagement/getWorkCodeInfo.do',
            data : {
                c_wikey : c_wikey
            },
            dataType : "json",
            type : "POST",
            async : false,
            success : function(rs){
                var rs = rs.rs;
                var archCnt = rs.archCnt;
                businessUnitManage.getWorkHistGrid(rs.historyList);

                if(archCnt > 0){
                    $("#c_wiorgname").addClass("k-disabled");
                    $("#c_wichildrenyn").addClass("k-disabled");
                }else{
                    $("#c_wichildrenyn").removeClass("k-disabled");
                }
            },
            error : function(rs){
                alert("error");
            }
        });
    },

    getWorkHistGrid : function(historyList){
        /**
         *  단위업무 수정이력 목록 DataSource
         *  url : /approvalManagement/getWorkCodeInfo.do
         */
        var reviseHistoryDataSource = new kendo.data.DataSource({
            serverPaging: false,
            data: historyList,
            total: historyList.length,
            pageSize: 10,
        });

        var reviseHistoryGrid = $("#reviseHistoryGrid").kendoGrid({
            dataSource: reviseHistoryDataSource,
            height: 520,
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            columns: [
                {
                    field : "NUM",
                    title : "NO",
                    width: 30
                }, {
                    field : "USERNAME",
                    title : "수정자",
                    width: 120
                }, {
                    field : "C_WCDATE",
                    title : "수정일시",
                    width: 120
                }, {
                    field : "MODIFY_ITEM",
                    title : "수정항목",
                    attributes: { style: "text-align: left" },
                    width: 200
                }
            ]
        }).data("kendoGrid");
    },

    kendoSetting : function(){
        $("#c_valuepreserve").kendoRadioGroup({
            items: [
                { label : "높음", value : "0" },
                { label : "낮음", value : "1" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : 0,

        });
        $("#c_winame, #c_wiafterexplain, #c_dutypreserve, #c_resppreserve, #c_widisplay").kendoTextBox();

        /** Tab2 : 추가정보 kendo setting */
        $("#c_wiafternicname, #c_wiaftertransfer, #c_wiafterspecial1, #c_wiafterspecial2, #c_wiafterspecial3").kendoTextBox();
        $("#c_wiafterprovide").kendoRadioGroup({
            items: [
                { label : "불필요", value : "1" },
                { label : "필요", value : "0" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : 1,
            change : function(){
                businessUnitManage.enableTargetSetting(this.value(), "enableTarget1");
            }
        });

        $("#c_wireading").kendoRadioGroup({
            items: [
                { label : "높음", value : "1" },
                { label : "중간", value : "2" },
                { label : "낮음", value : "3" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : 1,
            enable : false
        });

        $("#c_wiafterspecial").kendoRadioGroup({
            items: [
                { label : "해당없음", value : "2" },
                { label : "기록물철", value : "0" },
                { label : "기록물", value : "1" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : 2,
            change : function(){
                businessUnitManage.enableTargetSetting(this.value(), "enableTarget2");
            }
        });

        businessUnitManage.enableTargetSetting();
    },

    /**
     * Tab1 : 기본정보 kendo dropDownList setting
     * Tab2 : 추가정보 kendo dropDownList setting
     * */
    getPreserveCodeDropDownMake : function(){
        $.ajax({
            url : getContextPath() + '/system/commonCodeManagement/getCmCodeList.do',
            data : {
                searchType : "1",
                cmGroupCodeId : JSON.stringify(["14", "16", "17", "18"])
            },
            dataType : "json",
            type : "POST",
            async : false,
            success : function(result){
                var result = result.codeList;
                $("#c_asspreserve, #c_refpreserve, #c_effpreserve").kendoDropDownList({
                    dataSource: result.filter(code => code.CM_GROUP_CODE_ID == 14),
                    dataValueField : "CM_CODE",
                    dataTextField : "CM_CODE_NM",
                    index: 0
                });
                $("#c_wiaftermethod").kendoDropDownList({
                    dataSource: result.filter(code => code.CM_GROUP_CODE_ID == 16),
                    dataValueField : "CM_CODE",
                    dataTextField : "CM_CODE_NM",
                    index: 0
                });
                $("#c_wiafterplace").kendoDropDownList({
                    dataSource: result.filter(code => code.CM_GROUP_CODE_ID == 17),
                    dataValueField : "CM_CODE",
                    dataTextField : "CM_CODE_NM",
                    index: 0
                });
                $("#c_wimainreading").kendoDropDownList({
                    dataSource: result.filter(code => code.CM_GROUP_CODE_ID == 18),
                    dataValueField : "CM_CODE",
                    dataTextField : "CM_CODE_NM",
                    index: 0,
                    enable : false
                });
            }
        });
    },

    enableTargetSetting : function(e, target){
        var enableType = true;

        if(e == null){
            $.each($(".enableTargetInput input"), function(i, v){
                $(this).data("kendoTextBox").enable(false);
            });
            $.each($(".enableTargetRadioGroup"), function(i, v){
                $(this).data("kendoRadioGroup").enable(false);
            })
        }else if(target == "enableTarget1"){
            if(e != 0){
                enableType = false;
            }

            $.each($(".enableTargetInput.enableTarget1 input"), function(i, v){
                $(this).val("");
                $(this).data("kendoTextBox").enable(enableType);
            });
            $.each($(".enableTargetRadioGroup.enableTarget1"), function(i, v){
                $(this).data("kendoRadioGroup").value("1");
                $(this).data("kendoRadioGroup").enable(enableType);
            });
            $("#c_wimainreading").data("kendoDropDownList").select(0);
            $("#c_wimainreading").data("kendoDropDownList").enable(enableType);
        }else if(target == "enableTarget2"){
            if(e == 2){
                enableType = false;
            }
            $.each($(".enableTargetInput.enableTarget2 input"), function(i, v){
                $(this).val("");
                $(this).data("kendoTextBox").enable(enableType);
            });
        }
    },

    setWorkCode(){
        var flag = true;
        var c_wigubun = $("#c_wigubun").val();

        if(c_wigubun == "c" && $("#c_wicompseq").val() == "0"){
            alert("필수 값을 입력 해 주세요.");
            $("#businessUnitInfoTabStrip").data("kendoTabStrip").select(0);
            flag = false;
            return;
        }else if(c_wigubun == "d" && $("#c_wiorgcode").val() == "0"){
            alert("필수 값을 입력 해 주세요.");
            $("#businessUnitInfoTabStrip").data("kendoTabStrip").select(0);
            flag = false;
            return;
        }else if ($("#c_winame").val() == ""){
            alert("필수 값을 입력 해 주세요.");
            $("#c_winame").focus();
            $("#businessUnitInfoTabStrip").data("kendoTabStrip").select(0);
            flag = false;
            return;
        }else if ($("#c_wiafterexplain").val() == ""){
            alert("필수 값을 입력 해 주세요.");
            $("#c_wiafterexplain").focus();
            $("#businessUnitInfoTabStrip").data("kendoTabStrip").select(0);
            flag = false;
            return;
        }

        var c_wiafterprovide = $("#c_wiafterprovide").getKendoRadioGroup().value();
        if(c_wiafterprovide == "0" && $("#c_wiaftertransfer").val() == ""){
            alert("필수 값을 입력 해 주세요.");
            $("#c_wiaftertransfer").focus();
            $("#businessUnitInfoTabStrip").data("kendoTabStrip").select(1);
            flag = false;
            return;
        }

        var c_wiafterspecial  = $("#c_wiafterspecial").getKendoRadioGroup().value();
        if(c_wiafterspecial != "2" && $("#c_wiafterspecial1").val() == ""){
            alert("필수 값을 입력 해 주세요.");
            $("#c_wiafterspecial1").focus();
            $("#businessUnitInfoTabStrip").data("kendoTabStrip").select(1);
            flag = false;
            return;
        }

        if(!$("#c_widisplay").val()){
            alert("정렬순서를 입력해주세요.");
            flag = false;
            return;
        }

        var c_wigubun = $("#c_wigubun").val();

        if(flag){
            if(confirm("저장 하시겠습니까?")){
                if(c_wiafterprovide == "1"){
                    $("#c_wiaftertransfer").val("");
                }

                if(c_wiafterspecial == "2"){
                    $("#c_wiafterspecial1").val("");
                    $("#c_wiafterspecial2").val("");
                    $("#c_wiafterspecial3").val("");
                }else{
                }

                var c_wichildrenyn = "N";
                if($("#c_wigubun").val() == "d" && $("#c_wichildrenyn").prop("checked")){
                    c_wichildrenyn = "Y";
                }

                $.ajax({
                    url : getContextPath() + '/approvalManagement/setWorkCode.do',
                    data : {
                        c_wigubun : c_wigubun,
                        updateChk : $("#updateChk").val(),
                        c_wikey : $("#c_wikey").val(),
                        c_winame : $("#c_winame").val(),
                        c_wiafternicname : $("#c_wiafternicname").val(),
                        c_wiafterexplain : $("#c_wiafterexplain").val(),
                        c_refpreserve : $("#c_refpreserve").val(),
                        c_effpreserve : $("#c_effpreserve").val(),
                        c_asspreserve : $("#c_asspreserve").val(),
                        c_valuepreserve : $("#c_valuepreserve").getKendoRadioGroup().value(),
                        c_dutypreserve : $("#c_dutypreserve").val(),
                        c_resppreserve : $("#c_resppreserve").val(),
                        c_wiaftermethod : $("#c_wiaftermethod").val(),
                        c_wiafterplace : $("#c_wiafterplace").val(),
                        c_wiafterprovide : c_wiafterprovide,
                        c_wiaftertransfer : $("#c_wiaftertransfer").val(),
                        c_wimainreading : $("#c_wimainreading").val(),
                        c_wireading : $("#c_wireading").getKendoRadioGroup().value(),
                        c_wiafterspecial : c_wiafterspecial,
                        c_wiafterspecial1 : $("#c_wiafterspecial1").val(),
                        c_wiafterspecial2 : $("#c_wiafterspecial2").val(),
                        c_wiafterspecial3 : $("#c_wiafterspecial3").val(),
                        c_widisplay : $("#c_widisplay").val(),
                        c_wicompseq : $("#c_wicompseq").val(),
                        c_wiorgcode : $("#c_wiorgcode").val(),
                        c_wichildrenyn : c_wichildrenyn
                    },
                    dataType : "json",
                    type : "POST",
                    async : false,
                    success : function(){
                        alert("저장 되었습니다.");
                        businessUnitManage.gridReload();
                        businessUnitManage.setNewWorkCodeAdd();
                    },
                    error : function(){
                        alert("저장에 실패하였습니다.");
                    }
                });
            }
        }else{
            alert("필수 값을 다시 확인해 주세요.");
        }
    },

    setWorkCodeDel : function(){
        var c_wikey = $("#c_wikey").val();
        if(ncCom_Empty(c_wikey)){
            alert("삭제할 단위업무를 선택해 주세요");
            return;
        }

        if(confirm("삭제 하시겠습니까?")){
            businessUnitManage.global.saveAjaxData = {
                c_wikey : c_wikey
            }

            var result = customKendo.fn_customAjax("/approvalManagement/setWorkCodeDel.do", businessUnitManage.global.saveAjaxData);
            if(result.flag){
                if(result.result > 0){
                    alert("삭제되었습니다.");
                    businessUnitManage.gridReload();
                    businessUnitManage.setNewWorkCodeAdd();
                }else if(data.result < 0){
                    alert("삭제 처리중 오류가 발생하였습니다.");
                }else if(data.result == 0){
                    alert("등록된 기록물철이 존재하여 삭제할수 없습니다.");
                }
            }
        }
    }
}