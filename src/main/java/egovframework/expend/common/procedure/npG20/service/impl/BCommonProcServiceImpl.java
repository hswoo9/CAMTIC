package egovframework.expend.common.procedure.npG20.service.impl;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.helper.info.CommonInfo;
import egovframework.expend.common.procedure.npG20.dao.BCommonProcG20DAO;
import egovframework.expend.common.procedure.npG20.service.BCommonProcService;
import egovframework.expend.common.vo.CommonInterface.commonCode;
import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;
import egovframework.expend.np.user.code.dao.FNpUserCodeServiceADAO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("BCommonProcService")
public class BCommonProcServiceImpl implements BCommonProcService {

	/* 변수정의 */
	/* 변수정의 - Service */
	@Resource(name = "CommonInfo")
	private CommonInfo cmInfo;
	/* 변수정의 - DAO */
	@Resource(name = "BCommonProcG20DAO")
	private BCommonProcG20DAO dao;

	@Resource(name = "FNpUserCodeServiceADAO")
	private FNpUserCodeServiceADAO daoA;

    @Value("${BizboxA.msSql.DriverClassName}")
    private String MSSQL_DRIVER_CLASS_NAME;

    @Value("${BizboxA.msSql.Url}")
    private String MSSQL_URL;

    @Value("${BizboxA.msSql.UserName}")
    private String MSSQL_ID;

    @Value("${BizboxA.msSql.Password}")
    private String MSSQL_PW;

	/* 
	 *	[G20] 프로시저 호출 
	 * */
	@Override
	public ResultVO getProcResult(Map<String, Object> params) throws Exception {
		ConnectionVO conVo = cmInfo.CommonGetConnectionInfo(CommonConvert.CommonGetStr(CommonConvert.CommonGetEmpVO().getCompSeq()));

        conVo.setUrl(MSSQL_URL);
        conVo.setUserId(MSSQL_ID);
        conVo.setPassword(MSSQL_PW);

		return _getProcResult(params, conVo);
		
	}

