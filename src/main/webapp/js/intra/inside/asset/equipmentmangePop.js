/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 장비관리 - 장비관리 (관리자) 팝업창
 */
var now = new Date();
var equipmentmangePop = {

    global : {
        eqipmnGbnName : []
    },

    fn_defaultScript: function () {

        /*$("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                {text: "복합소재", value: "복합소재"},
                {text: "드론산업", value: "드론산업"},
                {text: "메이커스페이스", value: "메이커스페이스"}
            ],
            index: 0
        });*/

        $("#use_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#name").kendoTextBox();

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

        $("#regDe").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

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
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name: '',
                    text: '삭제'
                }, {
                    name: 'button',
                    text: '신규'
                    /*template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="equipmentmangePop.dataClear()">'
                            '   <span class="k-button-text">신규</span>' +
                                '</button>';

                    }*/
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "순번",
                    template: "#= record-- #"
                }, {
                    field: "eqipmn_gbn_name",
                    title: "구분"
                }, {
                    field: "eqipmn_name",
                    title: "장비명"
                },{
                    field: "regtr_name",
                    title: "등록자"
                }, {
                    field: "reg_de",
                    title: "등록 일자"
                }
            ]
        }).data("kendoGrid");
    },
    equipSave : function (){

        if(confirm("저장하시겠습니까?")){
            var data = {
                eqipmnName : $("#eqipmnName").val(), //장비명
                eqipmnGbnName : $("#eqipmnGbnName").data("kendoDropDownList").text(), //구분명
                eqipmnGbnCmmnCdSn : $("#eqipmnGbnName").data("kendoDropDownList").value(), //구분공통코드sn
                regtrName : $("#regtrName").val(), //등록자명
                regDe : $("#regDe").val(), //등록일자
            }

            if(data.eqipmnName == null || data.eqipmnName == ''){
                alert("장비명을 입력하세요.")
                return false;
            }else if(data.eqipmnGbnName == null || data.eqipmnGbnName == ''){
                alert("구분을 선택하세요.")
                return false;
            }else if(data.regtrName == null || data.regtrName == ''){
                alert("등록자를 입력하세요.")
                return false;
            }else if(data.regDe == null || data.regDe == ''){
                alert("등록 일자를 입력하세요.")
                return false;
            }
            console.log(data);

            $.ajax({
                url : '/asset/setEquipmentInsert',
                data : data,
                dataType: "json",
                type : "get",
                async : false,
            });
            alert("저장 성공!");
            location.reload();
        }
    }
}

