package egovframework.expend.np.user.budget.service.impl;

import egovframework.devjitsu.common.utiles.MapUtil;
import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;
import egovframework.expend.np.user.budget.dao.FNpUserBudgetServiceADAO;
import egovframework.expend.np.user.budget.service.FNpUserBudgetService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;


@Service ( "FNpUserBudgetServiceA" )
public class FNpUserBudgetServiceAImpl implements FNpUserBudgetService {

	/* 변수정의 */
	/* 변수정의 - DAO */
	@Resource ( name = "FNpUserBudgetServiceADAO" )
	private FNpUserBudgetServiceADAO daoA;

	@Override
	public ResultVO selectERPBudgetBalance (Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		throw new Exception( "예산 조회 기능으로 ERP전용 기능입니다." );
	}

	/**
	 * 품의서 잔액 조회
	 */
	@Override
	public ResultVO selectConsBudgetBalance ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = daoA.selectConsBudgetBalance( params );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의서 잔액 조회
	 */
	@Override
	public ResultVO selectConsBudgetBalance ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = daoA.selectConsBudgetBalance( params, conVo );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 예산별 미전송 결의액 조회
	 */
	@Override
	public ResultVO selectResUseAmt ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = daoA.selectResUseAmt( params );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 예산별 미전송 결의액 조회
	 */
	@Override
	public ResultVO selectResUseAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = daoA.selectResUseAmt( params, conVo );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의서 잔액 조회 [예실대비 현황]
	 */
	@Override
	public ResultVO selectConsBudgetBalanceForYesil ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = daoA.selectConsBudgetBalanceForYesil( params );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 예산별 미전송 결의액 조회 [예실대비 현황]
	 */
	@Override
	public ResultVO selectResUseAmtForYesil ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = daoA.selectResUseAmtForYesil( params );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의서 품의액 조회
	 */
	@Override
	public ResultVO selectConsAmt ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y", "consSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = daoA.selectConsAmt( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의서 결의액 조회
	 */
	@Override
	public ResultVO selectResAmt ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y", "resSeq", "N" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = daoA.selectResAmt( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	@Override
	public ResultVO selectTryAmt ( Map<String, Object> params ) throws Exception {
		
		ResultVO result = new ResultVO( );
		try {
			if ( params.get( "consDocSeq" ) != null ) {
				result = daoA.selectConsTryAmt( params );
			}
			else if ( params.get( "resDocSeq" ) != null ) {
				result = daoA.selectResTryAmt( params );
			}
			else {
				result.setFail( "문서키(doc seq)가 누락되었음." );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "예산 사용금 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	@Override
	public ResultVO selectTryAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			if ( ( params.get( "consDocSeq" ) != null ) && ( !params.get( "consDocSeq" ).equals( "-1" ) )  ) {
				result = daoA.selectConsTryAmt( params, conVo );
			}
			else if ( ( params.get( "resDocSeq" ) != null ) && ( !params.get( "resDocSeq" ).equals( "-1" ) ) ) {
				result = daoA.selectResTryAmt( params, conVo );
			}
			else {
				Map _tryAmt = new HashMap<String,Object>( );
				_tryAmt.put( "tryAmt", "0" );
				result.setaData( _tryAmt );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "예산 사용금 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	@Override
	public ResultVO selectConfferBudgetBalanceAmt ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "confferDocSeq", "Y", "confferSeq", "Y", "confferBudgetSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = daoA.selectConfferBudgetBalanceAmt( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	@Override
	public ResultVO selectConfferBudgetInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = daoA.selectConfferBudgetInfo( params );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}
	
	@Override
	public ResultVO updateConfferBudgetInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = daoA.updateConfferBudgetInfo( params );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 업데이트에 실패하였습니다.", ex );
		}
		return result;
	}
	

}