	/* 
	 *	[G20] 프로시저 호출 
	 * */
	@Override
	public ResultVO getProcResult ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		return _getProcResult(params, conVo);
	}
	
	/* iCUBE 거래처 등록 및 반환 */
	public Map<String, Object> setProcTrade(Map<String, Object> params) throws Exception {
		/* 변수정의 */
		Map<String, Object> result = new HashMap<String, Object>();
		LoginVO loginVo = CommonConvert.CommonGetEmpVO();
		ConnectionVO conVo = cmInfo.CommonGetConnectionInfo(CommonConvert.CommonGetStr(CommonConvert.CommonGetEmpVO().getCompSeq()));

		/* 파라미터 정의 */
		params.put("erpEmpSeq", loginVo.getErpEmpCd());
		params.put("erpCompSeq", conVo.getErpCompSeq());
		
		/* 거래처 등록 및 조회 */
		result = dao.selectTrade(params, conVo);

		return result;
	}

	public ResultVO _getProcResult ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
 		ResultVO result = new ResultVO();
		try {
			LoginVO loginVo = CommonConvert.CommonGetEmpVO();
			String codeType = "";
			if (params.get("procType") != null) {
				codeType = params.get("procType").toString().toUpperCase();
			} else {
				throw new Exception("호출 프로시저 타입을 알 수 없습니다.");
			}
			
			/* 2018. 05. 15 - 김상겸 */
			/* 사원검색의 경우 사원번호를 파라미터로 전달 시 사원선택의 범위가 제한되므로, codeType이 emp 인 경우는 별도 맵핑하지 않고 전달된 값을 그대로 사용한다. */
			if(codeType.equals("emp".toUpperCase())) {
				if(!params.containsKey("erpEmpSeq")) {
					/* 사원검색 필수 파라미터로, 값이 없는 경우 공백으로 생성한다. */
					params.put("erpEmpSeq", "");
				}
				params.put("erpCompSeq", conVo.getErpCompSeq());
			} else {
				params.put("erpEmpSeq", loginVo.getErpEmpCd());
				params.put("erpCompSeq", conVo.getErpCompSeq());
			}
			
			if (codeType.equals("gisuCloseCheck".toUpperCase())) {
				/* 기수 마감 정보 */
				result = dao.selectGisuCloseCheck(params, conVo);
				return result;
			} else if (codeType.equals("syscfg".toUpperCase())) {
				/* iCUBE 환경설정 */
				result = dao.selectSyscFg(params, conVo);
				return result;
			} else if (codeType.equals("emp".toUpperCase())) {
				/* 사원 */
				result = dao.selectEmpList(params, conVo);
				return result;
			} else if (codeType.equals("gisu".toUpperCase())) {
				/* 기수 */
				result = dao.selectGisuList(params, conVo);
				return result;
			} else if (codeType.equals("bank".toUpperCase())) {
				/* 금융기관 */
				result = dao.selectBankList(params, conVo);
				return result;
			} else if (codeType.equals("absdocuInfo".toUpperCase())) {
				result = dao.selectAbsdocuInfo(params, conVo);
				return result;
			} else if (codeType.equals("bottom".toUpperCase())) {
				result = dao.selectBottomList(params, conVo);
				return result;
			} else if (codeType.equals("gisuInfo".toUpperCase())) {
				result = dao.selectGisuInfo(params, conVo);
				return result;
			} else if (codeType.equals("gisuForDate".toUpperCase())) {
				result = dao.selectGisuForDate(params, conVo);
				return result;
			} else if (codeType.equals("btr".toUpperCase())) {
				result = dao.selectBtrList(params, conVo);
				return result;
			} else if (codeType.equals("div".toUpperCase())) {
				result = dao.selectDivList(params, conVo);
				return result;
			} else if (codeType.equals("tr".toUpperCase()) || codeType.equals("btrtr".toUpperCase())) {
				result = dao.selectTrList(params, conVo);
				return result;
			} else if (codeType.equals("commonGisuInfo".toUpperCase())) {
				result = dao.selectCommonGisuInfo(params, conVo);
				return result;
			} else if (codeType.equals("project".toUpperCase())) {
				/* 프로젝트 */
				result = dao.selectProjectList(params, conVo);
				return result;
			} else if (codeType.equals("dept".toUpperCase())) {
				/* 부서 */
				result = dao.selectDeptList(params, conVo);
				return result;
			} else if (codeType.equals("budget".toUpperCase())) {
				result = dao.selectBudgetInfo(params, conVo);
				return result;
			} else if (codeType.equals("cardSungin".toUpperCase())) {
				/* 카드 승인 내역 */
				result = dao.selectCardSunginList(params, conVo);
				return result;
			} else if (codeType.equals("erphpmeticlist".toUpperCase())) {
				/* 기타소득자 */
				result = dao.selectErpHpmeticList(params, conVo);
				return result;
			} else if (codeType.equals("erphincomeiclist".toUpperCase())) {
				/* 사업소득자 */
				result = dao.selectErpHincomeicList(params, conVo);
				return result;
			} else if (codeType.equals("budgetList".toUpperCase())) {
				result = dao.selectBgtList(params, conVo);
				return result;
			} else if (codeType.equals("budgetName".toUpperCase())) {
				result = dao.selectBgtlabelList(params, conVo);
				return result;
			} else if (codeType.equals("income".toUpperCase())) {
				result = dao.selectIncomeList(params, conVo);
				return result;
			} else if (codeType.equals("card".toUpperCase())) {
				/* 카드 */
				params.put("compSeq", loginVo.getCompSeq());
				params.put("userSe", loginVo.getUserSe());
				params.put("empSeq", loginVo.getUniqId());
				params.put("deptSeq", loginVo.getOrgnztId( ));
				result = daoA.NpSelectCardInfoList(params);
				return result;
			} else if (codeType.equals("ctr".toUpperCase())) {
				/* 카드 거래처 */
				result = dao.selectCtrList(params, conVo);
				return result;
			} else if (codeType.equals( "yesil".toUpperCase( ) )){
				result = dao.selectYesil( params, conVo );
				return result;
			} else if (codeType.equals( "erpResAmt".toUpperCase( ) )){
				result = dao.selectERPResList( params, conVo );
				return result;
			}
			throw new Exception("알 수 없는 프로시저 타입 : '" + codeType + "'");
		} catch (Exception ex) {
            ex.printStackTrace();
			result.setFail("프로시저 조회 실패", ex);
		}
		return result;
	}

	@Override
	public ResultVO getERPResListInfoSet ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		params.put("procType", "erpResAmt");
		result = this._getProcResult(params, conVo);
		
		List<Map<String, Object>> aaData = new ArrayList<>( );
		if(result.getResultCode( ).equals( commonCode.success )){
			String erpKeyFilter = "";
			String erpCompSeq = "";
			for(Map<String, Object> item : result.getAaData( )){
				Map<String, Object> aData = new HashMap<String, Object>();
				aData.put( "erpCompSeq", nullToString(item.get( "CO_CD" ) ));
				aData.put( "erpKey", nullToString(item.get( "GISU_DT" ) + "-" + nullToString(item.get( "GISU_SQ" ) ) ));
				aData.put( "erpMgtName", nullToString(item.get( "MGT_NM" ) ));
				aData.put( "note", nullToString(item.get( "RMK_DC" ) ));			
				aData.put( "amt", nullToString(item.get( "UNIT_AM" ) ));				
				aData.put( "slipNum", nullToString(item.get( "ISU_DT" )) + "-" + nullToString(item.get( "ISU_SQ" ) ) );
				aData.put( "erpBudgetSeq", nullToString(item.get( "BGT_CD" ) ));
				aData.put( "erpBudgetName", nullToString(item.get( "BGT_NM" ) ));
				aaData.add( aData );
				
				erpKeyFilter += ", '" + nullToString(item.get( "GISU_DT" ) + "-" + nullToString(item.get( "GISU_SQ" ) ) ) + "'";
				erpCompSeq = nullToString(item.get( "CO_CD" ) );
			}
			erpKeyFilter = "(" + ( erpKeyFilter.length( ) == 0 ? "" : erpKeyFilter.substring( 1 )) + ")";
			Map<String, Object> aData = new HashMap<String, Object>();
			aData.put( "erpCompSeq", erpCompSeq );
			aData.put( "erpKeyFilter", erpKeyFilter );
			
			result.setAaData( aaData );
			result.setaData( aData );
		}else{
			result.setFail( "예산별 결의데이터 조회 실패" );
		}
		return result;
	}
	
	private String nullToString(Object o){
		if(o == null){
			return "";
		}else{
			return o.toString( );
		}
	}
}