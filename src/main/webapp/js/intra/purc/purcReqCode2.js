
var djAcG20Code = {};
/**
 * 예산회계단위 조회 
 */
djAcG20Code.getErpDIVList = function(dblClickparamMap, idex, returnFn){
	var data = {};
	data.CO_CD   = abdocuInfo.erp_co_cd;
	//"5000";
	data.BASE_DT = $("#txtGisuDate").val().replace(/-/gi,"");
	data.empSeq = $('#empSeq').val();

	/*ajax 호출할 파라미터*/
	var opt = {
            url : "http://121.186.165.80:8080/Ac/G20/Code/getErpDIVList",
            stateFn:modal_bg,
			type : "post",
            async:true,
            data : data,
            successFn : function(){
            	/*모달창 가로사이즈 및 타이틀*/
            	var dialogParam = {
            			title : "예산사업장 코드",
            			width : "400",
						count : 2
            	};
            	acUtil.util.dialog.open(dialogParam);
                /*모달창 컬럼 지정 및 스타일 지정*/
            	var mainData = acUtil.modalData;
            	var paramMap = {};
            	paramMap.loopData =  mainData.selectList;
            	paramMap.colNames = ["사업장 코드", "사업장 명"];
            	paramMap.colModel = [
            	                       {code : "DIV_CD", text : "DIV_CD", style : {width : "150px"}},
            	                       {code : "", text : "DIV_NM", style : {width : "150px"}}
            	                     ];
            	paramMap.dblClickparamMap = dblClickparamMap;

            	/*모달창 값 선택시(더블클릭) 실행될 함수*/
            	paramMap.trDblClickHandler_UserDefine = function(index){
            		returnFn(dblClickparamMap);
            	};

            	acUtil.util.dialog.setData(paramMap);
            },
    	    error: function (request,status,error) {
    	    	alert("오류가 발생하였습니다. 관리자에게 문의하세요\n" + ("오류 메시지 : {0}").replace("{0}",error)+"\n");
        	}
    }; 
    /*결과 데이터 담을 객체*/
    acUtil.modalData = {};
    acUtil.ajax.call(opt, acUtil.modalData );
};

/**
 * 프로젝트 코드
 * @param dblClickparamMap
 */
djAcG20Code.getErpMgtList =  function(dblClickparamMap, idex, returnFn, tblParam){
	if(!$("#selProjectStat").data("kendoComboBox")){
		var html = '		<!-- 프로젝트 box -->';
		html += '		<div class="top_box" style="overflow:hidden;display:none;height: 60px;" id="pjt_Search" >';
		html += '            <dl class="dl2" style="display: flex; align-items: center;margin-top: revert;">';
		html += '                <dt class="mt2">';
		html += '                    <label class="" for="hiddenSelect" style="padding-left: 10px;">구분</label>';
		html += '				</dt>';
		html += '				<dd style="padding-left: 10px; margin-bottom: 0;">';
		html += '					<select class=" hiddenSelect" style="width:115px" id="selProjectStat">';
		html += '						<option value="1,0" selected="selected">사용</option>';
		html += '						<option value="">전체(미사용포함)</option>';
		html += '						<option value="1">진행</option>';
		html += '						<option value="0">완료</option>';
		html += '					</select>';
		html += '				</dd>';
		html += '				<dt class="mt2" style="padding-left: 25px">연도</dt>';
		html += '				<dd style="padding-left: 10px; margin-bottom: 0;">';
		html += '					<input type="text" id="pjtFromDate" style="width: 80px; ime-mode: active;">';
		html += '					~';
		html += '				</dd>';
		html += '				<dd style="padding-left: 10px; margin-bottom: 0;">';
		html += '					<input type="text" id="pjtToDate" style="width: 80px; ime-mode: active;">';
		html += '				</dd>';
		html += '				<dd style="padding-left: 10px; margin-bottom: 0;">';
		html += '					<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" id="pjt_Search_btn">';
		html += '						<span class="k-button-text">조회</span>';
		html += '					</button>';
		html += '				</dd>';
		html += '            </dl>';
		html += '        </div>';

		$("#dialog-form-standard .pop_con").prepend(html);

		$("#selProjectStat").kendoDropDownList();

		$("#pjtFromDate").kendoDatePicker({
			depth: "decade",
			start: "decade",
			culture : "ko-KR",
			format : "yyyy",
			value : new Date(),
		});

		$("#pjtToDate").kendoDatePicker({
			depth: "decade",
			start: "decade",
			culture : "ko-KR",
			format : "yyyy",
			value : new Date(),
		});

		$("#pjt_Search_btn").on({
			click : function(){
				$("#" + dblClickparamMap[0].id).dblclick();
			}
		});
	}

	tblParam.empSeq = $('#empSeq').val();
	tblParam.erpPjtStatus = $("#selProjectStat").val();
	tblParam.pjtFromDate = $("#pjtFromDate").val() + '0101';;
	tblParam.pjtToDate = $("#pjtToDate").val() + '1231';;

	var opt = {
		url : "http://121.186.165.80:8080/Ac/G20/Code/getErpMgtList",
		stateFn:modal_bg,
		async: false,
		data : tblParam,
		successFn : function(){
			/*모달창 가로사이즈 및 타이틀*/
			var dialogParam = {};
			dialogParam.showDiv = "pjt_Search"
			var paramMap = {};

			dialogParam.title = "사업 코드";
			dialogParam.width = "500";
			dialogParam.count = 2;

			paramMap.colNames = ["사업 코드", "사업 명"];
			paramMap.colWidth = ["30%", "70%"];
			if(erpOption.BgtMngType == "1"){
				dialogParam.title = "부서 코드";
				paramMap.colNames = ["부서 코드", "부서 명"];
			}

			/*모달창 컬럼 지정 및 스타일 지정*/
			var mainData = acUtil.modalData;
			paramMap.loopData =  mainData.selectList;

			paramMap.colModel = [
				{code : "", text : "PJT_CD", style : {width : "150px"}},
				{code : "", text : "PJT_NM", style : {width : "250px"}}
			];

			acUtil.dialogForm = "dialog-form-standard";
			acUtil.util.dialog.open(dialogParam);

			/*trDblClickHandler_UserDefine start*/

			paramMap.trDblClickHandler_UserDefine = function(index, dblClickparamMap){
				/*구매의뢰서 추가*/
				var id = dblClickparamMap[0].id;
				var tr = $('#' + id).closest('tr');
				$('.txtBottom_cd', tr).val('').attr('code','');
				returnFn(acUtil.modalData.selectList[index], dblClickparamMap);
				/*구매의뢰서 추가*/
			};

			/*trDblClickHandler_UserDefine end*/
			paramMap.dblClickparamMap = dblClickparamMap;
			acUtil.util.dialog.setData(paramMap);
		}
	};
	/*결과 데이터 담을 객체*/
	acUtil.modalData = {};
	acUtil.ajax.call(opt, acUtil.modalData );
}

