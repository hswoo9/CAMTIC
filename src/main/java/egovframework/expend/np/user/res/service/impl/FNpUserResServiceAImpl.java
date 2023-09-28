package egovframework.expend.np.user.res.service.impl;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.devjitsu.common.utiles.MapUtil;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.helper.info.CommonInfo;
import egovframework.expend.common.procedure.npG20.dao.BCommonProcG20DAO;
import egovframework.expend.common.vo.CommonInterface.commonCode;
import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;
import egovframework.expend.np.user.budget.service.BNpUserBudgetService;
import egovframework.expend.np.user.budget.service.FNpUserBudgetService;
import egovframework.expend.np.user.res.dao.FNpUserResServiceADAO;
import egovframework.expend.np.user.res.service.FNpUserResService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service ( "FNpUserResServiceA" )
public class FNpUserResServiceAImpl implements FNpUserResService {

	/* 변수정의 */
	/* 변수정의 - DAO */
	@Resource ( name = "FNpUserResServiceADAO" )
	private FNpUserResServiceADAO dao;
	@Resource ( name = "FNpUserResServiceA" )
	private FNpUserResService ResA;
	@Resource ( name = "BNpUserBudgetService" )
	private BNpUserBudgetService serviceBudget;
	@Resource ( name = "FNpUserBudgetServiceI" )
	private FNpUserBudgetService budgetI;
	@Resource ( name = "CommonInfo" )
	private CommonInfo cmInfo;
	/* ## dj 커스텀 추가 20200520 ## */
	@Resource ( name = "BCommonProcG20DAO" )
	private BCommonProcG20DAO bCommonProcG20DAO;
	/* ## dj 커스텀 추가 20200520 ## */
	
	/* 결의 문서 최초 생성 */
	@Override
	public ResultVO insertResDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = dao.insertResDoc( params );
		}
		catch ( Exception ex ) {
			result.setFail( "결의문서 생성에 실패하였습니다.", ex );
		}
		return result;
	}

	/* 결의문서 참조품의 정보 반영 */
	@Override
	public ResultVO updateResConfferInfo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y", "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			result = dao.selectResDoc( params );
			String docSeq = CommonConvert.NullToString( result.getAaData( ).get( 0 ).get( "docSeq" ), commonCode.emptyStr );
			if ( !docSeq.equals( "" ) ) {
				result.setFail( "상신 된 문서는 변경할 수 없습니다." );
				return result;
			}
			/* 현재 결의서 데이터 초기화 */
			dao.deleteResHeadForDoc( params );
			dao.deleteResBudgetForDoc( params );
			dao.deleteResTradeForDoc( params );
			/* 품의서 데이터 이관 - DOC */
			result = dao.updateDocConfferInfo( params );
			if ( CommonConvert.CommonGetStr(result.getResultCode( )).equals( commonCode.fail ) ) {
				throw new Exception( " 품의 문서 반영 도중 오류가 발생하였습니다. " );
			}
			/* 품의서 데이터 이관 - HEAD */
			result = dao.updateHeadConfferInfo( params );
			if ( CommonConvert.CommonGetStr(result.getResultCode( )).equals( commonCode.fail ) ) {
				throw new Exception( " 품의서 반영 도중 오류가 발생하였습니다. " );
			}
			
			/* 품의서 예산 조회 및 조회결과 업데이트(마이그레이션시 품의서 데이터 bgtSeq누락현상 으로 인해 조회 결과 업데이트)*/
			LoginVO loginVo = CommonConvert.CommonGetEmpVO( );
			ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( loginVo.getCompSeq( ) ) );
			ResultVO budgetInfo = new ResultVO();
			
			result =  serviceBudget.selectConfferBudgetInfo(params);
			for(int i=0;i<result.getAaData().size();i++){
				budgetInfo = budgetI.selectERPBudgetBalance(result.getAaData().get(i), conVo);
				budgetInfo.getAaData().get(0).put("consBudgetSeq", result.getAaData().get(i).get("budgetSeq"));
				serviceBudget.updateConfferBudgetInfo(budgetInfo.getAaData().get(0));
			}
			if ( CommonConvert.CommonGetStr(result.getResultCode( )).equals( commonCode.fail ) ) {
				throw new Exception( " 품의 예산 조회 도중 오류가 발생하였습니다. " );
			}
			
			/* 품의서 데이터 이관 - BUDGET */
			result = dao.updateBudgetConfferInfo( params );
			if ( CommonConvert.CommonGetStr(result.getResultCode( )).equals( commonCode.fail ) ) {
				throw new Exception( " 품의 예산 반영 도중 오류가 발생하였습니다. " );
			}

			/* ## dj 커스텀 추가 20200916 주석처리 ## */
			/* 품의서 데이터 이관 - TRADE */
