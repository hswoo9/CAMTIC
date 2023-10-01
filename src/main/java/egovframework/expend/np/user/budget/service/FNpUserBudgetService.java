package egovframework.expend.np.user.budget.service;


import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;

import java.util.Map;


public interface FNpUserBudgetService {

	/** 예산 예산잔액 조회 */
	ResultVO selectERPBudgetBalance (Map<String, Object> params, ConnectionVO conVo ) throws Exception;

	/** 품의서 잔액 조회 */
	ResultVO selectConsBudgetBalance ( Map<String, Object> params ) throws Exception;

	/** 품의서 잔액 조회 */
	ResultVO selectConsBudgetBalance ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;
	
	/** 결의서 사용금액 조회 */
	ResultVO selectResUseAmt ( Map<String, Object> params ) throws Exception;
	
	/** 결의서 사용금액 조회 */
	ResultVO selectResUseAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;
	
	/** 품의서 잔액 조회 [예실대비현황] */
	ResultVO selectConsBudgetBalanceForYesil ( Map<String, Object> params ) throws Exception;

	/** 결의서 사용금액 조회 [예실대비현황] */
	ResultVO selectResUseAmtForYesil ( Map<String, Object> params ) throws Exception;

	/** 품의서 품의액 조회 */
	ResultVO selectConsAmt ( Map<String, Object> params ) throws Exception;

	/** 결의서 결의액 조회 */
	ResultVO selectResAmt ( Map<String, Object> params ) throws Exception;

	/** 문서 예산별 총 금액 조회 */
	ResultVO selectTryAmt ( Map<String, Object> params ) throws Exception;
	
	/** 문서 예산별 총 금액 조회 */
	ResultVO selectTryAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;
	
	/** 참조 품의서 잔여 품의액 조회 */
	ResultVO selectConfferBudgetBalanceAmt ( Map<String, Object> params ) throws Exception;

	/** 참조 품의서 예산 조회를 위한 정보 조회 */
	ResultVO selectConfferBudgetInfo(Map<String, Object> params) throws Exception;

	/** 참조 품의서 예산 조회를 위한 정보 업데이트 */
	ResultVO updateConfferBudgetInfo(Map<String, Object> params) throws Exception;
}