/** 하위사업 TODO. 맵핑 생성 해야함 */
djAcG20Code.getErpAbgtBottomList = function (dblClickparamMap, idex, returnFn, tblParam){

	/*ajax 호출할 파라미터*/
	var opt = {
		url     : _g_contextPath_ + "/Ac/G20/Code/getErpAbgtBottomList.do",
		stateFn : modal_bg,
		async   : true,
		data    : tblParam,
		successFn : function(){
			/*모달창 가로사이즈 및 타이틀*/
			var dialogParam = {
				title : "하위사업 코드",
				width : "700",
				count : 2
			};

			acUtil.dialogForm = "dialog-form-standard";
			acUtil.util.dialog.open(dialogParam);

			/*모달창 컬럼 지정 및 스타일 지정*/
			var mainData = acUtil.modalData;
			var paramMap = {};
			paramMap.loopData =  mainData.selectList;
			paramMap.loopData.sort(function(a,b){
				return a.BOTTOM_NM < b.BOTTOM_NM ? -1 : a.BOTTOM_NM > b.BOTTOM_NM ? 1 : 0;
			});
			paramMap.colNames = ["하위사업 코드", "부서명", "하위사업 명"];
			paramMap.colWidth = ["20%", "30%", "50%"];
			paramMap.colModel = [
				{code : "", text : "BOTTOM_CD", style : {width : "150px"}},
				{code : "", text : "DEPT_NAME", style : {width : "200px"}},
				{code : "", text : "BOTTOM_NM", style : {width : "350px", "text-align" : "left", "text-indent" : "10px"}}
			];

			/*구매의뢰서 추가*/
			/*trDblClickHandler_UserDefine start*/

			paramMap.trDblClickHandler_UserDefine = function(index, dblClickparamMap){
				fnMgtCdSet({PJT_CD : ''}, dblClickparamMap);
			};

			/*trDblClickHandler_UserDefine end*/
			/*구매의뢰서 추가*/

			paramMap.dblClickparamMap = dblClickparamMap;
			acUtil.util.dialog.setData(paramMap);
		}
	};
	/*결과 데이터 담을 객체*/
	acUtil.modalData = {};
	acUtil.ajax.call(opt, acUtil.modalData );

};

