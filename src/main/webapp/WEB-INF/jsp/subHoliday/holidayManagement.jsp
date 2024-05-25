<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayAdmin.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">공휴일관리</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 휴가관리 &gt; 공휴일관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <tbody>
                    <tr>
                        <th class="text-center th-color">적용범위</th>
                        <td>
                            <input type="text" id="s_compSeq" name="s_compSeq" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">사용여부</th>
                        <td>
                            <input type="text" id="s_useYn" name="s_useYn" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">공휴일</th>
                        <td>
                            <input type="text" id="s_title" name="s_title" placeholder="공휴일명" onkeydown="if(window.event.keyCode==13){gridReload()}" style="width: 150px;">
                            <button type="button"
                                    class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                    onclick="gridReload()">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div style="display:flex;">
                    <div class="table-responsive"
                         style="width:50%;border:1px solid #d5d5d5; margin-right:10px;">
                        <div style="padding:16px 10px;">* 공휴일 목록</div>
                        <div id="mainGrid" style="width:97%; margin:0 auto;">

                        </div>
                    </div>
                    <div class="table-responsive" style="width:50%; border:1px solid #d5d5d5; padding-bottom:15px;">
                        <div style="display:flex; justify-content: space-between; margin:11px 10px;">
                            <div class="btn-st">
                                <button type="button" id="updateChk"
                                        class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                        onclick="setHoliday()">
                                    <span class="k-button-text">저장</span>
                                </button>
                                <button type="button" id="delBtn"
                                        class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                        style="display: none" onclick="setHolidayDel()">
                                    <span class="k-button-text">삭제</span>
                                </button>
                            </div>
                        </div>

                        <div class="k-state-active" style="width:97%; margin:10px auto;">
                            <div>
                                <div class="mt-10" style="border:1px solid #d5d5d5">
                                    <table class="manageTable table table-bordered mb-0" style="margin-bottom:0;">
                                        <colgroup>
                                            <col width="25%">
                                            <col width="75%">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th scope="row" class="text-center th-color" style="border-top:none;">
                                                    <span style="color:#ab2525;">*</span>일자
                                                </th>
                                                <td style="border-top:none;">
                                                    <input type="text" id="hDay" name="hDay" style="width: 30%;">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="text-center th-color">
                                                    <span style="color:#ab2525;">*</span>공휴일명
                                                </th>
                                                <td>
                                                    <input type="text" id="title" name="title" style="width: 100%;">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="text-center th-color">
                                                    <span></span>적용범위
                                                </th>
                                                <td>
                                                    <input type="text" id="compSeq" name="compSeq"
                                                           style="width: 100%;">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="text-center th-color">
                                                    <span></span>사용여부
                                                </th>
                                                <td>
                                                    <span id="useYn"></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    //holidayManagement.init();

    // 검색 조건 설정
    $("#s_compSeq").kendoDropDownList({
        autoWidth: true,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            {text: "전체", value: ""},
            {text: "캠틱종합기술원", value: "1000"},
        ],
        index: 0,
    });

    $("#s_useYn").kendoDropDownList({
        autoWidth: true,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            {text: "전체", value: ""},
            {text: "사용", value: "Y"},
            {text: "미사용", value: "N"}
        ],
    });

    // 컴포넌트 초기화
    $("#s_compSeq").data("kendoDropDownList").trigger("change");
    $("#s_title, #s_useYn").kendoTextBox();
    kendoSetting();

    mainGrid()

    /**
     *  공휴일 목록 데이터 조회 DataSource
     *  url : /schedule/getHolidayList
     */
    function mainGrid() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: getContextPath() + '/subHoliday/getHolidayList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function (data, operation) {
                    if ($("#year").val() != null && $("#year").val() != "") {
                        data.year = $("#year").val();
                    } else {
                        data.year = getCurrentYear();
                    }
                    data.s_compSeq = $("#s_compSeq").val();
                    data.s_useYn = $("#s_useYn").val();
                    data.s_title = $("#s_title").val();

                    return data;
                }
            },
            schema: {
                data: function (data) {
                    return data.rs;
                },
                total: function (data) {
                    return data.rs.length;
                },
                error: function (data) {
                    alert("error");
                }
            },
            pageSize: 10,
        });

        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            height: 508,
            scrollable: true,
            pageable: {
                refresh: true,
                pageSizes : [10, 20, 50, "ALL"],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                },
                {
                    name: 'button',
                    template: function (e) {
                        return '<span>조회년도:</span>' +
                            '<input id="year" style="width: 100px;"/>';
                    }
                },
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="setHolidayAdd()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>' +
                            '	<span class="k-button-text">신규</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "공휴일관리 목록.xlsx",
                filterable : true,
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: onDataBound,
            columns: [
                {
                    field: "hday",
                    title: "일자",
                    width: 150
                }, {
                    field: "title",
                    title: "공휴일명",
                    width: 160
                }, {
                    field: "COMP_SEQ_NAME",
                    title: "적용범위",
                    width: 130,
                    template: function (row) {
                        if (row.comp_seq == "1000") {
                            return "캠틱종합기술원";
                        }
                    }
                }, {
                    field: "USEYN",
                    title: "사용여부",
                    width: 80,
                    template: function (row) {
                        if (row.use_yn == "Y") {
                            return "사용"
                        } else if (row.use_yn == "N") {
                            return "미사용"
                        }
                    }
                }]
        }).data("kendoGrid");

        $("#year").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "2023", value: "2023"},
                {text: "2022", value: "2022"},
                {text: "2021", value: "2021"},
                {text: "2020", value: "2020"},
                {text: "2019", value: "2019"},
            ],
            change: function () {
                gridReload();
            }
        });
    }

    /*최신년도*/
    function getCurrentYear() {
        var currentYear = new Date().getFullYear();
        return currentYear.toString();
    }

    function setNewsetHolidayAdd() {
        $("#delBtn").hide();
        $("#updateChk").val("insert");
        $("h_day").data("kendoDropDownList").enable(true);
        $("h_day").data("kendoDropDownList").trigger("change");
    }

    $("#hDay").kendoDatePicker({
        culture: "ko-KR",
        format: "yyyy-MM-dd",
        value: new Date()
    });

    function onDataBound() {
        var grid = this;
        grid.element.off('dbclick');
        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            editing(dataItem);
        });
    }

    function setHolidayAdd() {
        $("#delBtn").hide();
        $("#updateChk").val("insert");
        $("#hDay").data("kendoDatePicker").value(new Date());
        $("#title").val("");
        // useYn 초기화
        var useYnRadioGroup = $("#useYn").getKendoRadioGroup();
        useYnRadioGroup.value("Y");
        useYnRadioGroup.trigger("change");
    }

    function editing(e) {
        $("#updateChk").val("update");
        $("#delBtn").show();
        //$("#hDay").val(e.h_day);
        var hDay = new Date(e.h_day.substring(0, 4), e.h_day.substring(4, 6) - 1, e.h_day.substring(6, 8));
        $("#hDay").data("kendoDatePicker").value(hDay);
        $("#title").val(e.title);
        $("#compSeq").getKendoDropDownList().value(e.comp_seq);
        $("#useYn").getKendoRadioGroup().value(e.use_yn);
    }


    /**
     * 공휴일 등록
     * */

    /** kendo setting */

    function kendoSetting() {
        $("#compSeq").kendoDropDownList({
            autoWidth: true,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "캠틱종합기술원", value: "1000"},
            ],
            index: 0,

        });
        $("#useYn").kendoRadioGroup({
            items: [
                {label: "예", value: "Y"},
                {label: "아니오", value: "N"}
            ],
            layout: "horizontal",
            labelPosition: "after",
            value: "Y",
        });

        $("#title").kendoTextBox();
    }

    function setHoliday() {
        var h_day = $("#hDay").val();
        var title = $("#title").val();
        var comp_seq = $("#compSeq").val();
        var use_yn = $("#useYn").data("kendoRadioGroup").value();

        if (!title) {
            alert("필수 값을 입력하세요.");
            return;
        }

        if (confirm("저장 하시겠습니까?")) {
            $.ajax({
                url: getContextPath() + '/subHoliday/setHoliday',
                data: {
                    h_day: h_day,
                    title: title,
                    comp_seq: comp_seq,
                    use_yn: use_yn,
                    updateChk: $("#updateChk").val(),
                },
                dataType: "json",
                type: "POST",
                success: function () {
                    alert("저장 되었습니다.");
                    gridReload();
                },
                error: function () {
                    alert("저장에 실패하였습니다.");
                }
            });
        }
    }

    function setHolidayDel() {
        var title = $("#title").val();
        var h_day = $("#hDay").val();

        if (!title) {
            alert("삭제할 공휴일을 선택해 주세요.");
            return;
        }
        if (confirm("삭제 하시겠습니까?")) {
            $.ajax({
                url: getContextPath() + '/subHoliday/setHolidayDel',
                data: {
                    h_day: h_day
                },
                dataType: "json",
                type: "POST",
                success: function () {
                    alert("삭제되었습니다.");
                    gridReload();
                    setNewsetHolidayAdd();
                },
            });
        }
    }

    function gridReload() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }
</script>