//			result = dao.updateTradeConfferInfo( params );
//			if ( CommonConvert.CommonGetStr(result.getResultCode( )).equals( commonCode.fail ) ) {
//				throw new Exception( " 품의 거래처 반영 도중 오류가 발생하였습니다. " );
//			}
			/* ## dj 커스텀 추가 20200916 주석처리 ## */
			
			/* ## dj 커스텀 추가 20200520 ## */
			
			// 거래처 정보 업데이트	20201008 주석처리
//			List<Map<String, Object>> tradeList = dao.getTreadeInfo(params);
//			for (Map<String, Object> trade : tradeList) {
//				params.put("trSeq", trade.get("tr_seq"));
//				params.put("trType", "");
//				params.put("trName", "");
//				params.put("trDetailType", "");
//				ResultVO resultVO = bCommonProcG20DAO.selectTrList(params, conVo);
//				List<Map<String, Object>> tempList = resultVO.getAaData();
//				if(tempList != null && tempList.size() > 0) {
//					Map<String, Object> tempMap = resultVO.getAaData().get(0);
//					tempMap.put("resDocSeq", trade.get("res_doc_seq"));
//					tempMap.put("resSeq", trade.get("res_seq"));
//					tempMap.put("budgetSeq", trade.get("budget_seq"));
//					tempMap.put("tradeSeq", trade.get("trade_seq"));
//					dao.updateTreadInfo(tempMap);
//				}
//			}
			
