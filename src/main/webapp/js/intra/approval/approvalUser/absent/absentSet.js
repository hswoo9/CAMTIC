/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 부재설정 리스트
 *
 * function / global variable / local variable setting
 */
var absentSet = {
    global : {
        params : "",
        loginInfo_id : "",
        loginInfo_organ : "",
        loginInfo_userNm : "",
        loginInfo_compNm : "",
        loginInfo_compSeq : "",
        absenceType : "",
        approvalCode : "apprv", //임시 결재코드
        dropDownDataSource : "",
        frmPop : "",
        windowPopUrl : "",
        popName : "",
        popStyle : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fnDefaultScript : function(params){
        absentSet.global.params = params;
        absentSet.global.loginInfo_id = params.loginVO.uniqId;
        absentSet.global.loginInfo_organ = params.loginVO.orgnztId;
        absentSet.global.loginInfo_userNm = params.loginVO.name;
        absentSet.global.loginInfo_compNm = params.loginVO.organNm;
        absentSet.global.loginInfo_compSeq = params.loginVO.organId;
        absentSet.global.absenceType = params.loginVO.userSe;

        var now = new Date();

        absentSet.global.dropDownDataSource = [
            { text : "예약", value : "2" },
            { text : "부재중", value : "1" },
            { text : "자동해제", value : "3" },
            { text : "수동해제", value : "4" },
        ];

        customKendo.fn_dropDownList("absentCode", absentSet.global.dropDownDataSource, "text", "value");
        customKendo.fn_datePicker("aisday", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("aieday", '', "yyyy-MM-dd", new Date(now.getFullYear(), now.getMonth() + 1));
        $("#aisday, #aieday").attr("readonly", true);

        absentSet.kendoSet();
        absentSet.gridReload();

        /** 상세검색 조건 초기화 */
        // if($("#absenceTxt").val()==''){
        //     $("#absenceSeq").val('');
        // }
        // if($("#absentTxt").val()==''){
        //     $("#absentSeq").val('');
        // }
    },

    mainGrid :  function(url, params){
        /**
         *  부재자 리스트 DataSource
         *  url : /approvalUser/getAbsentSetList.do
         */
        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 390,
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
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
                        return '<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="absentSet.gridReload()">' +
                            '   <span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="absentSet.absentSetAddPop()">' +
                                '   <span class="k-button-text">부재등록</span>' +
                                '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="absentSet.setAbsentInfoUpd()">' +
                                '   <span class="k-button-text">삭제</span>' +
                                '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "부재설정 목록.xlsx",
                filterable : true,
                allPages: true
            },
            dataBound : absentSet.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : function(e) {
                        if (!e.C_AISTATUS || e.C_AISTATUS == '1') {
                            return "<input type='checkbox' name='absPk' value='"+ e.C_AISTATUS + "' class='k-checkbox checkbox noCheck' disabled style='background-color: lightgray;'/>";
                        }else{
                            return "<input type='checkbox' name='absPk' value='"+ e.C_AISTATUS + "' class='k-checkbox checkbox'/>";
                        }
                    },
                    width: 40
                }, {
                    title: "대결자 정보",
                    columns : [
                        {
                            field: "C_VIORGNAME",
                            title: "부서",
                            width: 100,
                        }, {
                            field: "VIPOSITION_NM",
                            title: "직급",
                            width: 80,
                        }, {
                            field: "C_VIUSERINFO",
                            title: "대결자(ID)",
                            width: 100,
                        }, {
                            field: "C_AISDAY",
                            title: "시작일시",
                            width: 130,
                            template : function(e) {
                                return e.C_AISDAY+ " " + e.C_AISTIME;
                            }
                        }, {
                            field: "C_AIEDAY",
                            title: "종료일시",
                            width: 130,
                            template : function(e) {
                                return e.C_AIEDAY+ " " + e.C_AIETIME;
                            }
                        }, {
                            field: "C_AISTATUS",
                            title: "부재상태",
                            width: 70,
                            template : function(e){
                                var html = "";
                                if(e.C_AISTATUS == "1"){
                                    html = "부재중";
                                }else if(e.C_AISTATUS == "2"){
                                    html = "예약";
                                }else{
                                    if(e.C_AIFLAG == "0"){
                                        html = "자동해제";
                                    }else if(e.C_AIFLAG == "1"){
                                        html = "수동해제";
                                    }
                                }
                                return html;
                            }
                        }
                    ]
                } , {
                    title: "부재자 정보",
                    columns : [
                        {
                            field: "USERINFO",
                            title: "부재자(ID)",
                            width: 100,
                        }, {
                            field: "C_CIKEYNM",
                            title: "부재사유",
                            width: 100,
                        }, {
                            field: "DEPT_NAME",
                            title: "부서",
                            width: 100,
                        }, {
                            field: "POSITION_NM",
                            title: "직급",
                            width: 80,
                        }
                    ]
                }, {
                    title: "수정정보",
                    columns : [{
                        field: "C_MODIFYUSERNAME",
                        title: "최종수정자(ID)",
                        width: 100,
                    }]
                }],
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) {
                $("input[name=absPk]").not(".noCheck").prop("checked", true);
            }else{
                $("input[name=absPk]").not(".noCheck").prop("checked", false);
            }
        });

        $(".noCheck").closest("td").css("cursor", "not-allowed");
    },

    onDataBound : function(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            absentSet.absentPop(dataItem);

        });
    },

    gridReload : function() {
        absentSet.global.searchAjaxData = {
            absentCode : $("#absentCode").val(),
            aisday : $("#aisday").val(),
            aieday : $("#aieday").val(),
            c_viauthority : absentSet.global.approvalCode,   //임시
            deptComp : $("#deptComp").val(),
            deptTeam : $("#deptTeam").val()

            /** 상세검색 조건*/
            // absenceSeq : $("#absenceSeq").val(),    //부재자seq
            // deptSeq : $("#deptSeq").val(),
            // absenceCode : $("#absenceCode").val(), //부재종류
            // absentSeq : $("#absentSeq").val(),  //대행자 seq
            // viDeptSeq : $("#viDeptSeq").val(),
            // modifySeq : $("#modifySeq").val(),	//최종수정자
            // moDeptSeq : $("#moDeptSeq").val(),
        }

        absentSet.mainGrid("/approvalUser/getAbsentSetList.do", absentSet.global.searchAjaxData);
    },

    setComSearText : function(){
        //부재자
        $("#absenceTxt").val('');
        $("#absenceSeq").val('');
        $("#deptSeq").val('');
        //대결자
        $("#absentTxt").val('');
        $("#absentSeq").val('');
        $("#viDeptSeq").val('');
        //최종수정자
        $("#modifyTxt").val('');
        $("#modifySeq").val('');
        $("#moDeptSeq").val('');
    },

    setAbsentInfoUpd : function(){
        var flag = true;

        if($("input[name='absPk']:checked").length == 0){
            alert("삭제 할 부재정보를 선택해주세요.");
            flag = false;
            return;
        }

        if(flag){
            if(confirm("선택한 부재정보를 삭제하시겠습니까?")){
                var grid = $("#mainGrid").data("kendoGrid");

                var c_uiuserkey = '';
                var c_oiorgcode = '';
                var c_aiseqnum = '';

                $.each($("input[name='absPk']:checked"), function(i, v){
                    var dataItem = grid.dataItem($(v).closest("tr"));
                    c_uiuserkey += dataItem.C_UIUSERKEY + "|";
                    c_oiorgcode += dataItem.C_OIORGCODE + "|";
                    c_aiseqnum += dataItem.C_AISEQNUM + "|";
                })

                c_uiuserkey = c_uiuserkey.substring(0, c_uiuserkey.length - 1);
                c_oiorgcode = c_oiorgcode.substring(0, c_oiorgcode.length - 1);
                c_aiseqnum = c_aiseqnum.substring(0, c_aiseqnum.length - 1);

                absentSet.global.saveAjaxData = {
                    c_aistatus : 'd',
                    c_uiuserkey : c_uiuserkey,
                    c_oiorgcode : c_oiorgcode,
                    c_aiseqnum : c_aiseqnum,
                    oriAbsenceSeq : c_uiuserkey,
                    oriDeptSeq : c_oiorgcode,
                }
                var result = customKendo.fn_customAjax("/absentSet/setAbsentInfoUpd.do", absentSet.global.saveAjaxData);

                if(result.flag){
                    alert("삭제 되었습니다.");
                    absentSet.gridReload();
                }else{
                    alert("부재정보 삭제 중 에러가 발생했습니다.");
                }
            }
        }
    },

    absentPop : function(e){
        absentSet.getParam(e);

        absentSet.global.windowPopUrl = "/absentSet/absentSetPop.do";
        absentSet.global.popName = "absentSetPop";
        absentSet.global.popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=735, height=340";

        var pop = window.open('', absentSet.global.popName, absentSet.global.popStyle);
        absentSet.global.frmPop = document.frmPop;
        absentSet.global.frmPop.action = absentSet.global.windowPopUrl;
        absentSet.global.frmPop.target = absentSet.global.popName;
        absentSet.global.frmPop.submit();
        pop.focus();
    },

    getParam : function(e){
        $("#compSeq").val(e.COMP_SEQ);
        $("#compName").val(e.COMP_NAME);
        $("#comp_seq").val(e.COMP_SEQ);
        $("#comp_name").val(e.COMP_NAME);
        $("#emp_seq").val(e.EMP_SEQ);
        $("#emp_name").val(e.EMP_NAME);
        $("#dept_seq").val(e.DEPT_SEQ);
        $("#dept_name").val(e.DEPT_NAME);
        $("#c_aiseqnum").val(e.C_AISEQNUM);
        $("#c_cikeycode").val(e.C_CIKEYCODE);
        $("#c_aimemo").val(e.C_AIMEMO);
        $("#c_aiflag").val(e.C_AIFLAG);
        $("#c_aisday").val(e.C_AISDAY);
        $("#c_aistime").val(e.C_AISTIME);
        $("#c_aieday").val(e.C_AIEDAY);
        $("#c_aietime").val(e.C_AIETIME);
        $("#c_aistatus").val(e.C_AISTATUS);
        $("#c_viuserkey").val(e.C_VIUSERKEY);
        $("#c_viorgcode").val(e.C_VIORGCODE);
        $("#c_viusername").val(e.C_VIUSERNAME);
        $("#c_viorgname").val(e.C_VIORGNAME);
        $("#c_mday").val(e.C_MDAY);
        $("#c_mtime").val(e.C_MTIME);
        $("#c_aialim").val(e.C_AIALIM);
    },

    initParam : function(){
        $("#compSeq").val('');
        $("#compName").val('');
        $("#comp_seq").val('');
        $("#comp_name").val('');
        $("#emp_seq").val('');
        $("#emp_name").val('');
        $("#dept_seq").val('');
        $("#dept_name").val('');
        $("#c_aiseqnum").val('');
        $("#c_cikeycode").val('');
        $("#c_aimemo").val('');
        $("#c_aiflag").val('');
        $("#c_aisday").val('');
        $("#c_aistime").val('');
        $("#c_aieday").val('');
        $("#c_aietime").val('');
        $("#c_aistatus").val('');
        $("#c_viuserkey").val('');
        $("#c_viorgcode").val('');
        $("#c_viusername").val('');
        $("#c_viorgname").val('');
        $("#c_mday").val('');
        $("#c_mtime").val('');
        $("#c_aialim").val('');
    },

    absentSetAddPop : function(e){
        absentSet.initParam();

        $("#emp_seq").val(absentSet.global.loginInfo_id);
        $("#emp_name").val(absentSet.global.loginInfo_userNm);
        $("#dept_seq").val(absentSet.global.loginInfo_organ);
        $("#compName").val(absentSet.global.loginInfo_compNm);

        absentSet.global.windowPopUrl = "/absentSet/absentSetPop.do";
        absentSet.global.popName = "absentSetAddPop";
        absentSet.global.popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=735, height=340";

        absentSet.global.frmPop = document.frmPop;
        var pop = window.open('', absentSet.global.popName, absentSet.global.popStyle);

        absentSet.global.frmPop.action = absentSet.global.windowPopUrl;
        absentSet.global.frmPop.target = absentSet.global.popName;
        absentSet.global.frmPop.submit();
    },

    dateValidationCheck : function(id, val){
        var sDt = new Date($("#aisday").val());
        var nDt = new Date($("#aieday").val());

        if(id == "aisday"){
            if(sDt > nDt){
                $("#aieday").data("kendoDatePicker").value(val);
            }
        }else{
            if(sDt > nDt){
                $("#aisday").data("kendoDatePicker").value(val);
            }
        }
    },

    kendoSet : function(){
        var data = {

        }
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq");

        $("#deptComp").data("kendoDropDownList").bind("change", absentSet.fn_chngDeptComp)
        $("#deptComp").data("kendoDropDownList").select(0);
        $("#deptComp").data("kendoDropDownList").trigger("change");
    },

    fn_chngDeptComp : function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("deptTeam", ds.rs, "dept_name", "dept_seq")
    },
}