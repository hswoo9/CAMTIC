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
<script type="text/javascript" src="/js/intra/inside/asset/addAssetPop.js?v=${today}"/></script>

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
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="4">자산 추가</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>자산 구분</th>
                        <td colspan="3">
                            <input type="text" id="select1" style="width: 18%;">
                            <input type="text" id="select2" style="width: 18%;">
                            <input type="text" id="select3" style="width: 18%;">
                            <input type="text" id="select4" style="width: 18%;">
                            <input type="text" id="select5" style="width: 18%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">자산명</th>
                        <td colspan="3"><input type="text" id="assetName" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>등록 일자</th>
                        <td><input type="text" id="startDay" onchange="dateValidationCheck('startDay', this.value)" style="width: 100%;"></td>
                        <th scope="row" class="text-center th-color">구입 금액</th>
                        <td><input type="text" id="purchasePrice" style="width: 100%; text-align: right;" value="원"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>규격</th>
                        <td><input type="text" id="standard" style="width: 100%;">
                        <th scope="row" class="text-center th-color">모델명</th>
                        <td><input type="text" id="name" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>구입 업체</th>
                        <td><input type="text" id="purchaseCompany" style="width: 70%;">
                            <button type="button" id="search" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0;" onclick="">
                                검색
                            </button>
                        </td>
                        <th scope="row" class="text-center th-color">제조사</th>
                        <td><input type="text" id="company" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>자산 상태</th>
                        <td><input type="text" id="addAssetStatus" style="width: 100%;">
                        <th scope="row" class="text-center th-color">생산 국가</th>
                        <td><input type="text" id="nation" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>구입 수량 / 단위</th>
                        <td>
                            <input type="text" id="num" style="width: 20%;"> /
                            <input type="text" id="unit" style="width: 20%;"> EA
                            <input type="text" id="regisType" style="width: 40%;">
                        <th scope="row" class="text-center th-color">바코드 타입</th>
                        <td><input type="text" id="barcodeType" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>자금출처 및 지출계좌</th>
                        <td colspan="3">
                            <input type="text" id="source" style="width: 20%;"> <br>
                            <input type="text" id="business" style="width: 50%;">
                            <button type="button" id="businessSlect" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="addAssetPop.rdTaskPopup();">
                                사업 선택
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>설치 장소</th>
                        <td><input type="text" id="installPlace" style="width: 100%;">
                        <th scope="row" class="text-center th-color">사용자</th>
                        <td><input type="text" id="user" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">용도</th>
                        <td colspan="3"><textarea type="text" id="usage" style="width: 100%;"></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">비고</th>
                        <td colspan="3"><textarea type="text" id="remark" style="width: 100%;"></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">관련 파일</th>
                        <td colspan="3" style="padding:5px;"><input type="file"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">자산 사진</th>
                        <td colspan="3" style="padding:5px;"><input type="file"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st">
                <input type="button" class="k-button k-rounded k-button-solid k-button-solid-info" value="저장" onclick=""/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="취소"  onclick=""/>
            </div>
        </div>
    </div>
</div>


<script>
    addAssetPop.fn_defaultScript();
    overWk.fn_defaultScript();
</script>
</body>
</html>