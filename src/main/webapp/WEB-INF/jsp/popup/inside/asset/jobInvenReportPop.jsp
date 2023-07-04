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
<script type="text/javascript" src="/js/intra/inside/asset/jobInvenReportPop.js?v=${today}"/></script>

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
                        <col width="30%">
                        <col width="70%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="2">직무발명 신고</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>발명자 / 저자</th>
                        <td><input type="text" id="author" style="width: 70%;">
                        <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:80px; height:27px; line-height:0;" onclick="">
                            직원 선택
                        </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>지식재산권 종류</th>
                        <td><input type="text" id="type" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>지식재산권 명칭</th>
                        <td><input type="text" id="name" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>주요내용</th>
                        <td><textarea type="text" id="document" style="width: 100%;"></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>작성일</th>
                        <td><input type="text" id="regDate" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">첨부 서류1</th>
                        <td style="padding:5px;"><input type="file"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">첨부 서류2</th>
                        <td style="padding:5px;"><input type="file"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">출원관련 견적서</th>
                        <td style="padding:5px;"><input type="file"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st">
                <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick=""/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick=""/>
            </div>
        </div>
    </div>
</div>


<script>
    jobInvenReportPop.fn_defaultScript();
</script>
</body>
</html>