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
<script type="text/javascript" src="/js/intra/inside/asset/categoriesManagePop.js?v=${today}"/></script>
<body style="height: 100%;">
<div class="card" style="height: 100%;">
    <div class="card-header" style="padding:20px 0;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <input type="hidden" id="categoryType" name="categoryType" value="${params.categoryType}">
                <input type="hidden" id="astUpperCode" name="astUpperCode" value="${params.astUpperCode}">
                <input type="hidden" id="astCodeId" name="astCodeId" value="${params.astCodeId}">
                <input type="hidden" id="mod" name="mod" value="${params.modity}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="">
                        <col width="">
                        <col width="">
                    </colgroup>
                    <tbody id="addCodeTbody">
                    <tr>
                        <th colspan="4" id="titleName">카테고리 추가</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st" style="text-align: right">
                <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick="categoriesManagePop.setCategoryCode()"/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick="window.close();"/>
            </div>
        </div>
    </div>
</div>

<script>
    categoriesManagePop.fn_defaultScript();
</script>
</body>