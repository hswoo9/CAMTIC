<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<link rel="stylesheet" href="/css/intra/kTreeView.css">
<script type="text/javascript" src="/js/intra/system/menu/menuGroupManage.js?v=1"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">메뉴권한부여</h4>
			<div class="title-road" style="text-align: right; margin-bottom: 5px;">시스템관리 &gt; 메뉴관리 > 메뉴권한부여</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>

		<div class="panel-body">
			<table style="width:100%;height:100%;">
				<colgroup>
					<col width="40%">
				</colgroup>
				<tbody>
					<tr style="height: 327px">
						<td>
							<div id="authorityTabStrip">
								<ul>
									<li class="k-state-active">
										권한그룹 목록
									</li>
								</ul>
								<div id="gridForm2" style="height:670px;overflow: auto;border: 1px solid #dedfdf;">
									<div id="mainGrid">
									</div>
								</div>
							</div>
						</td>
						<td>
							<div id="authorityEditorTabStrip">
								<ul>
									<li class="k-state-active">
										사용자목록
									</li>
								</ul>
								<div id="gridForm3" style="height:670px;overflow: auto;border: 1px solid #dedfdf;">
									<div id="subGrid">
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<script>
	menuGM.fn_defaultScript();

	function userDataSet(e){
		menuGM.userMultiplePopClose(e);
	}
</script>