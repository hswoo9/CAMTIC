<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>
<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">이미지관리</h4>
            <div class="title-road">캠스팟 > 이미지관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <form id="userReqPopImage" style="padding: 20px 30px;">
                <div style="text-align:right; font-weight:600;">[직원정보] ${params.EMP_NAME_KR}</div>
                <table class="table table-bordered mb-0" id="userReqPopImageTable">
                    <colgroup>
                        <col width="9%">
                        <col width="15%">
                        <col width="9%">
                        <col width="15%">
                        <col width="9%">
                        <col width="15%">
                    </colgroup>
                    <thead>
                    <tr style="height:250px;border-top: 1px solid #00000014;">
                        <th>결재사인</th>
                        <td>
                            <span>등록된 결재사진이 없습니다.</span>
                        </td>
                        <th>증명사진</th>
                        <td>
                            <div class="filebox">
                                <input type="hidden" id="fileNo" name="fileNo" value="${data.FILE_NO}">
                                <div class="card-picture" style="padding-top: 0 !important; margin:0px; overflow: hidden; position: relative;">
                                    <c:choose>
                                        <c:when test="${data.FILE_PATH ne null}">
                                            <input type="hidden" id="filePath" name="filePath" value="${data.FILE_PATH}">
                                            <input type="hidden" id="fileName" name="fileName" value="${data.FILE_UUID}">
                                            <img id="photoView" src="${data.FILE_PATH}${data.FILE_UUID}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                        </c:when>
                                        <c:otherwise>
                                            <span>등록된 증명사진이 없습니다.</span>
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                            </div>

                        </td>
                        <th>개인사진</th>
                        <td>
                            <span>등록된 개인사진이 없습니다.</span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">결재사인</th>
                        <td colspan="4">
                            <div class="filebox">
                                <label for="signPhotoFile" class="k-button k-button-clear-info" style="vertical-align: bottom;margin:0; margin-top:13px;">파일 선택</label>
                                <span>결재사인 이미지는 150*150 크기입니다.</span>
                                <input type="file" id="signPhotoFile">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">증명사진</th>
                        <td colspan="4">
                            <div class="filebox"> <%--style.css 파일 필드 숨기기--%>
                                <label for="idPhotoFile" class="k-button k-button-clear-info" style="vertical-align: bottom;margin:0; margin-top:13px;">파일 선택</label>
                                <span>증명사진 이미지는 150*150 크기입니다.</span>
                                <input type="file" id="idPhotoFile" name="idPhotoFile" onchange="viewPhoto(this)">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">개인사진</th>
                        <td colspan="4">
                            <div class="filebox">
                                <input type="file">
                                <label for="myPhotoFile" class="k-button k-button-clear-info" style="vertical-align: bottom;margin:0; margin-top:13px;">파일 선택</label>
                                <span>개인사진 이미지는 110*110 크기입니다.</span>
                                <input type="file" id="myPhotoFile">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">주의사항</th>
                        <td colspan="4">
                            <span>사진을 변경한 후, 브라우저의 캐시 때문에 이미지가 변경되어 보이지 않을 수 있습니다.</span><br>
                            <span>사진을 변경한 후, 브라우저의 새로고침 버튼을 눌러보시기 바랍니다.</span>
                        </td>
                    </tr>
                    </thead>
                </table>
            </form>
        <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
        </div>
    </div>
</div>
<script>
    userReqPop.defaultScript();
</script>