//			if("dj_purcContPay".equals(params.get("outProcessInterfaceId"))) {	// 구매 대금지급 시 채주내역 삭제
//				dao.rollbackTradeConfferInfo( params );
//			}
			/* ## dj 커스텀 추가 20200520 ## */
		}
		catch ( Exception ex ) {
			/* 예산을 잡고 있지 않도록 롤백. */
			dao.rollbackDocConfferInfo( params );
			dao.rollbackHeadConfferInfo( params );
			dao.rollbackBudgetConfferInfo( params );
			dao.rollbackTradeConfferInfo( params );
			result.setFail( "참조품의 반영중 에러가 발생하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 각개 결의서 생성
	 */
	@Override
	public ResultVO insertResHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.insertResHead( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "각개 결의 생성에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 예산 생성
	 */
	@Override
	public ResultVO insertResBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 결의 예산 생성 */
				result = dao.insertResBudget( params );
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> budgetAmtTemp = serviceBudget.selectResAmt( params ).getaData( );
				orgnAData.put( "amt", budgetAmtTemp.get( "resAmt" ) );
				orgnAData.put( "stdAmt", budgetAmtTemp.get( "resBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", budgetAmtTemp.get( "resBudgetTaxAmt" ) );
				orgnAData.put( "budgetAmt", budgetAmtTemp.get( "resBudgetAmt" ) );
				orgnAData.put( "consBalance", budgetAmtTemp.get( "consBalance" ) );
				
				/* 예산별 금회 결의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				/* 결의서 금액 조회 */
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 예산 생성에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 거래처 생성
	 */
	@Override
	public ResultVO insertResTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y", "resSeq", "Y", "budgetSeq", "N", "erpBudgetSeq", "N" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 결의 거래처 생성 */
				result = dao.insertResTrade( params );
				/* 결의 예산 정보 갱신 */
				dao.updateResAmt( params );
				/* 결의서 예산 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> budgetAmtTemp = serviceBudget.selectResAmt( params ).getaData( );
				orgnAData.put( "amt", budgetAmtTemp.get( "resAmt" ) );
				orgnAData.put( "stdAmt", budgetAmtTemp.get( "resBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", budgetAmtTemp.get( "resBudgetTaxAmt" ) );
				orgnAData.put( "budgetAmt", budgetAmtTemp.get( "resBudgetAmt" ) );
				orgnAData.put( "consBalance", budgetAmtTemp.get( "consBalance" ) );

				/* 예산별 금회 결의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 거래처 생성에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 문서 갱신
	 */
	@Override
	public ResultVO updateResDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.updateResDoc( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의문서 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 문서 전자결재 정보 갱신
	 */
	@Override
	public ResultVO updateResDocEaInfo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.updateResDocEaInfo( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 문서 전자결재 정보 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 각개 결의서 갱신
	 */
	@Override
	public ResultVO updateResHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.updateResHead( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "각개 결의서 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 예산 갱신
	 */
	@Override
	public ResultVO updateResBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y", "resSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 결의 예산 갱신 */
				result = dao.updateResBudget( params );
				/* 결의서 예산 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> budgetAmtTemp = serviceBudget.selectResAmt( params ).getaData( );
				orgnAData.put( "amt", budgetAmtTemp.get( "resAmt" ) );
				orgnAData.put( "stdAmt", budgetAmtTemp.get( "resBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", budgetAmtTemp.get( "resBudgetTaxAmt" ) );
				orgnAData.put( "budgetAmt", budgetAmtTemp.get( "resBudgetAmt" ) );
				orgnAData.put( "consBalance", budgetAmtTemp.get( "consBalance" ) );
				
				
				/* 예산별 금회 결의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 예산 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 거래처 갱신
	 */
	@Override
	public ResultVO updateResTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y", "resSeq", "Y", "tradeSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.updateResTrade( params );
				/* 결의 예산 정보 갱신 */
				dao.updateResAmt( params );
				/* 결의 예산금액 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> budgetAmtTemp = serviceBudget.selectResAmt( params ).getaData( );
				orgnAData.put( "amt", budgetAmtTemp.get( "resAmt" ) );
				orgnAData.put( "stdAmt", budgetAmtTemp.get( "resBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", budgetAmtTemp.get( "resBudgetTaxAmt" ) );
				orgnAData.put( "budgetAmt", budgetAmtTemp.get( "resBudgetAmt" ) );
				orgnAData.put( "consBalance", budgetAmtTemp.get( "consBalance" ) );
				orgnAData.put( "tradeSeq", params.get( "tradeSeq" ) );

				/* 예산별 금회 결의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 거래처 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 문서 삭제
	 */
	@Override
	public ResultVO deleteResDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 결의 단계 삭제 */
				dao.deleteResHeadForDoc( params );
				/* 예산 단계 삭제 */
				dao.deleteResBudgetForDoc( params );
				/* 채주 단계 삭제 */
				dao.deleteResTradeForDoc( params );
				/* 문서 단계 삭제 */
				result = dao.deleteResDoc( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 문서 삭제에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 각개 결의 삭제
	 */
	@Override
	public ResultVO deleteResHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y", "resSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 예산 단계 삭제 */
				dao.deleteResBudgetForRes( params );
				/* 채주 단계 삭제 */
				dao.deleteResTradeForRes( params );
				/* 결의 단계 삭제 */
				result = dao.deleteResHead( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "각개 결의 삭제에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 예산 삭제
	 */
	@Override
	public ResultVO deleteResBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 채주 단계 삭제 */
				dao.deleteResTradeForBudget( params );
				/* 예산 단계 삭제 */
				result = dao.deleteResBudget( params );
				/* 결의서 예산 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> budgetAmtTemp = serviceBudget.selectResAmt( params ).getaData( );
				orgnAData.put( "amt", budgetAmtTemp.get( "resAmt" ) );
				orgnAData.put( "stdAmt", budgetAmtTemp.get( "resBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", budgetAmtTemp.get( "resBudgetTaxAmt" ) );
				orgnAData.put( "budgetAmt", budgetAmtTemp.get( "resBudgetAmt" ) );
				orgnAData.put( "consBalance", budgetAmtTemp.get( "consBalance" ) );

				/* 예산별 금회 결의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 예산 삭제에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 거래처 삭제
	 */
	@Override
	public ResultVO deleteResTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 카드 연동 여부 확인 */
				List<Map<String, Object>> cardList = new ArrayList<Map<String, Object>>();
				params.put("sendYN", "Y");
				cardList = dao.CardLinkSelect(params);
				
				/* 세금계산서 연동 여부 확인 */
				List<Map<String, Object>> eTaxList = new ArrayList<Map<String, Object>>();
				params.put("sendYN", "Y");
				eTaxList = dao.ETaxLinkSelect(params);
				
				/* 결의서 거래처 정보 삭제 */
				result = dao.deleteResTrade( params );
				
				/* 세금계산서 연동 정보 복구 */
				for (Map<String, Object> map : eTaxList) {
					map.put("sendYN", "N");
					map.put("ifMId", "0");
					map.put("ifDId", "0");
					
					dao.ETaxStatInfoUpdate(map);
				}
				
				/* 카드 연동 정보 복구 */
				for (Map<String, Object> map : cardList) {
					map.put("sendYN", "N");
					map.put("ifMId", "0");
					map.put("ifDId", "0");
					
					dao.CardStatInfoUpdate(map);
				}
				
				/* 결의 예산 정보 갱신 */
				dao.updateResAmt( params );
				/* 결의 예산금액 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> budgetAmtTemp = serviceBudget.selectResAmt( params ).getaData( );
				orgnAData.put( "amt", budgetAmtTemp.get( "resAmt" ) );
				orgnAData.put( "stdAmt", budgetAmtTemp.get( "resBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", budgetAmtTemp.get( "resBudgetTaxAmt" ) );
				orgnAData.put( "budgetAmt", budgetAmtTemp.get( "resBudgetAmt" ) );
				orgnAData.put( "consBalance", budgetAmtTemp.get( "consBalance" ) );

				/* 예산별 금회 결의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 거래처 삭제에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 문서 조회
	 */
	@Override
	public ResultVO selectResDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = dao.selectResDoc( params );
		}
		catch ( Exception ex ) {
			result.setFail( "결의 문서 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 각개 결의 조회
	 */
	@Override
	public ResultVO selectResHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectResHead( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "각개 결의 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 결의 예산 조회
	 */
	@Override
	public ResultVO selectResBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectResBudget( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 예산 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	@Override
	public int selectResBudgetCount ( Map<String, Object> params) {
		int result = 0;
		String[] key = { "resDocSeq", "Y" };
		result = dao.selectResBudgetCount( params );
		return result;
	}

	/**
	 * 결의 거래처 조회
	 */
	@Override
	public ResultVO selectResTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectResTrade( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}
	
	/**
	 * 카드사용내역 조회
	 */
	@Override
	public ResultVO selectCardDataList ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		
		
		try {
			/* 현재 작성중인 결의서에서 사용중인 카드내역은 제외한다. */
			String notSyncId = "";
			/*커스텀 --시내출장에서만씀*/
			if("Y".equals(params.get("outBusTripYn"))){
				notSyncId =String.valueOf(params.get("notInSyncId"));
				notSyncId =notSyncId.replaceAll(",", "\',\'");
				params.put( "notInSyncId", notSyncId );
				
				/* 카드내역 조회 */
				result = dao.selectCardDataList( params );
				
				/* dj 커스텀 거래처 코드 등 추가*/
				LoginVO loginVo = CommonConvert.CommonGetEmpVO( );
				ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( loginVo.getCompSeq( ) ) );
				for (Map<String, Object> cardInfo : result.getAaData()) {
					cardInfo.put("erpCoCd", loginVo.getErpCoCd());
					Map<String, Object> addData = bCommonProcG20DAO.selectErpTradeInfo(cardInfo, conVo);
					if(addData != null) {
						cardInfo.put("partnerNo", addData.get("TR_CD"));
						cardInfo.put("addr1", addData.get("DIV_ADDR1"));
						cardInfo.put("addr2", addData.get("ADDR2"));
						cardInfo.put("tel", addData.get("TEL"));
					}
				}
				/* dj 커스텀 거래처 코드 등 추가*/
			}
			/*커스텀 --시내출장에서만씀------else 아래부터는 원래 로직*/
			 else{
				
			
			
				
			for(Map<String, Object> tMap : dao.selectCardInfoIntoRes( params ).getAaData( ) ){
				notSyncId += tMap.get("syncId").toString( ) + "','";
			}
			
			
			if( notSyncId.length( ) > 1){
				notSyncId = notSyncId.substring( 0, notSyncId.length( ) - 3 );
			}
				params.put( "notInSyncId", notSyncId );
			
			/* 카드내역 조회 */
			result = dao.selectCardDataList( params );
			
			/* dj 커스텀 거래처 코드 등 추가*/
			LoginVO loginVo = CommonConvert.CommonGetEmpVO( );
			ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( loginVo.getCompSeq( ) ) );
			for (Map<String, Object> cardInfo : result.getAaData()) {
				cardInfo.put("erpCoCd", loginVo.getErpCoCd());
				Map<String, Object> addData = bCommonProcG20DAO.selectErpTradeInfo(cardInfo, conVo);
				if(addData != null) {
					cardInfo.put("partnerNo", addData.get("TR_CD"));
					cardInfo.put("addr1", addData.get("DIV_ADDR1"));
					cardInfo.put("addr2", addData.get("ADDR2"));
					cardInfo.put("tel", addData.get("TEL"));
				}
			}
			/* dj 커스텀 거래처 코드 등 추가*/
		}
	}
		catch ( Exception ex ) {
			result.setFail( "카드사용내역 조회에 실패하였습니다.", ex );
		}
		
		
		
		return result;
	}
	
	/**
	 * 카드사용내역 조회 업무추진비
	 */
	@Override
	public ResultVO selectCardDataListUpmo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		
		
		try {
			/* 현재 작성중인 결의서에서 사용중인 카드내역은 제외한다. */
			String notSyncId = "";
			/*커스텀 --시내출장에서만씀*/
			if("Y".equals(params.get("outBusTripYn"))){
				notSyncId =String.valueOf(params.get("notInSyncId"));
				notSyncId =notSyncId.replaceAll(",", "\',\'");
				params.put( "notInSyncId", notSyncId );
				
				/* 카드내역 조회 */
				result = dao.selectCardDataList( params );
				
				/* dj 커스텀 거래처 코드 등 추가*/
				LoginVO loginVo = CommonConvert.CommonGetEmpVO( );
				ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( loginVo.getCompSeq( ) ) );
				for (Map<String, Object> cardInfo : result.getAaData()) {
					cardInfo.put("erpCoCd", loginVo.getErpCoCd());
					Map<String, Object> addData = bCommonProcG20DAO.selectErpTradeInfo(cardInfo, conVo);
					if(addData != null) {
						cardInfo.put("partnerNo", addData.get("TR_CD"));
						cardInfo.put("addr1", addData.get("DIV_ADDR1"));
						cardInfo.put("addr2", addData.get("ADDR2"));
						cardInfo.put("tel", addData.get("TEL"));
					}
				}
				/* dj 커스텀 거래처 코드 등 추가*/
			}
			/*커스텀 --시내출장에서만씀------else 아래부터는 원래 로직*/
			 else{
				
			
			
				
			for(Map<String, Object> tMap : dao.selectCardInfoIntoRes( params ).getAaData( ) ){
				notSyncId += tMap.get("syncId").toString( ) + "','";
			}
			
			
			if( notSyncId.length( ) > 1){
				notSyncId = notSyncId.substring( 0, notSyncId.length( ) - 3 );
			}
				params.put( "notInSyncId", notSyncId );
			
			/* 카드내역 조회 */
			result = dao.selectCardDataListUpmo( params );
			
			/* dj 커스텀 거래처 코드 등 추가*/
			LoginVO loginVo = CommonConvert.CommonGetEmpVO( );
			ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( loginVo.getCompSeq( ) ) );
			for (Map<String, Object> cardInfo : result.getAaData()) {
				cardInfo.put("erpCoCd", loginVo.getErpCoCd());
				Map<String, Object> addData = bCommonProcG20DAO.selectErpTradeInfo(cardInfo, conVo);
				if(addData != null) {
					cardInfo.put("partnerNo", addData.get("TR_CD"));
					cardInfo.put("addr1", addData.get("DIV_ADDR1"));
					cardInfo.put("addr2", addData.get("ADDR2"));
					cardInfo.put("tel", addData.get("TEL"));
				}
			}
			/* dj 커스텀 거래처 코드 등 추가*/
		}
	}
		catch ( Exception ex ) {
			result.setFail( "카드사용내역 조회에 실패하였습니다.", ex );
		}
		
		
		
		return result;
	}
	

	@Override
	public ResultVO selectConfferBudgetInfo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectConfferBudgetInfo( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	@Override
	public ResultVO selectGroupBudgetInfo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectGroupBudgetInfo( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "결의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}
}
