package egovframework.expend.np.user.res.dao;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.vo.ResultVO;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("FNpUserResServiceADAO")
public class FNpUserResServiceADAO extends AbstractDAO {

	/**
	 * 결의서 인터락 정보 생성 P : { !formSeq } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO GetExDocMake(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			List<Map<String, Object>> temp = selectList("", params);
			result.setAaData(temp);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 최초 생성 P : { }
	 */
	public ResultVO insertResDoc(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
            insert("NpUserResA.insertResDoc", params);
			int resDocSeq = (int) params.get("doc_seq");
			if (resDocSeq > 0) {
				Map<String, Object> temp = new HashMap<String, Object>();
				temp.put("resDocSeq", resDocSeq);
				result.setaData(temp);
				result.setSuccess();
			}
			else {
				result.setFail("품의 문서가 저장되지 않았습니다.");
			}
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의문서 삭제 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResDoc(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResDoc", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의문서 갱신 P : { } return ResultVO with aaData
	 */
	public ResultVO updateResDoc(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) update("NpUserResA.updateResDoc", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의문서 전자결재 정보갱신 P : { } return ResultVO with aaData
	 */
	public ResultVO updateResDocEaInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			if( params.get("docStatus").toString( ).equals( "999" ) || params.get("docStatus").toString( ).equals( "d" ) ){
				/* 카드 사용내역 / 매입전자 세금계산서 정보 롤백 */
				update("NpUserResA.updateResDocCardInfo", params);
				update("NpUserResA.updateResDocEtaxInfo", params);
			}
			int resultCnt = (int) update("NpUserResA.updateResDocEaInfo", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의문서 정보 조회 P : { } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectResDoc(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			result.setAaData((List<Map<String, Object>>) selectList("NpUserResA.selectResDoc", params));
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 정보 생성 P : { } return ResultVO with aaData
	 */
	public ResultVO insertResHead(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
            insert("NpUserResA.insertResHead", params);
			int consSeq = (int) params.get("res_seq");
			update("NpUserResA.updateResDoc", params);
			/* G20 일때, 원인행위 옵션 사용시 데이터 저장 */
			if (params.get("erpTypeCode").equals("iCUBE")) {
				if (params.get("causeDate") != null && params.get("causeEmpSeq") != null) {
					params.put("resSeq", consSeq);
					insert("NpUserResA.insertResCause", params);
				} 
			}
			/* ERPiU 일때, 원인행위 옵션 사용시 데이터 저장 */
			else if (params.get("erpTypeCode").equals("ERPiU")) {
				if (params.get("causeDate") != null) {
					params.put("resSeq", consSeq);
					insert("NpUserResA.insertResCause", params);
				}
			}
			if (consSeq > 0) {
				Map<String, Object> temp = new HashMap<String, Object>();
				temp.put("resSeq", consSeq);
				result.setaData(temp);
				result.setSuccess();
			}
			else {
				result.setFail("품의 문서가 저장되지 않았습니다.");
			}
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 정보 갱신 P : { } return ResultVO with aaData
	 */
	public ResultVO updateResHead(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) update("NpUserResA.updateResHead", params);
			update("NpUserResA.updateResDoc", params);
			/* G20 일때, 원인행위 옵션 사용시 데이터 저장 */
			if (params.get("erpTypeCode").equals("iCUBE")) {
				if (params.get("causeDate") != null && params.get("causeEmpSeq") != null) {
					if((int)update("NpUserResA.updateResCause", params) < 1){
						insert("NpUserResA.insertResCause", params);
					}
				}
			}
			/* ERPiU 일때, 원인행위 옵션 사용시 데이터 저장 */
			else if (params.get("erpTypeCode").equals("ERPiU")) {
				if (params.get("causeDate") != null) {
					if((int)update("NpUserResA.updateResCause", params) < 1){
						insert("NpUserResA.insertResCause", params);
					}
				}
			}
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 정보 조회 P : { } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectResHead(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			result.setAaData((List<Map<String, Object>>) selectList("NpUserResA.selectResHead", params));
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 정보 삭제 - 단일 품의서 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResHead(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResHead", params);
			/* G20 일때, 원인행위 옵션 사용시 데이터 삭제 */
			if (params.get("erpTypeCode").equals("iCUBE")) {
				if (params.get("causeDate") != null && params.get("causeEmpSeq") != null) {
					insert("NpUserResA.deleteResCause", params);
				}
			}
			/* ERPiU 일때, 원인행위 옵션 사용시 데이터 삭제 */
			if (params.get("erpTypeCode").equals("iCUBE")) {
				if (params.get("causeDate") != null) {
					insert("NpUserResA.deleteResCause", params);
				}
			}
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 정보 삭제 - 문서 단위 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResHeadForDoc(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResHeadForDoc", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 예산 정보 생성 P : { } return ResultVO with aaData
	 */
	public ResultVO insertResBudget(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
            insert("NpUserResA.insertResBudget", params);
			int budgetSeq = (int) params.get("budgetSeq");
			if (budgetSeq > 0) {
				Map<String, Object> temp = new HashMap<String, Object>();
				temp.put("budgetSeq", budgetSeq);
				result.setaData(temp);
				result.setSuccess();
			}
			else {
				result.setFail("결의 문서가 저장되지 않았습니다.");
			}
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 예산 정보 갱신 P : { } return ResultVO with aaData
	 */
	public ResultVO updateResBudget(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) update("NpUserResA.updateResBudget", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 예산 정보 조회 P : { } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectResBudget(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			result.setAaData((List<Map<String, Object>>) selectList("NpUserResA.selectResBudget", params));
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	public int selectResBudgetCount(Map<String, Object> params){
		int result = 0;
		result = (int) selectOne("NpUserResA.selectResBudgetCount", params);
		return result;

	}

	/**
	 * 각개 결의 예산 정보 삭제 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResBudget(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResBudget", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 예산 정보 삭제 - 문서 단위 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResBudgetForDoc(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResBudgetForDoc", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 예산 정보 삭제 - 결의서 단위 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResBudgetForRes(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResBudgetForRes", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 거래처 정보 생성 P : { } return ResultVO with aaData
	 */
	public ResultVO insertResTrade(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			/* 매입전자세금계산서 추가 프로세스 */
			if (params.containsKey("interfaceType") && CommonConvert.CommonGetStr(params.get("interfaceType")).equals("etax")) {
				if (!params.get("issNo").equals("")) {
					/* t_ex_etax_aq_tmp 중복데이터 확인 */
					Map<String, Object> eTaxInfo = (Map<String, Object>) selectOne("NpUserETaxA.ETaxSelect", params);

					if (eTaxInfo == null || (eTaxInfo.containsKey("syncId") && CommonConvert.CommonGetStr(eTaxInfo.get("syncId")).equals(""))) {
						/* t_ex_etax_aq_tmp 데이터 생성 */
						insert("NpUserETaxA.ETaxInsert", params);
					}
					/* t_ex_etax_aq_tmp 데이터 수정 */
					if(eTaxInfo != null){
						params.put("syncId", eTaxInfo.get("syncId"));
					}else{
						params.put("syncId", params.get("syncId"));
					}
					params.put("interfaceSeq", params.get("syncId"));
				}
			}

            insert("NpUserResA.insertResTrade", params);
			int tradeSeq = (int) params.get("trade_seq");
			if (tradeSeq > 0) {
				update("NpUserETaxA.ETaxEmpInfoUpdate", params);
				Map<String, Object> temp = new HashMap<String, Object>();
				temp.put("tradeSeq", tradeSeq);
				result.setaData(temp);
				result.setSuccess();
			}
			else {
				result.setFail("품의 문서가 저장되지 않았습니다.");
			}
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 거래처 정보 갱신 P : { } return ResultVO with aaData
	 */
	public ResultVO updateResTrade(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) update("NpUserResA.updateResTrade", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 거래처 정보 조회 P : { } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectResTrade(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			result.setAaData((List<Map<String, Object>>) selectList("NpUserResA.selectResTrade", params));
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 삭제 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResTrade(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResTrade", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 삭제 - 예산 종속 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResTradeForBudget(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResTradeForBudget", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 삭제 - 품의서 종속 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResTradeForRes(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResTradeForRes", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 품의 거래처 정보 삭제 - 품의서 문서 종속 P : { } return ResultVO with aaData
	 */
	public ResultVO deleteResTradeForDoc(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			int resultCnt = (int) delete("NpUserResA.deleteResTradeForDoc", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 각개 결의 예산정보 최신화 P : { } return ResultVO with aaData
	 */
	public ResultVO updateResAmt(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			update("NpUserResA.updateResBudgetAmt", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 참조품의 문서 적용 [ DOC ] P : { }
	 */
	public ResultVO updateDocConfferInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			update("NpUserResA.updateDocConfferInfo", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 참조품의 문서 적용 [ HEAD ] P : { }
	 */
	public ResultVO updateHeadConfferInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			update("NpUserResA.updateHeadConfferInfo", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 참조품의 문서 적용 [ BUDGET ] P : { }
	 */
	public ResultVO updateBudgetConfferInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			update("NpUserResA.updateBudgetConfferInfo", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 참조품의 문서 적용 [ TRADE ] P : { }
	 */
	public ResultVO updateTradeConfferInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			update("NpUserResA.updateTradeConfferInfo", params);
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 참조품의 롤백 진행 [ DOC ] P : { }
	 */
	public ResultVO rollbackDocConfferInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			delete("NpUserResA.rollbackDocConfferInfo", params);
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 참조품의 롤백 진행 [ HEAD ] P : { }
	 */
	public ResultVO rollbackHeadConfferInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			delete("NpUserResA.rollbackHeadConfferInfo", params);
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 참조품의 롤백 진행 [ BUDGET ] P : { }
	 */
	public ResultVO rollbackBudgetConfferInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			delete("NpUserResA.rollbackBudgetConfferInfo", params);
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서 참조품의 롤백 진행 [ TRADE ] P : { }
	 */
	public ResultVO rollbackTradeConfferInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			delete("NpUserResA.rollbackTradeConfferInfo", params);
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 카드사용내역 조회 P : { } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectCardDataList(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			if (params.get("searchCardInfo").toString().indexOf(",") > 0) {
				params.put("cardInfo", params.get("searchCardInfo").toString().split(","));
			}
			result.setAaData((List<Map<String, Object>>) selectList("NpUserResA.selectCardDataList", params));
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}
	
	/**
	 * 카드사용내역 업무추진비 조회 P : { } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectCardDataListUpmo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			if (params.get("searchCardInfo").toString().indexOf(",") > 0) {
				params.put("cardInfo", params.get("searchCardInfo").toString().split(","));
			}
			result.setAaData((List<Map<String, Object>>) selectList("NpUserResA.selectCardDataListUpmo", params));
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 작성중인 카드사용내역 조회 P : { } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectCardInfoIntoRes(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			result.setAaData((List<Map<String, Object>>) selectList("NpUserResA.selectCardInfoIntoRes", params));
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 참조품의 결의서 예산인지 확인 P : { } return ResultVO with aaData
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectConfferBudgetInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			if( CommonConvert.NullToString(  params.get( "erpBudgetSeq" ) ).equals( "" )){
				params.put( "erpBudgetSeq", "-1" );
			}
			if( CommonConvert.NullToString(  params.get( "erpBgacctSeq" ) ).equals( "" )){
				params.put( "erpBgacctSeq", "-1" );
			}
			result.setaData((Map<String, Object>) selectOne("NpUserResA.selectConfferBudgetInfo", params));
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}

	/**
	 * 결의서내 중복 예산코드 금액 정보조회
	 */
	@SuppressWarnings("unchecked")
	public ResultVO selectGroupBudgetInfo(Map<String, Object> params) throws Exception {
		ResultVO result = new ResultVO();
		try {
			if( CommonConvert.NullToString(  params.get( "erpBudgetSeq" ) ).equals( "" )){
				params.put( "erpBudgetSeq", "-1" );
			}
			if( CommonConvert.NullToString(  params.get( "erpBgacctSeq" ) ).equals( "" )){
				params.put( "erpBgacctSeq", "-1" );
			}
			
			List<Map<String, Object>> aaData = (List<Map<String, Object>> )selectList("NpUserResA.selectGroupBudgetInfo", params);
			if(aaData.size( ) == 0){
				Map<String, Object> aData = new HashMap<>( );
				aData.put( "resDocSeq", "" );
				aData.put( "resSeq", "" );
				aData.put( "budgetAmt", "0" );
				aData.put( "budgetStdAmt", "0" );
				aData.put( "budgetTaxAmt", "0" );
				aaData.add( aData );
			}
			result.setAaData( aaData );
			result.setSuccess();
		}
		catch (Exception ex) {
			result.setFail("Data 질의 요청중 에러 발생", ex);
		}
		return result;
	}
	
	public List<Map<String, Object>> ETaxLinkSelect(Map<String, Object> param) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

		try {
			result = (List<Map<String, Object>>) selectList("NpUserETaxA.ETaxLinkSelect", param);
		}
		catch (Exception e) {
			// TODO: handle exception
			result = null;
		}

		return result;
	}

	public void ETaxStatInfoUpdate(Map<String, Object> param) {
		update("NpUserETaxA.ETaxStatInfoUpdate", param);
	}

	public List<Map<String, Object>> CardLinkSelect(Map<String, Object> param) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

		try {
			result = (List<Map<String, Object>>) selectList("NpUserCard.CardLinkSelect", param);
		}
		catch (Exception e) {
			// TODO: handle exception
			result = null;
		}

		return result;
	}
	
	public void CardStatInfoUpdate(Map<String, Object> param) {
		update("NpUserCard.CardStatInfoUpdate", param);
	}

	/* ## dj 커스텀 추가 20200520 ## */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getTreadeInfo(Map<String, Object> params) {
		return selectList("NpUserResA.getTreadeInfo", params);
	}
	
	public void updateTreadInfo(Map<String, Object> tempMap) {
		update("NpUserResA.updateTreadInfo", tempMap);
	}
	/* ## dj 커스텀 추가 20200520 ## */
}