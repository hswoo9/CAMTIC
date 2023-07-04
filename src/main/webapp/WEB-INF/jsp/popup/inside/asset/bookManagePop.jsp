<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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
</style>
<script type="text/javascript" src="/js/intra/inside/asset/bookManagePop.js?v=${today}"/></script>

<!DOCTYPE html>
<html>
<body>
<div class="card">
    <div class="card-header" style="padding:20px 0;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="60%">
                        <col width="30%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="3">도서 분류관리</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>대분류</th>
                        <td><input type="text" id="division1" style="width: 100%;"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>중분류</th>
                        <td><input type="text" id="division2" style="width: 100%;"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>소분류</th>
                        <td><input type="text" id="division3" style="width: 100%;"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>분류추가</th>
                        <td>
                            <input type="text" id="addDivision" style="width: 40%;"><br>
                            <input type="text" id="addDivisionVal" style="width: 100%;">
                        </td>
                        <td>
                            <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:100%; height:27px; line-height:0;" onclick="">
                                분류 추가
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st">
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기"  onclick=""/>
            </div>
        </div>
    </div>
</div>


<script>
    bookManagePop.fn_defaultScript();
</script>
</body>
</html>