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
<script type="text/javascript" src="/js/intra/inside/bustrip/meetingRoomManagePop.js?v=${today}"/></script>

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
                        <col width="20%">
                        <col width="80%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="2">회의실 등록</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용 여부</th>
                        <td><input type="text" id="useYN" style="width: 50%; margin-right:10px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>회의실 명</th>
                        <td><input type="text" id="meetingRoomName" style="width: 50%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>장소</th>
                        <td><input type="text" id="space" style="width: 50%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>수용 인원</th>
                        <td><input type="text" id="Num" style="width: 50%;">명</td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>대관 여부</th>
                        <td><input type="text" id="coronationYN" style="width: 50%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>대관료</th>
                        <td><input type="text" id="rentalFee" style="width: 50%; text-align: right;" value="원"> (VAT 포함 금액)</td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">특이사항</th>
                        <td><textarea type="text" id="significant" style="width: 100%;"></textarea></td>
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
    meetingRoomManagePop.fn_defaultScript();
</script>
</body>
</html>