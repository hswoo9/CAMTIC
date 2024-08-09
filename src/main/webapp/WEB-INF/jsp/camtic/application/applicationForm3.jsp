<%--
  Created by IntelliJ IDEA.
  User: deer
  Date: 2023-08-30
  Time: 오후 3:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/camtic/application/applicationForm3.js?v=${today}"></script>
<style>
    .__inp {
        padding-left: 5px;
        display: inline-block;
        width: 100%;
        height: 40px;
        border: 1px solid #ddd;
        font-size: 14px;
    }
</style>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:1000px;padding: 0;">
    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
    <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
    <input type="hidden" id="recruitAreaInfoSn" name="recruitAreaInfoSn" value="${params.recruitAreaInfoSn}">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">입사지원 수정</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="applicationForm3.setApplicationPrev()"><span>이전단계</span></button>
            <button type="button" class="k-button k-button-solid-primary" onclick="applicationForm3.setApplicationTempSave()"><span>수정</span></button>
            <button type="button" class="k-button k-button-solid-info" onclick="applicationForm3.setApplicationNext()"><span>다음단계</span></button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()"><span>닫기</span></button>
        </div>
    </div>
    <div style="padding: 20px">
        <table class="popTable table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
            <colgroup>
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th>
                    지원분야
                </th>
                <td>
                    <span id="recruitAreaInfoSnTxt"></span>
                </td>
            </tr>
            </thead>
        </table>
        <div>
            <div class="__btWrap rig __mt10" style="text-align: right; margin-right: 10px; margin-top: 10px;">
                <button type="button" class="k-button k-button-solid-info" onclick="applicationForm3.addCertRow()"><span>추가</span></button>
            </div>
            <table class="popTable table table-bordered mb-0 mt10 text-center">
                <thead>
                <tr>
                    <th colspan="5" style="font-size: 14px; font-weight: 600; background-color: #00397f96; color: #fff;">
                        자격/면허
                    </th>
                </tr>
                <tr>
                    <th>명칭</th>
                    <th>등급</th>
                    <th>검정기관</th>
                    <th>증빙</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="certTb">
                <tr class="cert" id="cert0">
                    <td>
                        <input type="hidden" id="certBaseId0" name="certBaseId0" class="certBaseId">
                        <input type="text" id="certName0" class="__inp certName">
                    </td>
                    <td>
                        <input type="text" id="certClass0" class="__inp certClass">
                    </td>
                    <td>
                        <input type="text" id="certIssuer0" class="__inp certIssuer">
                    </td>
                    <td>
                        <input type="hidden" id="certFileNo0" name="certFileNo0" class="certFileNo">
                        <input type="text" id="certFileName0" class="certFileName" disabled>
                        <label for="certFile0" class="certFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                        <input type="file" id="certFile0" name="certFile0" class="certFile" style="display: none" onchange="applicationForm3.getFileName(this)">
                    </td>
                    <td>
                        <button type="button" class="k-button k-button-solid-error" onclick="applicationForm3.delRow('cert', this)"><span>삭제</span></button>
                    </td>
                </tr>
                <tr id="cert0_1" class="cert_1">
                    <th style="text-align: center;">
                        활용능력
                    </th>
                    <td colspan="6">
                        <textarea id="certContent0" class="certContent" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div id="langDiv">
            <div class="__btWrap rig __mt10" style="text-align: right;  margin-right: 10px; margin-top: 10px;">
                <button type="button" class="k-button k-button-solid-info" onclick="applicationForm3.addLangRow()"><span>추가</span></button>
            </div>
            <table class="popTable table table-bordered mb-0 mt10 text-center" id="langInfo0">
                <thead>
                <tr>
                    <th colspan="5" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                        외국어
                    </th>
                </tr>
                <tr>
                    <th>명칭</th>
                    <th>취득시기</th>
                    <th>취득점수</th>
                    <th>증빙</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="langTb">
                <tr class="lang" id="lang0">
                    <td>
                        <input type="hidden" id="langBaseId0" name="langBaseId0" class="langBaseId">
                        <input type="text" id="langName0" class="__inp langName">
                    </td>
                    <td>
                        <input type="text" id="acquisitionDate0" class="acquisitionDate period">
                    </td>
                    <td>
                        <input type="text" id="acquisitionScore0" class="__inp acquisitionScore">
                    </td>
                    <td>
                        <input type="hidden" id="langFileNo0" name="langFileNo0" class="langFileNo">
                        <input type="text" id="langFileName0" class="langFileName" style="width: 140px" disabled>
                        <label for="langFile0" class="langFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                        <input type="file" id="langFile0" name="langFile0" class="langFile" style="display: none" onchange="applicationForm3.getFileName(this)">
                    </td>
                    <td>
                        <button type="button" class="k-button k-button-solid-error" onclick="applicationForm3.delRow('lang', this)"><span>삭제</span></button>
                    </td>
                </tr>
                <tr id="lang0_1" class="lang_1">
                    <th style="text-align: center;">활용능력</th>
                    <td colspan="6">
                        <textarea id="langContent0" class="langContent" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div style="margin-bottom: 10px">
            <span style="padding-right: 5px; font-size: 12px">기타 외국어 능력 입력</span>
            <input type="checkbox" id="otherYn" name="otherYn" onclick="applicationForm3.checkBoxChk(this)">
        </div>

        <div id="otherDiv" style="display: none">
            <table class="popTable table table-bordered mb-0 mt10 text-center">
                <tr>
                    <textarea id="otherLang" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                </tr>
            </table>
        </div>
        <!--
            <div style="text-align: right">
                <button class="__btn1 blue" onclick="applicationForm3.setApplicationTempSave('prev')"><span>이전단계</span></button>
                <button class="__btn1 black" onclick="applicationForm3.setApplicationTempSave('temp')"><span>임시저장</span></button>
                <button class="__btn1 blue" onclick="applicationForm3.setApplicationTempSave('next')"><span>다음단계</span></button>
                <button class="__btn1 gray" onclick="window.close()"><span>취소</span></button>
            </div>
            -->
    </div>
</div>
</div><!-- col-md-9 -->
<script>
    applicationForm3.fn_defaultScript();
</script>
</body>
