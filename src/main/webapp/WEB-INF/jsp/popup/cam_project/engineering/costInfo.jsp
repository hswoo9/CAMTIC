<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/costInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div style="padding: 10px">
    <div id="resultBtnDiv">
        <%--<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="resultInfo.fn_save()">저장</button>--%>
    </div>
    <div class="table-responsive">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>프로젝트 코드
                </th>
                <td>
                    <input type="text" id="rsPjtSn" disabled value="${hashMap.PJT_CD}" style="width: 90%; text-align: left" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>시제품 여부
                </th>
                <td>
                    <input type="text" id="rsPrototype" style="width: 90%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>작업명
                </th>
                <td colspan="3">
                    <input type="text" id="rsPjtNm" disabled value="${hashMap.PJT_NM}" style="width: 90%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>실적률
                </th>
                <td colspan="3">
                    <table>
                        <tbody id="psTable">

                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>지원내용
                </th>
                <td colspan="3">
                    <textarea type="text" id="rsSupCont" style="width: 100%;"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>특이사항
                </th>
                <td colspan="3">
                    <textarea type="text" id="rsIss" style="width: 100%;"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>비고
                </th>
                <td colspan="3">
                    <textarea type="text" id="rsEtc" style="width: 100%;"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>기간
                </th>
                <td colspan="3">
                    <input type="text" id="rsStrDt" style="width: 15%;"> ~
                    <input type="text" id="rsEndDt" style="width: 15%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>설계이미지
                </th>
                <td>
                    <label for="designImg" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="designImg" name="designImg" onchange="resultInfo.fileChange(this)" style="display: none">
                    <span id="designImgName"></span>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>제작이미지
                </th>
                <td>
                    <label for="prodImg" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="prodImg" name="prodImg" onchange="resultInfo.fileChange(this)" style="display: none">
                    <span id="prodImgName"></span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>활용장비
                </th>
                <td colspan="3">
                    <input type="text" id="rsActEquip" style="width: 90%;">
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    resultInfo.fn_defaultScript();
</script>
</body>
</html>