/** TODO. 맵핑 생성 해야함  */
djAcG20Code.getErpBudgetList = function (dblClickparamMap, idex, returnFn, tblParam){

	var opt = {
		url : _g_contextPath_ + "/Ac/G20/Code/getErpBudgetList.do",
		stateFn : modal_bg,
		async : true,
		data  : tblParam,
		successFn : function(data){
			/*
             * TODO 상배: 예산단계 레벨에 따른 타이틀 수정 필요
             *
             */
			var dialogParam = {};
			dialogParam.title = "예산정보";
			dialogParam.showDiv = "Budget_Search"
			dialogParam.width = "900";

			/*모달창 컬럼 지정 및 스타일 지정*/
			var mainData = acUtil.modalData;
			var paramMap = {};
			paramMap.loopData =  mainData.selectList;

			// step7YN = 1 , 예산 7단계 사용여부 사용
			if(tblParam.BgtStep7UseYn =="1"){
				console.log(data);

				/* 예산 분류및 예산계정 사용되고 있는 레밸 조회 */
				var colModel = [];
				var levelUse = [null, null, null, null, null, null, null, null, null, null ];
				var bgtUse = [null, null, null, null];
				for(var i=0; i < data.selectList.length ; i++){
					var item = data.selectList[i];
					levelUse[0] = levelUse[0] || item.LEVEL01_NM;
					levelUse[1] = levelUse[1] || item.LEVEL02_NM;
					levelUse[2] = levelUse[2] || item.LEVEL03_NM;
					levelUse[3] = levelUse[3] || item.LEVEL04_NM;
					levelUse[4] = levelUse[4] || item.LEVEL05_NM;
					levelUse[5] = levelUse[5] || item.LEVEL06_NM;
					levelUse[6] = levelUse[6] || item.LEVEL07_NM;
					levelUse[7] = levelUse[7] || item.LEVEL08_NM;
					levelUse[8] = levelUse[8] || item.LEVEL09_NM;
					levelUse[9] = levelUse[9] || item.LEVEL10_NM;

					bgtUse[0] = bgtUse[0] || item.BGT01_CD;
					bgtUse[1] = bgtUse[1] || item.BGT02_CD;
					bgtUse[2] = bgtUse[2] || item.BGT03_CD;
					bgtUse[3] = bgtUse[3] || item.BGT04_CD;
				}

				/* 예산 분류 출력준비 */
				for(var i = 0 ; i < 10; i++){
					if(levelUse[i]){
						if(i != 9){
							colModel.push({
								code : "LEVEL0" + (i + 1) + "_CD"
								, text : "LEVEL0" + (i + 1) + "_NM"
								, style : {'width' : '130px'}
							});
						}else{
							colModel.push({
								code : "LEVEL10_CD"
								, text : "LEVEL10_NM"
								, style : {'width' : '130px'}
							});
						}
					}
				}
				/* 예산계정 출력 준비 */
				var bgtUseCnt = 0;
				for(var i = 0; i < bgtUse.length; i++){
					if(bgtUse[i]){
						bgtUseCnt ++;
						colModel.push({
							code : "BGT0"+(i + 1)+"_CD",
							text : "BGT0"+(i + 1)+"_NM",
							style : {
								width : "130px"
							}
						});
					}
				}
				/* 코드 출력준비 */
				colModel.push({code : "BGT_CD", text : "BGT_CD", style : {width : "130px"}});


				var colNames = [];
				var modelCount = colModel.length - 1 ;
				var erpLevels = ['관', '항', '목', '세'];
				var erpLevelsCnt = 0;
				for(var i = 0 ; i < modelCount ; i++){
					if( ( modelCount - bgtUseCnt ) <= i ){
						colNames.push(data.nameList[i].USER_NM + '('+ erpLevels[erpLevelsCnt++] +')');
					}else{
						colNames.push(data.nameList[i].USER_NM);
					}
				}
				colNames.push("코드");

				dialogParam.count = colModel.length;
				paramMap.colModel = colModel;
				paramMap.colNames = colNames;

				/* 예산 7단계 안내문구 출력 */
				$('#deptEmp_SearchHint').show();

			}
			else{ // step7YN = 0 , 예산 7단계 사용여부 미사용
				dialogParam.count = 5;
				paramMap.colNames = ["관", "항", "목", "세", "코드"];
				paramMap.colModel = [
					{
						code : "BGT01_CD",
						text : "BGT01_NM",
						style : { width : "150px" }
					}, {
						code : "BGT02_CD",
						text : "BGT02_NM",
						style : { width : "150px" }
					}, {
						code : "BGT03_CD",
						text : "BGT03_NM",
						style : { width : "150px" }
					}, {
						code : "BGT04_CD",
						text : "BGT04_NM",
						style : { width : "150px" }
					}, {
						code : "BGT_CD",
						text : "BGT_CD",
						style : { width : "150px" }
					}
				];
			}

			acUtil.dialogForm = "dialog-form-standard";
			acUtil.util.dialog.open(dialogParam);

			/*선택한 예산과목에 대해서 예산이 얼마 남았는지 상세 정보 */
			paramMap.trDblClickHandler_UserDefine = function(index, dblClickparamMap){
				// 선택 리턴
				returnFn(acUtil.modalData.selectList[index], dblClickparamMap);
			};

			paramMap.dblClickparamMap = dblClickparamMap;
			acUtil.util.dialog.setData(paramMap);
		}
	};
	/*결과 데이터 담을 객체*/
	acUtil.modalData = {};
	acUtil.ajax.call(opt, acUtil.modalData );
};