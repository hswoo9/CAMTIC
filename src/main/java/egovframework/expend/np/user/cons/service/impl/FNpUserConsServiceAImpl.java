package egovframework.expend.np.user.cons.service.impl;

import egovframework.devjitsu.common.utiles.MapUtil;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.helper.info.CommonInfo;
import egovframework.expend.common.vo.CommonInterface.commonCode;
import egovframework.expend.common.vo.ResultVO;
import egovframework.expend.np.user.budget.service.BNpUserBudgetService;
import egovframework.expend.np.user.cons.dao.FNpUserConsServiceADAO;
import egovframework.expend.np.user.cons.service.FNpUserConsService;
import egovframework.expend.np.user.option.service.BNpUserOptionService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service ( "FNpUserConsServiceA" )
public class FNpUserConsServiceAImpl implements FNpUserConsService {

	/* 변수정의 */
	/* 변수정의 - DAO */
	@Resource(name = "FNpUserConsServiceADAO")
	private FNpUserConsServiceADAO dao;

	@Resource(name = "BNpUserBudgetService")
	private BNpUserBudgetService serviceBudget;
	
	@Resource(name = "BNpUserOptionService")
	private BNpUserOptionService userServiceOption;	/* Expend Service */
	
	@Resource(name = "CommonInfo")
	private CommonInfo cmInfo;
	
