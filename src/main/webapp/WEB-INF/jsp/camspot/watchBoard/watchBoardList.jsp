<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/watchBoard/watchBoardList.js?v=${today}2'/>"></script>
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

    #listUl{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        list-style: none;
    }

    #listUl li {
        margin-bottom: 30px;
        width: calc(25% - 50px);
    }

    .board_img {
        height: 290px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    li img {
        width: 100%;
    }

    #listUl li:nth-of-type(4n-3) {
        margin-right: 66px;
    }

    #listUl li:nth-of-type(4n-2) {
        margin-right: 67px;
    }

    #listUl li:nth-child(4n-1) {
        margin-right: 66px;
    }

    .board_tit {
        padding-top: 4px;
        background-color: #636363;
        height: 26px;
        color: white;
        text-align: center;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h3 class="panel-title">함께보아요</h3>
            <div class="title-road" style="margin-top: 10px;">캠스팟 > 캠스팟 > 함께보아요</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div class="table-responsive">
                <input type="hidden" id="menuNm" name="menuNm" value="${menuNm}">
                <input type="hidden" id="isAdmin" name="isAdmin" value="${isAdmin}">

                <ul id="listUl" style="border: 1px solid lightgray;padding:0;margin:0">

                </ul>
            </div>
            <div class="btn-st" style="text-align:right;margin:15px 0 0 0;">
                <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="wbl.writePageMove()" id="writeBtn">
                    <span class="k-button-text">글쓰기</span>
                </button>
            </div>
        </div>
        <div class="pagination" style="position: relative; left: 30%; bottom: 50px; width: 560px;">

        </div>
    </div>
</div> <!-- col-lg-12 -->
<script>
	var isAdmin = "${isAdmin}" == "true" ? true : false;

    wbl.fnDefaultScript(JSON.parse('${queryParams}'));
</script>