<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/inside/asset/assetList.js?v=${today}"/></script>

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">자산리스트</h4>
            <div class="title-road">자산관리 &gt; 자산리스트</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>조회기간</span>
                                    <input type="text" id="start_date" style="width: 150px;">
                                    ~
                                    <input type="text" id="end_date" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <span>자산소속</span>
                                    <input type="text" id="drop1" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>자산분류</span>
                                    <input type="text" id="drop2" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>대분류</span>
                                    <input type="text" id="drop3" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>중분류</span>
                                    <input type="text" id="drop4" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>소분류</span>
                                    <input type="text" id="drop5" style="width: 120px;">
                                </div>
                            </div>
                            <div style="display:flex;" class="mt10">
                                <div class="mr10">
                                    <span>자산상태</span>
                                    <input type="text" id="drop6" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>설치장소</span>
                                    <input type="text" id="drop7" style="width: 135px;">
                                </div>
                                <div class="mr10">
                                    <span>등록상태</span>
                                    <input type="text" id="drop8" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>바코드</span>
                                    <input type="text" id="drop9" style="width: 120px; margin-left: 12px; margin-right: 40px;">
                                </div>
                                <div class="mr10">
                                    <input type="text" id="searchType" style="width: 140px; margin-right: 6px;">
                                    <input type="text" id="searchVal" style="width: 140px;">
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="검색" onclick=""/>
                                </div>
                            </div>
                            <div style="display:flex;" class="mt10">
                                <div class="mr10">
                                    <span>목록</span>
                                    <input type="text" id="drop10" style="width: 120px; margin-left:24px; margin-right: 6px;">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="바코드 출력(대)" onclick=""/>
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="바코드 출력(소)" onclick=""/>
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="자산관리카드 인쇄" onclick=""/>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    assetList.init();
</script>