	public ResultVO GetExDocMake (Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = dao.GetExDocMake( params );
		}
		catch ( Exception ex ) {
			result.setFail( "전자결재 인터락 조회 오류가 발생했습니다." );
		}
		return result;
	}

	/**
	 * 품의문서 생성
	 */
	@Override
	public ResultVO insertConsDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = dao.insertConsDoc( params );
		}
		catch ( Exception ex ) {
			result.setFail( "품의문서 생성에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 각개 품의서 생성
	 */
	@Override
	public ResultVO insertConsHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.insertConsHead( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "각개 품의 생성에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 예산 생성
	 */
	@Override
	public ResultVO insertConsBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 품의 예산 생성 */
				result = dao.insertConsBudget( params );
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> amtTemp = serviceBudget.selectConsAmt( params ).getaData( );
				orgnAData.put( "amt", amtTemp.get( "consBudgetAmt" ) );
				orgnAData.put( "stdAmt", amtTemp.get( "consBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", amtTemp.get( "consBudgetTaxAmt" ) );
				
				/* 예산별 금회 품의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				/* 품의서 금액 조회 */
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 예산 생성에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 거래처 생성
	 */
	@Override
	public ResultVO insertConsTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y", "consSeq", "Y", "budgetSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 품의 거래처 생성 */
				result = dao.insertConsTrade( params );
				/* 품의 예산 정보 갱신 */
				dao.updateConsAmt( params );
				/* 품의서 예산 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> amtTemp = serviceBudget.selectConsAmt( params ).getaData( );
				orgnAData.put( "amt", amtTemp.get( "consBudgetAmt" ) );
				orgnAData.put( "stdAmt", amtTemp.get( "consBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", amtTemp.get( "consBudgetTaxAmt" ) );
				
				/* 예산별 금회 품의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 생성에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 문서 갱신
	 */
	@Override
	public ResultVO updateConsDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.updateConsDoc( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의문서 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 문서 전자결재 정보 갱신
	 */
	@Override
	public ResultVO updateConsDocEaInfo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.updateConsDocEaInfo( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 문서 전자결재 정보 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 각개 품의서 갱신
	 */
	@Override
	public ResultVO updateConsHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.updateConsHead( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "각개 품의서 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 예산 갱신
	 */
	@Override
	public ResultVO updateConsBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y", "consSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 품의 예산 갱신 */
				result = dao.updateConsBudget( params );
								
				/* 품의서 예산 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> amtTemp = serviceBudget.selectConsAmt( params ).getaData( );
				orgnAData.put( "budgetSeq", params.get( "budgetSeq" ) );
				orgnAData.put( "amt", amtTemp.get( "consBudgetAmt" ) );
				orgnAData.put( "stdAmt", amtTemp.get( "consBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", amtTemp.get( "consBudgetTaxAmt" ) );
				
				/* 예산별 금회 품의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 예산 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 거래처 갱신
	 */
	@Override
	public ResultVO updateConsTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y", "consSeq", "Y", "tradeSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.updateConsTrade( params );
				/* 품의 예산 정보 갱신 */
				dao.updateConsAmt( params );
				/* 품의 예산금액 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> amtTemp = serviceBudget.selectConsAmt( params ).getaData( );
				orgnAData.put( "amt", amtTemp.get( "consBudgetAmt" ) );
				orgnAData.put( "stdAmt", amtTemp.get( "consBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", amtTemp.get( "consBudgetTaxAmt" ) );
				
				/* 예산별 금회 품의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 갱신에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 문서 삭제
	 */
	@Override
	public ResultVO deleteConsDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 품의 단계 삭제 */
				dao.deleteConsHeadForDoc( params );
				/* 예산 단계 삭제 */
				dao.deleteConsBudgetForDoc( params );
				/* 채주 단계 삭제 */
				dao.deleteConsTradeForDoc( params );
				/* 문서 단계 삭제 */
				result = dao.deleteConsDoc( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 문서 삭제에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 삭제
	 */
	@Override
	public ResultVO deleteConsHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y", "consSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 예산 단계 삭제 */
				dao.deleteConsBudgetForCons( params );
				/* 채주 단계 삭제 */
				dao.deleteConsTradeForCons( params );
				/* 품의 단계 삭제 */
				result = dao.deleteConsHead( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "각개 품의 삭제에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 예산 삭제
	 */
	@Override
	public ResultVO deleteConsBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 채주 단계 삭제 */
				dao.deleteConsTradeForBudget( params );
				/* 예산 단계 삭제 */
				result = dao.deleteConsBudget( params );
				/* 품의서 예산 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> amtTemp = serviceBudget.selectConsAmt( params ).getaData( );
				orgnAData.put( "amt", amtTemp.get( "consBudgetAmt" ) );
				orgnAData.put( "stdAmt", amtTemp.get( "consBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", amtTemp.get( "consBudgetTaxAmt" ) );
				
				/* 예산별 금회 품의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 예산 삭제에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 거래처 삭제
	 */
	@Override
	public ResultVO deleteConsTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				/* 품의서 거래처 정보 삭제 */
				result = dao.deleteConsTrade( params );
				/* 품의 예산 정보 갱신 */
				dao.updateConsAmt( params );
				/* 품의 예산금액 조회 */
				Map<String, Object> orgnAData = result.getaData( );
				Map<String, Object> amtTemp = serviceBudget.selectConsAmt( params ).getaData( );
				orgnAData.put( "amt", amtTemp.get( "consBudgetAmt" ) );
				orgnAData.put( "stdAmt", amtTemp.get( "consBudgetStdAmt" ) );
				orgnAData.put( "taxAmt", amtTemp.get( "consBudgetTaxAmt" ) );
				
				/* 예산별 금회 품의액 생성 */
				ResultVO tryResult = serviceBudget.selectTryAmt( params );
				orgnAData.put( "tryAmt", tryResult.getaData( ).get( "tryAmt" ) );
				
				result.setaData( orgnAData );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 삭제에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 문서 조회
	 */
	@Override
	public ResultVO selectConsDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = dao.selectConsDoc( params );
		}
		catch ( Exception ex ) {
			result.setFail( "품의 문서 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 조회
	 */
	@Override
	public ResultVO selectConsHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectConsHead( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "각개 품의 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 예산 조회
	 */
	@Override
	public ResultVO selectConsBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectConsBudget( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 예산 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 품의 거래처 조회
	 */
	@Override
	public ResultVO selectConsTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectConsTrade( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의 거래처 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 *	참조 품의 리스트 조회 
	 * 	param : {
	 * 		! frDt    [yyyyMMdd]
	 * 		, ! toDt  [yyyyMMdd]
	 * }
	 */
	@Override
	public ResultVO selectRefferConsList ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		ResultVO exist_table_flag = new ResultVO(); /* 0 : 없음 1: 있음 */ 

		try {
			String[] key = { "frDt", "Y", "toDt", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result.setSuccess( );
				exist_table_flag = dao.selectConsAuthTable();
				String flag = exist_table_flag.getaData().get("ifExists").toString();
				if(flag.equals("1")) {
					result = dao.selectRefferConsList( params );
				}
				else {
					result = dao.selectRefferConsListNotTable( params );
				}
			}
		}
		catch ( Exception ex ) {
			result.setFail( "참조품의 내역 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	/**
	 * 	품의서 상세정보 조회
	 * 	param : {
	 * 		! consDocSeq
	 * }
	 */
	@Override
	public ResultVO selectConsDetailBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "consDocSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectConsDetailBudget( params );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의서 상세정보 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	@Override
	public ResultVO selectConfferConsBudgetInfo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			String[] key = { "resSeq", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result = dao.selectConfferConsBudgetInfo( params );
				Map<String, Object> aData = new HashMap<String, Object>();
				if(CommonConvert.CommonGetStr(result.getResultCode( )).equals( commonCode.success )){
					List<Map<String, Object>> budgetInfo = result.getAaData( );
					if(budgetInfo.size( ) == 0){
						/* 일반 결의서의 경우 */
						aData.put( "isConffer", "N" );
						aData.put( "erpBudgetSeq", new ArrayList<String>() );
						aData.put( "erpBizplanSeq", new ArrayList<String>() );
						aData.put( "erpFiacctSeq", new ArrayList<String>() );
						aData.put( "erpBgacctSeq", new ArrayList<String>() );

						result.setaData( aData );
						result.setSuccess( "일반 결의서" );
					}else{
						ArrayList<String> erpBudgetSeq = new ArrayList<>( );
						ArrayList<String> erpBizplanSeq = new ArrayList<>( );
						ArrayList<String> erpFiacctSeq = new ArrayList<>( );
						ArrayList<String> erpBgacctSeq = new ArrayList<>( );
						for( Map<String, Object> item : budgetInfo ){
							erpBudgetSeq.add( item.get( "erpBudgetSeq" ).toString( ) );
							erpBizplanSeq.add( item.get( "erpBizplanSeq" ).toString( ) );
							erpFiacctSeq.add( item.get( "erpFiacctSeq" ).toString( ) );
							erpBgacctSeq.add( item.get( "erpBgacctSeq" ).toString( ) );
						}
						aData.put( "isConffer", "Y" );
						aData.put( "erpBudgetSeq", erpBudgetSeq );
						aData.put( "erpBizplanSeq", erpBizplanSeq );
						aData.put( "erpFiacctSeq", erpFiacctSeq );
						aData.put( "erpBgacctSeq", erpBgacctSeq );
						result.setaData( aData );
						result.setSuccess( "참조 결의서" );
					}
				}
			}
		}
		catch ( Exception ex ) {
			result.setFail( "품의서 상세정보 조회에 실패하였습니다.", ex );
		}
		return result;
	}

	@Override
	public ResultVO selectPricePaymentList ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		ResultVO exist_table_flag = new ResultVO(); /* 0 : 없음 1: 있음 */

		try {
			String[] key = { "frDt", "Y", "toDt", "Y" };
			if ( !MapUtil.hasParameters( params, key ) ) {
				result.setFail( "필수 값이 누락되었습니다." );
			}
			else {
				result.setSuccess( );
				exist_table_flag = dao.selectConsAuthTable();
				String flag = exist_table_flag.getaData().get("ifExists").toString();
				if(flag.equals("1")) {
					//result = dao.selectRefferConsList( params );
					result = dao.selectPricePaymentList( params );
				}
				else {
					//result = dao.selectRefferConsListNotTable( params );
					result = dao.selectPricePaymentListNotTable( params );

				}
			}
		}
		catch ( Exception ex ) {
			result.setFail( "참조품의 내역 조회에 실패하였습니다.", ex );
		}
		return result;
	}
}
