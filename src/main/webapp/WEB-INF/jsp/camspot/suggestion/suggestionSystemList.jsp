<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/suggestion/suggestionSystemList.js?v=${today}2'/>"></script>
<style>
	a:hover {
		text-decoration: underline;
	}

    .pagination {
        display: inline-block;
    }

    .pagination a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
    }

    .pagination a.active {
        background-color: #00397f96;
        color: white;
        border-radius: 5px;
    }

    .pagination a:hover:not(.active) {
        background-color: #ddd;
        border-radius: 5px;
    }

    #articleListTb thead tr th{
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
    .ta-center{
        text-align:center;
    }

    .contentLink{
        color: #696C74;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
            <div style="padding-left : 20px; padding-right: 20px;">
                <h3 class="panel-title">제안제도</h3>
                <div class="title-road" style="margin-top: 10px;">캠스팟 > 캠스팟 > 제안제도</div>
                <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            </div>
                <div class="panel-body">
                    <table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;">
                        <colgroup>
                            <col width="8%">
                            <col width="10%">
                            <col width="8%">
                            <col width="12%">
                            <col width="8%">
                            <col width="17%">
                            <col width="8%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th class="text-center th-color">제안부문</th>
                            <td class="category">
                                <input type="text" id="suggestionType" name="suggestionType" style="width: 100%;" />
                            </td>
                            <th class="text-center th-color">진행상태</th>
                            <td class="category">
                                <input type="text" id="status" name="status" style="width: 100%;" />
                            </td>
                            <th class="text-center th-color">제안일</th>
                            <td>
                                <input type="text" id="startDt" style="width: 110px;"> ~
                                <input type="text" id="endDt" style="width: 110px;">
                            </td>
                            <th class="text-center th-color">검색</th>
                            <td>
                                <div>
                                    <input type="text" id="searchColumn" name="searchColumn" style="width: 25%;" />
                                    <input type="text" id="searchContent" style="width: 60%;">
                                    <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="ssl.gridReload()">
                                        <span class="k-icon k-i-search k-button-icon"></span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>


                <div class="table-responsive">
                    <input type="hidden" id="menuNm" name="menuNm" value="${menuNm}">
                    <input type="hidden" id="isAdmin" name="isAdmin" value="${isAdmin}">


                    <table class="searchTable table table-bordered mb-0" id="articleListTb" style="border: 1px solid #dedfdf;" >
                        <colgroup>
                            <col width="5%">
                            <col width="10%">
                            <col>
                            <col width="10%">
                            <col width="10%">
                            <col width="10%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th class="text-center th-color">번호</th>
                            <th class="text-center th-color">제안부문</th>
                            <th class="text-center th-color">제안제목</th>
                            <th class="text-center th-color">제안일자</th>
                            <th class="text-center th-color">제안자</th>
                            <th class="text-center th-color">실시자</th>
                            <th class="text-center th-color">진행상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="btn-st" style="text-align:right;margin:15px 0 0 0;">
                    <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="ssl.writePageMove()" id="writeBtn">
                        <span clas s="k-button-text">글쓰기</span>
                    </button>
                </div>
                </div>
        <div class="pagination" style="position: relative; left: 30%; bottom: 50px; width: 560px;">

        </div>
    </div>
</div> <!-- col-lg-12 -->
<script>
	var isAdmin = "${isAdmin}" == "true" ? true : false;

    ssl.fnDefaultScript();
</script>