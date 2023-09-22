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
<script type="text/javascript" src="/js/camtic/application/applicationForm3.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-md-12 col-lg-12 dash-left pop_sign_wrap" style="width:930px;padding: 50px;">
    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
    <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
    <input type="hidden" id="recruitAreaInfoSn" name="recruitAreaInfoSn" value="${params.recruitAreaInfoSn}">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">캠틱 온라인 입사지원</h4>
        </div>

        <div class="panel-body">
            <div>
                <h4>자격/면허/어학</h4>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <th style="border-bottom:0; background-color: white">
                            지원분야
                        </th>
                        <td colspan="4">
                            <span id="recruitAreaInfoSnTxt"></span>
                        </td>
                    </tr>
                </table>

                <h5>자격/면허</h5>
                <div>
                    <div class="__btWrap rig __mt10" style="text-align: right">
                        <button type="button" class="__btn3 blue" onclick="applicationForm3.addCertRow()"><span>추가</span></button>
                    </div>

                    <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                        <thead>
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
                                <input type="text" id="certName0" class="certName">
                            </td>
                            <td>
                                <input type="text" id="certClass0" class="certClass">
                            </td>
                            <td>
                                <input type="text" id="certIssuer0" class="certIssuer">
                            </td>
                            <td>
                                <input type="hidden" id="certFileNo0" name="certFileNo0" class="certFileNo">
                                <input type="text" id="certFileName0" class="certFileName">
                                <label for="certFile0" class="certFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                                <input type="file" id="certFile0" name="certFile0" class="certFile" style="display: none" onchange="applicationForm3.getFileName(this)">
                            </td>
                            <td>
                                <button type="button" class="__btn3 red" onclick="applicationForm3.delRow('cert', this)"><span>삭제</span></button>
                            </td>
                        </tr>
                        <tr id="cert0_1" class="cert_1">
                            <th>활용능력</th>
                            <td colspan="6">
                                <textarea id="certContent0" class="certContent"></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h5>외국어</h5>
            <div id="langDiv">
                <div class="__btWrap rig __mt10" style="text-align: right">
                    <button type="button" class="__btn3 blue" onclick="applicationForm3.addLangRow()"><span>추가</span></button>
                </div>
                <table class="table table-bordered mb-0" id="langInfo0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <thead>
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
                            <input type="text" id="langName0" class="langName">
                        </td>
                        <td>
                            <input type="text" id="acquisitionDate0" class="acquisitionDate period">
                        </td>
                        <td>
                            <input type="text" id="acquisitionScore0" class="acquisitionScore">
                        </td>
                        <td>
                            <input type="hidden" id="langFileNo0" name="langFileNo0" class="langFileNo">
                            <input type="text" id="langFileName0" class="langFileName" style="width: 140px">
                            <label for="langFile0" class="langFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                            <input type="file" id="langFile0" name="langFile0" class="langFile" style="display: none" onchange="applicationForm3.getFileName(this)">
                        </td>
                        <td>
                            <button type="button" class="__btn3 red" onclick="applicationForm3.delRow('lang', this)"><span>삭제</span></button>
                        </td>
                    </tr>
                    <tr id="lang0_1" class="lang_1">
                        <th>활용능력</th>
                        <td colspan="6">
                            <textarea id="langContent0" class="langContent"></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h4>
                기타 외국어 능력 입력
                <input type="checkbox" id="otherYn" name="otherYn" onclick="applicationForm3.checkBoxChk(this)">
            </h4>

            <div id="otherDiv" style="display: none">
                <textarea id="otherLang"></textarea>
            </div>

            <div style="text-align: right">
                <button class="__btn1 blue" onclick="applicationForm3.setApplicationTempSave('prev')"><span>이전단계</span></button>
                <button class="__btn1 black" onclick="applicationForm3.setApplicationTempSave('temp')"><span>임시저장</span></button>
                <button class="__btn1 blue" onclick="applicationForm3.setApplicationTempSave('next')"><span>다음단계</span></button>
                <button class="__btn1 gray" onclick="window.close()"><span>취소</span></button>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    applicationForm3.fn_defaultScript();
</script>
</body>
