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
<script type="text/javascript" src="/js/intra/inside/asset/divisionManagePop.js?v=${today}"/></script>

<!DOCTYPE html>
<html>
<body>
<div class="card">
    <div class="card-header" style="padding:20px 0;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="astCodeTypeId" name="astCodeTypeId" value="${params.astCodeTypeId}">
                <input type="hidden" id="mod" name="mod" value="${params.modify}">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="4">구분관리 추가</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>소속</th>
                        <td colspan><input type="text" id="astTypeCodeNm" style="width: 100%; margin-right:10px;"></td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>소속 코드</th>
                        <td colspan><input type="text" id="astTypeCode" style="width: 100%; margin-right:10px;"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st" style="text-align: right">
                <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick="divisionManagePop.fn_saveBtn()"/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick="window.close()"/>
            </div>
        </div>
    </div>
</div>


<script>
    divisionManagePop.fn_defaultScript();
</script>
</body>
</html>