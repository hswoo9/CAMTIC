package egovframework.expend.np.user.budget.dao;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.helper.info.CommonInfo;
import egovframework.expend.common.helper.logger.CommonLogger;
import egovframework.expend.common.vo.CommonInterface.commonCode;
import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;
import egovframework.expend.np.user.option.service.BNpUserOptionService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Repository ( "FNpUserBudgetServiceADAO" )
public class FNpUserBudgetServiceADAO extends AbstractDAO {

	/* 변수정의 - Common */
	@Resource ( name = "CommonLogger" )
	private CommonLogger cmLog;
	@Resource ( name = "BNpUserOptionService" )
	private BNpUserOptionService serviceOption; /* Expend Service */
	@Resource ( name = "CommonInfo" )
	private CommonInfo cmInfo;

	/**
	 * 예산 잔액정보 조회
	 * P : {
	 * erpGisu
	 * , abgtCd
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsBudgetBalance (Map<String, Object> params ) throws Exception {
		ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( CommonConvert.CommonGetEmpVO( ).getCompSeq( ) ) );
		return _selectConsBudgetBalance( params, conVo );
	}

	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsBudgetBalance ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		return _selectConsBudgetBalance( params, conVo );
	}

	/**
	 * 예산 잔액정보 조회
	 * P : {
	 * erpGisu
	 * , abgtCd
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO _selectConsBudgetBalance ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String erpTypeCode = params.get( "erpTypeCode" ).toString( );
			if ( erpTypeCode.equals( commonCode.iCUBE ) ) {
				Map<String, Object> consBudget = (Map<String, Object>) selectOne("NpUserBudgetA.selectConsBalanceAmtI", params );
				if ( consBudget == null ) {
					consBudget = new HashMap<String, Object>( );
					consBudget.put( "resErpBudgetSeq", "-1" );
					consBudget.put( "resErpBudgetSeq", "-1" );
					consBudget.put( "consStdAmt", "0" );
					consBudget.put( "consTaxAmt", "0" );
					consBudget.put( "consAmt", "0" );
					consBudget.put( "resStdAmt", "0" );
					consBudget.put( "resTaxAmt", "0" );
					consBudget.put( "resAmt", "0" );
					consBudget.put( "balanceStdAmt", "0" );
					consBudget.put( "balanceTaxAmt", "0" );
					consBudget.put( "balanceAmt", "0" );
				}
				result.setaData( consBudget );
				result.setSuccess( );
			}
			else if ( erpTypeCode.equals( commonCode.ERPiU ) ) {
				Map<String, Object> consBudget = (Map<String, Object>) selectOne("NpUserBudgetA.selectConsBalanceAmtU", params );
				if ( consBudget == null ) {
					consBudget = new HashMap<String, Object>( );
					consBudget.put( "consErpBgacctSeq", "-1" );
					consBudget.put( "resErpBgacctSeq", "-1" );
					consBudget.put( "consStdAmt", "0" );
					consBudget.put( "consTaxAmt", "0" );
					consBudget.put( "consAmt", "0" );
					consBudget.put( "resStdAmt", "0" );
					consBudget.put( "resTaxAmt", "0" );
					consBudget.put( "resAmt", "0" );
					consBudget.put( "balanceStdAmt", "0" );
					consBudget.put( "balanceTaxAmt", "0" );
					consBudget.put( "balanceAmt", "0" );
				}
				result.setaData( consBudget );
				result.setSuccess( );
			}
			else {
				throw new Exception( " ERP TYPE 확인 불가능/ DATA " );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 예산 잔액정보 조회 [예실대비 현황용]
	 * P : {
	 * erpGisu
	 * , abgtCd
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsBudgetBalanceForYesil ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String erpTypeCode = params.get( "erpTypeCode" ).toString( );
			if ( erpTypeCode.equals( commonCode.iCUBE ) ) {
				List<Map<String, Object>> consBudget = (List<Map<String, Object>>) selectList("NpUserBudgetA.selectConsBalanceAmtForYesilI", params );
				if ( consBudget == null ) {
					consBudget = new ArrayList<Map<String, Object>>( );
				}
				result.setAaData( consBudget );
				result.setSuccess( );
			}
			else if ( erpTypeCode.equals( commonCode.ERPiU ) ) {
				result.setFail( "ERP iU는 지원하지 않음." );
			}
			else {
				throw new Exception( " ERP TYPE 확인 불가능/ DATA " );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 결의서 집행금 조회
	 * P : {
	 * erpGisu
	 * , abgtCd
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectResUseAmt ( Map<String, Object> params ) throws Exception {
		ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( CommonConvert.CommonGetEmpVO( ).getCompSeq( ) ) );
		return _selectResUseAmt( params, conVo );
	}

	/**
	 * 결의서 집행금 조회
	 * P : {
	 * erpGisu
	 * , abgtCd
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectResUseAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		return _selectResUseAmt( params, conVo );
	}

	/**
	 * 결의서 집행금 조회
	 * P : {
	 * erpGisu
	 * , abgtCd
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO _selectResUseAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			Map<String, Object> resUse = new HashMap<String, Object>( );
			String erpTypeCode = params.get( "erpTypeCode" ).toString( );
			if ( erpTypeCode.equals( commonCode.iCUBE ) ) {
				resUse = (Map<String, Object>) selectOne("NpUserBudgetA.selectResUseAmtI", params );
				if ( resUse == null ) {
					resUse = new HashMap<String, Object>( );
					resUse.put( "resErpBudgetSeq", "-1" );
					resUse.put( "resBudgetStdAmt", "0" );
					resUse.put( "resBudgetTaxAmt", "0" );
					resUse.put( "resBudgetAmt", "0" );
				}
			}
			else if ( erpTypeCode.equals( commonCode.ERPiU ) ) {
				resUse = (Map<String, Object>) selectOne("NpUserBudgetA.selectResUseAmtU", params );
				// TODO: 부가세 옵션 처리 필요 ( ERPiU 옵션 미구현 )
				if ( resUse == null ) {
					resUse = new HashMap<String, Object>( );
					resUse.put( "resErpBgacctSeq", "-1" );
					resUse.put( "resBudgetStdAmt", "0" );
					resUse.put( "resBudgetTaxAmt", "0" );
					resUse.put( "resBudgetAmt", "0" );
				}
			}
			result.setaData( resUse );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 결의서 집행금 조회 [예실대비 현황용]
	 * P : {
	 * erpGisu
	 * , abgtCd
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectResUseAmtForYesil ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String erpTypeCode = params.get( "erpTypeCode" ).toString( );
			if ( erpTypeCode.equals( commonCode.iCUBE ) ) {
				List<Map<String, Object>> resBudget = (List<Map<String, Object>>) selectList("NpUserBudgetA.selectResUseAmtForYesilI", params );
				if ( resBudget == null ) {
					resBudget = new ArrayList<Map<String, Object>>( );
				}
				result.setAaData( resBudget );
				result.setSuccess( );
			}
			else if ( erpTypeCode.equals( commonCode.ERPiU ) ) {
				result.setFail( "ERP iU는 지원하지 않음." );
			}
			else {
				throw new Exception( " ERP TYPE 확인 불가능/ DATA " );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 예산 금액 정보 가져오기
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsAmt ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setaData( (Map<String, Object>) selectOne("NpUserBudgetA.selectConsAmtInfo", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 결의 예산 금액 정보 가져오기
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectResAmt ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			Map<String, Object> tempResult = (Map<String, Object>) selectOne("NpUserBudgetA.selectResAmtInfo", params );
			result.setaData( tempResult );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * [G20] 품의서 문서내의 예산별 합산금 조회
	 * P : { }
	 * return ResultVO with aData
	 */
	public ResultVO selectConsTryAmt ( Map<String, Object> params ) throws Exception {
		ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( CommonConvert.CommonGetEmpVO( ).getCompSeq( ) ) );
		return _selectConsTryAmt( params, conVo );
	}
	public ResultVO selectConsTryAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		return _selectConsTryAmt( params, conVo );
	}
	@SuppressWarnings ( "unchecked" )
	public ResultVO _selectConsTryAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			if ( CommonConvert.CommonGetStr(conVo.getErpTypeCode( )).equals( commonCode.ERPiU ) ) {
				result.setaData( (Map<String, Object>) selectOne("NpUserBudgetA.selectConsTryAmtForiU", params ) );
			}
			else {
				result.setaData( (Map<String, Object>) selectOne("NpUserBudgetA.selectConsTryAmt", params ) );
			}
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 결의서 문서내의 예산별 합산금 조회
	 * P : { }
	 * return ResultVO with aData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectResTryAmt ( Map<String, Object> params ) throws Exception {
		ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( CommonConvert.CommonGetEmpVO( ).getCompSeq( ) ) );
		return _selectResTryAmt( params, conVo );
	}

	/**
	 * 결의서 문서내의 예산별 합산금 조회
	 * P : { }
	 * return ResultVO with aData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectResTryAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		return _selectResTryAmt( params, conVo );
	}

	/**
	 * 결의서 문서내의 예산별 합산금 조회
	 * P : { }
	 * return ResultVO with aData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO _selectResTryAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			Map<String, Object> resultTemp = null;
			if ( CommonConvert.CommonGetStr(conVo.getErpTypeCode( )).equals( commonCode.ERPiU ) ) {
				resultTemp = (Map<String, Object>) selectOne("NpUserBudgetA.selectResTryAmtForiU", params );
			}
			else {
				resultTemp = (Map<String, Object>) selectOne("NpUserBudgetA.selectResTryAmt", params );
			}
			result.setaData( resultTemp );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 결의서 문서내의 예산별 합산금 조회
	 * P : { }
	 * return ResultVO with aData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConfferBudgetBalanceAmt ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			Map<String, Object> tempResult = (Map<String, Object>) selectOne("NpUserBudgetA.selectConfferBudgetBalance", params );		
			result.setaData( tempResult );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	public ResultVO selectConfferBudgetInfo(Map<String, Object> params) {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData((List<Map<String, Object>>) selectList("NpUserBudgetA.selectConfferBudgetInfo", params ));		
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	public ResultVO updateConfferBudgetInfo(Map<String, Object> params) {
		ResultVO result = new ResultVO( );
		try {
			update ( "NpUserBudgetA.updateConfferBudgetInfo", params );		
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
}