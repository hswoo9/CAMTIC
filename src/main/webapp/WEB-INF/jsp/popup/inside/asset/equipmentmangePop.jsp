<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    .removeDay{
        text-decoration:line-through;
        font-weight:700;
        color:red
    }
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-grid-norecords{
        justify-content: space-around;
    }
    .k-grid tbody tr{
        height: 38px;
    }
    #wptDiv{
        margin: 0 auto;
        width: 100px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
    }
    #wptDiv > label {
        margin : 0
    }
    #timeDiff{
        height: 255px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input#checkAll {
        margin: 0;
    }
    .k-grid tbody, .k-grid tfoot, .k-grid thead {
        text-align: center;
    }
</style>
<script type="text/javascript" src="/js/intra/inside/asset/equipmentmangePop.js?v=${today}"/></script>

<!DOCTYPE html>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">장비관리</h4>
        </div>

        <div class="panel-body">
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>구분</span>
                                    <input type="text" id="mainEqipmnGbnName" style="width: 140px;">
                                </div>
                                <div class="mr20">
                                    <span>장비명</span>
                                    <input type="text" id="mainEqipmnName" style="width: 150px;">
                                </div>
                                <div class="mr20">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="조회" onclick="equipmentmangePop.mainGrid();"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="col-md-6 col-lg-6 dash-left mt10" style="border: 1px solid #d5d5d5;">
                    <div class="mt10"></div>
                    <span style="font-weight: bold;">· 장비목록</span>
                    <div id="mainGrid" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-6 col-lg-6 dash-left mt-10" style="border: 1px solid #d5d5d5; height: 543px;">
                    <div class="mt10"></div>
                    <span style="font-weight: bold;">· 장비등록</span>
                    <button type="button" id="save" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:10%; height:27px; line-height:0; margin-left: 468px;" onclick="equipmentmangePop.equipSave()">
                        저장
                    </button>
                    <table class="table table-bordered mb-0 mt10" id="">
                        <colgroup>
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>구분</th>
                            <td colspan><input type="text" id="eqipmnGbnName" style="width: 130px;">
                            </td>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>장비명</th>
                            <td><input type="text" id="eqipmnName" style="width: 150px;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>등록자</th>
                            <td colspan="3">
                                <input type="text" id="regtrName" style="width: 65%;" disabled="disabled">
                                <!-- emp_seq -->
                                <input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
                                <input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
                                <input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
                                <button type="button" id="search1" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:15%; height:27px; line-height:0;" onclick="regSearch();">
                                검색
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>등록 일자</th>
                            <td colspan="3">
                                <input type="date" id="regDe" style="width: 50%;">
                            </td>
                        </tr>
                        </thead>
                    </table>
                </div><!-- table-responsive -->
            </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    equipmentmangePop.fn_defaultScript();
    equipmentmangePop.mainGrid();
    equipmentmangePop.dataClear();

    function regSearch() {
        window.open("/common/deptListPop.do","조직도","width=750,height=650");
    }
</script>
</body>
</html>