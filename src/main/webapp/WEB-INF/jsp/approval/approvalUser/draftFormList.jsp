<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/approval/draftFormList.js?${toDate}"/></script>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading"></div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">양식목록</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠도큐먼트 > 전자결재 > 상신/보관함 > 양식목록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <table style="margin-bottom:10px; width: 100%; background-color: white;">
                <tr>
                    <td style="padding: 15px 0px 15px 0px; width: 320px;">
                        <div>
                            <input id="formSearch" name="formSearch" placeholder="양식명" style="width: 281px" onkeypress="if(window.event.keyCode==13){draftFormList.getDraftFormSearch()}"/>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="draftFormList.getDraftFormSearch()">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                        </div>
                    </td>
                    <td rowspan="2" style="padding: 0 25px 0 25px;">
                        <p class="tit_p">· 양식 상세</p>
                        <div style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
                        <div style="height: 707px" id="formDetailDiv">

                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="gridForm" style="width:319px; overflow: auto;border: 1px solid #dedfdf;">
                            <div id="formTreeViewDiv" style="height:739px;">

                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div><!-- panel-body -->
    </div><!-- panel -->
</div><!-- col-md-10 -->

<script type="text/javascript">
    let datas = JSON.parse('${data}');
    draftFormList.fn_DefaultScript(datas);
</script>