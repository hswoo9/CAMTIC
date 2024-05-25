/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 장비관리 - 장비관리 (관리자) 팝업창
 */
var now = new Date();
var record = 0;
var equipmentmangePop = {

    global : {
        eqipmnGbnName : [],
        dataCheck : false,
        eqipmnMstSn : "",
    },

    fn_defaultScript: function () {

        customKendo.fn_datePicker("regDe", '', "yyyy-MM-dd", new Date());
        $("#regDe").attr("readonly", true);

        $("#mainEqipmnName").kendoTextBox();

        $("#companyDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                {text: "도내(단지)", value: "도내(단지)"},
                {text: "도내(단지 외)", value: "도내(단지 외)"},
                {text: "도외", value: "도외"}
            ],
            index: 0
        });

        $("#eqipmnName").kendoTextBox();
        $("#regtrName").kendoTextBox();
        $("#sortSn").kendoTextBox();
        $("#hourlyUsageFee").kendoTextBox();

        /*$("#regDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            /!*value : new Date(now.setMonth(now.getMonth()))*!/
        });*/

        $.ajax({
            url : "/asset/getEqipmnList",
            type : "post",
            async: false,
            dataType : "json",
            success : function (result){
                var ds = result.list;
                ds.unshift({TEXT: '전체', VALUE: ''});

                $("#eqipmnGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                }),
                $("#mainEqipmnGbnName").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                })
            }
        })

        $(".numberInput").keyup(function(){
            $(this).val(equipmentmangePop.comma(equipmentmangePop.uncomma($(this).val())));
        });
    },

    dataClear : function() {
        $("#eqipmnGbnName").data("kendoDropDownList").value("");
        $("#eqipmnName").val("");
        $("#regtrName").val("");
        $("#regDe").val("");
        $("#sortSn").val("");

        $("#save").removeAttr("onclick");
        $("#save").attr("onclick", "equipmentmangePop.equipSave();");

    },

    mainGrid : function(e) {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/asset/getEqipmnRegList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {

                    data.eqipmnName = $("#mainEqipmnName").val();
                    data.eqipmnGbnCmmnCdSn = $("#mainEqipmnGbnName").getKendoDropDownList().value();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.rs;
                },
                total: function (data) {
                    record = data.rs.length
                    return data.rs.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name: '',
                    text: '삭제',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="equipmentmangePop.selectChkDel()">' +
                            '   <span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    /*text: '신규'*/
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="equipmentmangePop.dataClear()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>' +
                            '   <span class="k-button-text">신규</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : equipmentmangePop.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="equipmentmangePop.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template : "<input type='checkbox' id='eqmnPk#=EQIPMN_MST_SN#' name='eqmnPk' value='#=EQIPMN_MST_SN#'/>",
                    width: 50
                }, {
                    field: "SORT_SN",
                    title: "순번",
                    /*template: "#= record-- #",*/
                    width: "10%"
                }, {
                    field: "EQIPMN_GBN_NAME",
                    title: "구분",
                    width: "20%"
                }, {
                    field: "EQIPMN_NAME",
                    title: "장비명"
                },{
                    field: "REGTR_NAME",
                    title: "담당자"
                }, {
                    field: "REG_DE",
                    title: "등록 일자"
                }
            ]
        }).data("kendoGrid");

        $("#mainGrid").on("dblclick", "tr.k-state-selected", function (e) {
            var selectedItem = $("#mainGrid").data("kendoGrid").dataItem(this);
            var dropdownlist = $("#eqipmnGbnName").data("kendoDropDownList");
            dropdownlist.text(selectedItem.EQIPMN_GBN_NAME); //구분명
            dropdownlist.value(selectedItem.EQIPMN_GBN_CMMN_CD_SN); //구분값
            console.log(selectedItem);
            $("#eqipmnName").val(selectedItem.EQIPMN_NAME); //장비명
            $("#regtrName").val(selectedItem.REGTR_NAME); //등록자
            $("#regDe").val(selectedItem.REG_DE); //등록 일자
            $("#sortSn").val(selectedItem.SORT_SN); //순번
            $("#hourlyUsageFee").val(equipmentmangePop.comma(selectedItem.HOURLY_USAGE_FEE)); //시간당 사용대금
            //pk
            equipmentmangePop.global.eqipmnMstSn = selectedItem.EQIPMN_MST_SN;
            $("#save").removeAttr("onclick"); //더블 클릭하고 저장 버튼 클릭시 속성값 제거
            $("#save").attr("onclick", "equipmentmangePop.equipUpdate();"); //업데이트 속성값 적용
        });
    },

    equipSave : function (){

        if(confirm("저장하시겠습니까?")){
            var data = {
                eqipmnName : $("#eqipmnName").val(), //장비명
                eqipmnGbnName : $("#eqipmnGbnName").data("kendoDropDownList").text(), //구분명
                eqipmnGbnCmmnCdSn : $("#eqipmnGbnName").data("kendoDropDownList").value(), //구분공통코드sn
                regtrName : $("#regtrName").val(), //등록자명
                regtrSn : $("#empSeq").val(), //등록자 사원번호
                regDe : $("#regDe").val().replaceAll('-',''), //등록일자
                sortSn : $("#sortSn").val(), //정렬순번,
                crtrSn : $("#empSeq").val(), //생성자sn - 로그인한 계정
                hourlyUsageFee : equipmentmangePop.uncomma($("#hourlyUsageFee").val()) //시간당 사용대금
            }

            if(data.eqipmnGbnCmmnCdSn == null || data.eqipmnGbnCmmnCdSn == ''){
                alert("구분을 선택하세요.")
                return false;
            }else if(data.eqipmnName == null || data.eqipmnName == ''){
                alert("장비명을 입력하세요.")
                return false;
            }else if(data.regtrName == null || data.regtrName == ''){
                alert("등록자를 입력하세요.")
                return false;
            }else if(data.regDe == null || data.regDe == ''){
                alert("등록 일자를 입력하세요.")
                return false;
            }else if(data.sortSn == null || data.sortSn == '') {
                alert("정렬순번을 입력하세요.")
                return false;
            }else if(data.hourlyUsageFee == null || data.hourlyUsageFee == '') {
                alert("시간당 사용대금을 입력하세요.")
                return false;
            }
            console.log(data);

            $.ajax({
                url : '/asset/setEquipmentInsert',
                data : data,
                dataType: "json",
                type : "get",
                async : false
            });
            alert("저장 되었습니다.");
            location.reload();
        }
    },

    equipUpdate : function(){
        if(confirm("수정하시겠습니까?")){
            var data = {
                eqipmnName : $("#eqipmnName").val(), //장비명
                eqipmnGbnName : $("#eqipmnGbnName").data("kendoDropDownList").text(), //구분명
                eqipmnGbnCmmnCdSn : $("#eqipmnGbnName").data("kendoDropDownList").value(), //구분공통코드sn
                regtrName : $("#regtrName").val(), //등록자명
                regtrSn : $("#empSeq").val(), //등록자 사원번호
                regDe : $("#regDe").val().replaceAll('-',''), //등록일자
                sortSn : $("#sortSn").val(), //정렬순번
                updusrSn : $("#empSeq").val(),
                eqipmnMstSn : equipmentmangePop.global.eqipmnMstSn,
                hourlyUsageFee : equipmentmangePop.uncomma($("#hourlyUsageFee").val())
            }

            if(data.eqipmnGbnCmmnCdSn == null || data.eqipmnGbnCmmnCdSn == ''){
                alert("구분을 선택하세요.")
                return false;
            }else if(data.eqipmnName == null || data.eqipmnName == ''){
                alert("장비명을 입력하세요.")
                return false;
            }else if(data.regtrName == null || data.regtrName == ''){
                alert("등록자를 입력하세요.")
                return false;
            }else if(data.regDe == null || data.regDe == ''){
                alert("등록 일자를 입력하세요.")
                return false;
            }else if(data.sortSn == null || data.sortSn == '') {
                alert("정렬순번을 입력하세요.")
                return false;
            }else if(data.hourlyUsageFee == null || data.hourlyUsageFee == '') {
                alert("시간당 사용대금을 입력하세요.")
                return false;
            }
            console.log(data);

            $.ajax({
                url : '/asset/setEquipmentUpdate',
                data : data,
                dataType: "json",
                type : "get",
                async : false,
            });
            alert("수정 되었습니다.");
            location.reload();
        }
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='eqmnPk']").prop("checked", true);
        }else{
            $("input[name='eqmnPk']").prop("checked", false);
        }
    },

    selectChkDel : function (){
        if($("input[name='eqmnPk']:checked").length == 0){
            alert("장비목록을 선택해주세요.");
            return;
        }else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
            return;
        }

        var eqmnPk = new Array();
        $("input[name='eqmnPk']").each(function(){
            if(this.checked){
                eqmnPk.push(this.value);
            }
        })

        $.ajax({
            url : '/asset/setEquipmentDelete',
            data : {
                eqmnPk : eqmnPk
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

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },



}

