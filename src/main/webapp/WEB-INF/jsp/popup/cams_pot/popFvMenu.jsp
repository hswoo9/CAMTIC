<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
    .dash-left .table > tbody > tr > td{
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;
    }

    .percentInput {
        text-align: right;
    }

    label{
        margin-left: 3px;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">즐겨찾기</span>
            </h3>
            <div class="btn-st popButton">
                <%--<button type="button" class="k-button k-button-solid-info" onclick="menuReset();">초기화</button>--%>
                <%--<button type="button" class="k-button k-button-solid-info" onclick="insertFavoriteMenu();">저장</button>--%>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="closeAndRefresh();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <div id="favoriteContent">
                <input type="text" id="menuSearchToobar" class="form-control" style="height:auto; margin-bottom:15px; " placeholder="메뉴를 검색하세요" onkeypress="getSelectMenu();">
                <table class="searchTable table table-bordered mb-0 mt10">
                    <colgroup>
                        <col width="100%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>메뉴명</th>
                    </tr>
                    </thead>

                    <tbody id="favoriteContentList">
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

    $(function(){
        getSelectMenu();
    });

    function getSelectMenu() {
        $.ajax({
            url: "/main/getSearchMenu",
            type: 'GET',
            data: {
                empSeq : $("#empSeq").val(),
                menuName : $("#menuSearchToobar").val()
            },
            success: function (data) {
                drawTable(data.ds);
            },
        });
    }
    function drawTable(data) {
        $("#favoriteContentList").html('');

        let html = "";

        data.forEach((item, index) => {
            let imgId = 'fvImg_' + item.MENU_ID;
            let menuId = item.FV_MENU_ID == null ? item.MENU_ID : item.FV_MENU_ID;
            let imgSrc = item.FV_MENU_ID ? "/images/ico/ico_book01_on.png" : "/images/ico/ico_book01.png";
            let imgClass = item.FV_MENU_ID ? "favorite" : "" ;

            html += '<tr>';
            html += '   <td style="cursor:pointer;">';
            html += '       <a href="javascript:void(0);" onclick="verificationFvMenu(' + menuId + ', \'' + imgId + '\')">';
            html += '           <img id="' + imgId + '" src="' + imgSrc + '" class="'+imgClass+'" >';
            html += '       </a>' + item.MENU_NAME_PATH;
            html += '   </td>';
            html += '</tr>';
        });

        $("#favoriteContentList").append(html);
    }

    function verificationFvMenu(menuID, imgId) {

        var isFavorite = $("#" + imgId).hasClass("favorite");

        if (isFavorite) {
            $.ajax({
                url : "/main/setDelFvMenu",
                type : "GET",
                data : {
                    empSeq : $("#empSeq").val(),
                    menuID : imgId.split("_")[1]
                },
                success : function (data){
                    $("#" + imgId).attr("src", "/images/ico/ico_book01.png").removeClass("favorite");
                },
            });
        } else {
            $.ajax({
                url : "/main/setFavoriteMenuInsert",
                type : "GET",
                data : {
                    empSeq : $("#empSeq").val(),
                    menuID : imgId.split("_")[1]
                },
                success : function (data){
                    /*if(data.rs.status == 500){
                        alert("최대 9개까지만 선택 가능합니다.");
                        return;
                    }else if(data.rs.status ==200){*/
                        $("#" + imgId).attr("src", "/images/ico/ico_book01_on.png").addClass("favorite");
                    // }
                },
            });
        }
    }

   /* function insertFavoriteMenu() {
        var menuIds = '';
        $("img.favorite").each(function () {
            var menuId = $(this).attr("id").replace("fvImg_", "");
            if (menuIds !== '') {
                menuIds += ',';
            }
            menuIds += menuId;
        });

        if (menuIds === '') {
            alert("메뉴를 선택해주세요.");
            return;
        }

        if (confirm("저장 하시겠습니까?")) {
            $.ajax({
                url: "/main/fvMenuInsert",
                type: 'POST',
                data: {
                    menuID: menuIds
                },
                success: function () {
                    alert("저장이 완료되었습니다.");
                    window.close();
                },
            });
        }
    }*/

    function menuReset() {
        $("img.favorite").attr("src", "/images/ico/ico_book01.png").removeClass("favorite");
    }

    function closeAndRefresh() {
        window.opener.location.reload();
        window.close();
        window.opener.getFvList();
    }
</script>
</body>
</html>