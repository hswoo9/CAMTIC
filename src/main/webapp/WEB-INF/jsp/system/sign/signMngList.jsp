<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/system/sign/signMngList.js?v=${today}"/></script>
<style>
    .gi_sign .sign .empty_text {
        display: block;
        font-size: 12px;
        color: #dcdcdc;
        padding: 21px 0 0 0;
        line-height: 1.5;
    }
</style>

<input type="hidden" id="pageName" value="bustripList"/>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">직인관리</h4>
            <div class="title-road">시스템관리 > 기타관리 &gt; 직인관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">종류</th>
                        <td>
                            <input type="text" id="kind" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">사용여부</th>
                        <td>
                            <input type="text" id="useYN" style="width: 90%"/>
                        </td>
                        <th class="text-center th-color">관인명</th>
                        <td>
                            <input type="text" id="txtSearch" style="width: 90%;">
                        </td>
                    </tr>
                </table>

                <div style="display:flex;">
                    <div class="table-responsive" style="width:50%;border:1px solid #d5d5d5;">
                        <div style="display:flex; justify-content: space-between; margin:0 10px;">
                            <div class="spanft" style="padding:16px 10px;font-weight: bold;">· 관인 목록</div>
                            <div class="btn-st" style="padding-top: 10px">
                                <button type="button" id="newFormFolderBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="signMngList.dataClear()">
                                    <span class="k-button-text">신규</span>
                                </button>
                            </div>
                        </div>
                        <div id="signInfoGrid" style="width:97%; margin:0 auto;">

                        </div>
                    </div>
                    <div class="table-responsive" style="width:50%;border:1px solid #d5d5d5;">
                        <div style="display:flex; justify-content: space-between; margin:0 10px;">
                            <div class="spanft" style="margin-top: 17px;font-weight: bold;">· 관인 상세</div>
                            <div class="btn-st" style="padding-top: 10px">
                                <button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="signMngList.saveBtn()">
                                    <span class="k-button-text">저장</span>
                                </button>
                                <button type="button" id="delBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="display: none" >
                                    <span class="k-button-text">삭제</span>
                                </button>
                            </div>
                        </div>
                        <div style="padding:10px">
                            <div>
                                <input type="hidden" id="signSeq" name="signSeq" value="">
                                <input type="hidden" id="formFolderId" name="formFolderId">
                                <table class="table table-bordered" style="height: 100%; margin-bottom: 0px">
                                    <colgroup>
                                        <col width="15%"/>
                                        <col width="45%"/>
                                        <col width="15%"/>
                                        <col width="25%"/>
                                    </colgroup>
                                    <tbody>
                                    <tr>
                                        <th class="text-center th-color">
                                            <span class="red-star">*</span>회사
                                        </th>
                                        <td colspan="2">
                                            <input type="hidden" id="formCompSeq" name="formCompSeq" value="1212">
                                            <input type="text" id="formCompName" name="formCompName" value="캠틱종합기술원" disabled>
                                        </td>
                                        <th class="text-center th-color">
                                            <span class="red-star">*</span>관인 이미지
                                        </th>
                                    </tr>
                                    <tr>
                                        <th class="text-center th-color">
                                            <span class="red-star">*</span>관인명
                                        </th>
                                        <td colspan="2">
                                            <input type="text" id="siName" name="siName" style="width: 100%;">
                                        </td>
                                        <td rowspan="4" style="text-align: center">
                                            <div class="gi_sign" style="height:97px; margin: 0 !important;">
                                                <div style="" class="sign">
                                                    <span><img id="preview" style="display: none; max-width: 80px; max-height: 80px"/></span>
                                                    <span id="emptySign" class="empty_text">관인을 등록하세요.<br />(80*80)</span>
                                                </div>
                                            </div>
                                            <div id="fileSign" class="ac mt10">
                                                <label for="file2" class="fileUpload" style="margin:0 0 0 5px; height:auto;">파일첨부</label>
                                                <input type="file" id="file2" style="display: none;" onchange="signMngList.readURL(this);">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="text-center th-color">종류</th>
                                        <td colspan="2">
                                            <span type="text" id="ciKind" name="ciKind" style="width: 100%;"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="text-center th-color">사용여부</th>
                                        <td colspan="2">
                                            <span type="text" id="active" name="active" style="width: 100%;"></span>
                                        </td>
                                    </tr>
                                    <tr style="display: none">
                                        <th class="text-center th-color">
                                            사용범위
                                        </th>
                                        <td colspan="2">
                                            <input type="hidden" id="formIdList" name="formIdList">
                                            <input type="text" id="authSelectedText" name="authSelectedText" style="width: 84%;">
                                            <button type="button" id="searchForm" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="signMngList.formSelectPop();">
                                                <span class="k-button-text">선택</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="text-center th-color">
                                            설명
                                        </th>
                                        <td colspan="2">
                                            <input type="text" id="siMemo" name="siMemo">
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    signMngList.fn_defaultScript();
</script>