var rprList = {
    init(){
        rprList.dataSet();
        rprList.mainGrid();
    },

    dataSet(){
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

        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "등록일자", value: "" },
                { text: "출원일자", value: "1" },
                { text: "존속만료일", value: "2" }
            ],
            index: 0
        });

        $("#drop2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "특허", value: "1" },
                { text: "실용신안", value: "2" },
                { text: "상표권", value: "3" },
                { text: "논문", value: "4" },
                { text: "도서", value: "5" },
                { text: "디자인권", value: "6" },
                { text: "저작권", value: "7" }
            ],
            index: 0
        });

        $("#drop3").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "등록", value: "1" },
                { text: "출원", value: "2" },
                { text: "거절", value: "3" },
                { text: "소멸", value: "4" }
            ],
            index: 0
        });

        $("#drop4").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "유지", value: "1" },
                { text: "소멸예정", value: "2" },
                { text: "소멸", value: "3" },
                { text: "유지여부 확인요망", value: "4" }
            ],
            index: 0
        });

        $("#drop5").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "단독", value: "1" },
                { text: "공동", value: "2" }
            ],
            index: 0
        });

        $("#drop6").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "해당없음", value: "1" },
                { text: "이전완료", value: "2" },
                { text: "이전가능", value: "3" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "명칭", value: "" },
                { text: "발명자", value: "1" },
                { text: "출원번호", value: "2" },
                { text: "등록번호", value: "3" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "inside/getRprReceiptList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.rprClass = 2;
                    data.mod = "view";

                    data.dateType = $("#drop1").val();
                    data.stDt = $("#start_date").val();
                    data.enDt = $("#end_date").val();
                    data.iprClass = $("#drop2").val();
                    data.stateType = $("#drop3").val();
                    data.tainType = $("#drop4").val();
                    data.singleType = $("#drop5").val();
                    data.techType = $("#drop6").val();
                    data.searchType = $("#searchType").val();
                    data.searchVal = $("#searchVal").val();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rprList.mainGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rprList.rprChangePopup();">' +
                            '	<span class="k-button-text">일괄 변경</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="rprList.rprReceiptReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="rprList.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="rprList.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template : "<input type='checkbox' id='rprPk#=INVENTION_INFO_SN#' name='rprPk' value='#=INVENTION_INFO_SN#'/>",
                    width: 50
                }, {
                    field: "ROW_NUM",
                    title: "순번"
                }, {
                    field: "APPLICANT_DT",
                    title: "출원일자"
                }, {
                    field: "REG_DATE",
                    title: "등록일자"
                }, {
                    field: "IPR_NAME",
                    title: "구분"
                }, {
                    field: "STATE_NAME",
                    title: "상태"
                }, {
                    field: "TECH_NAME",
                    title: "기술이전"
                }, {
                    field: "TAIN_NAME",
                    title: "유지여부"
                }, {
                    field: "EXPIRATION_DT",
                    title: "존속만료일"
                }, {
                    field: "TITLE",
                    title: "지식재산권 명칭",
                    width: "10%"
                }, {
                    field: "SHARE_NAME",
                    title: "발명자"
                }, {
                    field: "APPLICANT_NUM",
                    title: "출원번호"
                }, {
                    field: "REG_NUM",
                    title: "등록번호"
                }, {
                    field: "",
                    title: "신고서"
                }, {
                    field: "",
                    title: "출원증"
                }, {
                    field: "",
                    title: "등록증"
                }, {
                    field: "",
                    title: "포상금",
                    template : function(e){
                        if(e.PAYMENTS > 0) {
                            return "지급"
                        }else{
                            return "미지급"
                        }
                    }
                }
            ]
        }).data("kendoGrid");

        //지식재산권 리스트 더블 클릭시 수정 팝업창
        $("#mainGrid").on("dblclick", "tr.k-state-selected", function (e) {
            var selectedItem = $("#mainGrid").data("kendoGrid").dataItem(this);
            console.log(selectedItem);
            console.log(selectedItem.INVENTION_INFO_SN);
            //pk
            rprList.rprReceiptUpdatePop(selectedItem.INVENTION_INFO_SN);
        });

    },

    delBtn : function (){
        if($("input[name='rprPk']:checked").length == 0){
            alert("삭제할 데이터를 선택해주세요.");
            return;
        }else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
            return;
        }

        var rprPk = new Array();
        $("input[name='rprPk']").each(function(){
            if(this.checked){
                rprPk.push(this.value);
            }
        })

        $.ajax({
            url : '/inside/setRprListDelete',
            data : {
                rprPk : rprPk
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

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='rprPk']").prop("checked", true);
        }else{
            $("input[name='rprPk']").prop("checked", false);
        }
    },

    rprChangePopup : function() {
        var url = "/Inside/Pop/rprChangePop.do";
        var name = "rprChangePop";
        var option = "width = 600, height = 300, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    rprReceiptReqPop() {
        const url = "/Inside/pop/rprReceiptReqPop.do";
        const name = "rprReceiptReqPop";
        const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    rprReceiptUpdatePop : function(data){
        const url = "/Inside/pop/rprReceiptUpdatePop.do?pk="+data;
        const name = "rprReceiptUpdatePop";
        const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }
}
