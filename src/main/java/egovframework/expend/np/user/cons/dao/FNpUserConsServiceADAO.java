package egovframework.expend.np.user.cons.dao;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.expend.common.vo.ResultVO;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Repository ( "FNpUserConsServiceADAO" )
public class FNpUserConsServiceADAO extends AbstractDAO {

	/**
	 * 품의서 인터락 정보 생성
	 * P : { !formSeq }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO GetExDocMake (Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			List<Map<String, Object>> temp = selectList( "", params );
			result.setAaData( temp );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
	
	
	/**
	 * 참조품의 권한 t_exnp_cons_auth 테이블 조회
	 * P : { }
	 * return ResultVO with int
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsAuthTable () throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setaData( (Map<String, Object>) selectOne( "NpUserConsA.selectConsAuthTable"));
		
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 품의문서 생성
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO insertConsDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
            insert( "NpUserConsA.insertConsDoc", params );
			int consDocSeq = (int) params.get("doc_seq");
			if ( consDocSeq > 0 ) {
				Map<String, Object> temp = new HashMap<String, Object>( );
				temp.put( "consDocSeq", consDocSeq );
				result.setaData( temp );
				result.setSuccess( );
			}
			else {
				result.setFail( "품의 문서가 저장되지 않았습니다." );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 품의문서 삭제
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsDoc", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 품의문서 갱신
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO updateConsDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) update( "NpUserConsA.updateConsDoc", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 품의문서 전자결재 정보갱신
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO updateConsDocEaInfo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) update( "NpUserConsA.updateConsDocEaInfo", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 품의문서 정보 조회
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectConsDoc", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 정보 생성
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO insertConsHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
            insert( "NpUserConsA.insertConsHead", params );
			int consSeq = (int) params.get("cons_seq");
			if ( consSeq > 0 ) {
				Map<String, Object> temp = new HashMap<String, Object>( );
				temp.put( "consSeq", consSeq );
				result.setaData( temp );
				result.setSuccess( );
			}
			else {
				result.setFail( "품의 문서가 저장되지 않았습니다." );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 정보 갱신
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO updateConsHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) update( "NpUserConsA.updateConsHead", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 정보 조회
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectConsHead", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 정보 삭제 - 단일 품의서
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsHead ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsHead", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 정보 삭제 - 문서 단위
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsHeadForDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsHeadForDoc", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 예산 정보 생성
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO insertConsBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
            insert( "NpUserConsA.insertConsBudget", params );
			int budgetSeq = (int) params.get("budget_seq");
			if ( budgetSeq > 0 ) {
				Map<String, Object> temp = new HashMap<String, Object>( );
				temp.put( "budgetSeq", budgetSeq );
				result.setaData( temp );
				result.setSuccess( );
			}
			else {
				result.setFail( "품의 문서가 저장되지 않았습니다." );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 예산 정보 갱신
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO updateConsBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) update( "NpUserConsA.updateConsBudget", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 예산 정보 조회
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectConsBudget", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 예산 정보 삭제
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsBudget", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 예산 정보 삭제 - 문서 단위
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsBudgetForDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsBudgetForDoc", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 예산 정보 삭제 - 품의서 단위
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsBudgetForCons ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsBudgetForCons", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 생성
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO insertConsTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
            insert( "NpUserConsA.insertConsTrade", params );
			int tradeSeq = (int) params.get("trade_seq");
			if ( tradeSeq > 0 ) {
				Map<String, Object> temp = new HashMap<String, Object>( );
				temp.put( "tradeSeq", tradeSeq );
				result.setaData( temp );
				result.setSuccess( );
			}
			else {
				result.setFail( "품의 문서가 저장되지 않았습니다." );
			}
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 갱신
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO updateConsTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) update( "NpUserConsA.updateConsTrade", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 조회
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectConsTrade", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 삭제
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsTrade ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsTrade", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 삭제 - 예산 종속
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsTradeForBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsTradeForBudget", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 삭제 - 품의서 종속
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsTradeForCons ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsTradeForCons", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 삭제 - 품의서 문서 종속
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO deleteConsTradeForDoc ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			int resultCnt = (int) delete( "NpUserConsA.deleteConsTradeForDoc", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 각개 품의 예산정보 최신화
	 * P : { }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO updateConsAmt ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			update( "NpUserConsA.updateConsBudgetAmt", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
	
	/**
	 * 참조 품의 품의서 리스트 조회
	 * P : { 
	 * 	! frDt   [yyyyMMdd]
	 * 	, ! toDt [yyyyMMdd]
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectRefferConsList ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectRefferConsList", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
	
	/**
	 * 참조 품의 품의서 리스트 조회 (t_exnp_cons_auth X)
	 * P : { 
	 * 	! frDt   [yyyyMMdd]
	 * 	, ! toDt [yyyyMMdd]
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectRefferConsListNotTable ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectRefferConsListNotTable", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
	
	
	/**
	 * 품의서 상세 정보 조회 
	 * P : { 
	 * 	! consDocSeq
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConsDetailBudget ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectConsDetailBudget", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
	
	/**
	 * 결의서 키를 이용한 품의서 예산 정보조회 
	 * P : { 
	 * 	! consDocSeq
	 * }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectConfferConsBudgetInfo ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectConfferConsBudgetInfo", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}


	public ResultVO selectPricePaymentList ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
            if(params.containsKey("exnpType")){
                if(params.get("exnpType").equals("85") || params.get("exnpType").toString() == "85"
                    || params.get("exnpType").equals("86") || params.get("exnpType").toString() == "86") {
                    result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectPricePaymentList2", params ) );
                } else if(params.get("exnpType").equals("73")){
					result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectPricePaymentList3", params ) );
				} else {
                    result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectPricePaymentList", params ) );
                }
            } else {
                result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectPricePaymentList", params ) );
            }
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	public ResultVO selectPricePaymentListNotTable ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO();
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserConsA.selectPricePaymentListNotTable", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
}
