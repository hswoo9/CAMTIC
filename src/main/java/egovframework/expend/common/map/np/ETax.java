package egovframework.expend.common.map.np;

public interface ETax {

	public static interface Map {
		public interface Admin {
			/**
			 * <pre>
			 * # 관리자 매입전자세금계산서 목록 조회
			 * # mybatis
			 *    - path : /egovframework/sqlmap/mssql/iCUBE/expend/np/admin
			 *    - xml : NpAdminETaxSQL.xml
			 *    - id : AdminETaxList
			 *    - parameterType : java.util.Map
			 *      >> erpCompSeq, issDateFrom, issDateTo, partnerName, eTaxStat, partnerRegNo, eTaxIssNo, approvalEmpName
			 *    - resultType : java.util.Map
			 * # iCUBE : 
			 * # ERPiU :
			 * </pre>
			 */
			String List = "AdminETaxList";
		}

		public interface User {
			/**
			 * <pre>
			 * # 사용자 매입전자세금계산서 목록 조회
			 * # mybatis
			 *    - path : /egovframework/sqlmap/mssql/iCUBE/expend/np/user
			 *    - xml : NpETaxSQL.xml
			 *    - id : UserETaxList
			 *    - parameterType : java.util.Map
			 *    - resultType : java.util.Map
			 * # iCUBE : 
			 * # ERPiU :
			 * </pre>
			 */
			String List = "UserETaxList";
			
			/**
			 * <pre>
			 * # 사용자 매입전자세금계산서 작성 예정 목록 조회
			 * # mybatis
			 *    - path : /egovframework/sqlmap/mssql/iCUBE/expend/np/user
			 *    - xml : NpETaxSQL.xml
			 *    - id : UserETaxApprovalList
			 *    - parameterType : java.util.Map
			 *    - resultType : java.util.Map
			 * # iCUBE : 
			 * # ERPiU :
			 * </pre>
			 */
			String ApprovalList = "UserETaxApprovalList";
		}

		/**
		 * 매입전자세금계산서 (이관)수신 목록 조회 <br />
		 * - t_ex_etax_aq_tmp <br />
		 * - parameters : compSeq, empSeq, issDateFrom, issDateTo <br />
		 * - return : compSeq, issNo, issDt, partnerNo, partnerName, transferSeq, transferName, receiveSeq, receiveName, supperKey <br />
		 * - NpAdminReportSQL.xml
		 */
		String	TransList	= "NpUserReportA.ETaxTransList";
		
		/**
		 * 매입전자세금계산서 (이관)수신 목록 조회 <br />
		 * - t_ex_etax_aq_tmp <br />
		 * - parameters : compSeq, empSeq, issDateFrom, issDateTo <br />
		 * - return : compSeq, issNo, issDt, partnerNo, partnerName, transferSeq, transferName, receiveSeq, receiveName, supperKey <br />
		 * - NpAdminReportSQL.xml
		 */
		String	ReceiveList	= "NpUserReportA.ETaxReceiveList";

		/**
		 * 매입전자세금계산서 데이터 존재 여부 확인 <br />
		 * - t_ex_etax_aq_tmp <br />
		 * - parameters : issNo, issDt <br />
		 * - return : syncId, issNo, issDt, trRegNb, compSeq, sendYn, note, ifMId, ifDId, useYn, useYnEmpSeq <br />
		 * - NpAdminReportSQL.xml
		 */
		String	Exists		= "NpUserReportA.ETaxExists";

		/**
		 * 매입전자세금계산서 이관 데이터 존재 여부 확인 <br />
		 * - t_ex_etax_aq_tmp <br />
		 * - parameters : compSeq, issNo, issDt <br />
		 * - return : eTaxTransSeq, compSeq, issNo, issDt, trRegNb, trName, reqAmt, transferSeq, transferName, receiveEmpSeq, receiveEmpName, receiveEmpSuperKey <br />
		 * - NpAdminReportSQL.xml
		 */
		String	TransExists	= "NpUserReportA.ETaxTransExists";

		/**
		 * 매입전자세금계산서 상신 데이터 존재 여부 확인 <br />
		 * - t_ex_etax_aq_tmp <br />
		 * - parameters : issNo, issDt <br />
		 * - return : syncId, issNo, issDt, trRegNb, compSeq, sendYn, note, ifMId, ifDId, useYn, useYnEmpSeq <br />
		 * - NpAdminReportSQL.xml
		 */
		String	SendExists	= "NpUserReportA.ETaxSendExists";

		/**
		 * 매입전자세금계산서 연동 데이터 생성 - t_ex_etax_aq_tmp <br />
		 * - parameters : issNo, issDt, trRegNb, compSeq, empSeq <br />
		 * - return : sync_id ( select last_insert_id() ) <br />
		 * - NpAdminReportSQL.xml
		 */
		String	Insert		= "NpUserReportA.ETaxInsert";

		/**
		 * 매입전자세금계산서 연동 데이터 이관 처리 - t_ex_etax_aq_tmp <br />
		 * - parameters : compSeq, issNo, issDt, trRegNb, trName, reqAmt, empSeq, empName, receiveEmpSeq, receiveEmpName, receiveEmpSuperKey, issNo, issDt <br />
		 * - return : etax_trans_seq ( select last_insert_id() ) <br />
		 * - NpAdminReportSQL.xml
		 */
		String	TransInsert	= "NpUserReportA.ETaxTransInsert";

		/**
		 * 매입전자세금계산서 연동 데이터 미사용 처리 - t_ex_etax_aq_tmp <br />
		 * - parameters : issNo, issDt, empSeq <br />
		 * - return : sync_id ( select last_insert_id() ) <br />
		 * - NpAdminReportSQL.xml
		 */
		String	UseUpdateN	= "NpUserReportA.ETaxUseUpdateN";

		/**
		 * 매입전자세금계산서 연동 데이터 사용 처리 - t_ex_etax_aq_tmp <br />
		 * - parameters : issNo, issDt, empSeq <br />
		 * - return : sync_id ( select last_insert_id() ) <br />
		 * - NpAdminReportSQL.xml
		 */
		String	UseUpdateY	= "NpUserReportA.ETaxUseUpdateY";

		/**
		 * 매입전자세금계산서 연동 데이터 상신 취소 처리 - t_ex_etax_aq_tmp <br />
		 * - parameters : issNo, issDt, empSeq <br />
		 * - return : sync_id ( select last_insert_id() ) <br />
		 * - NpAdminReportSQL.xml
		 */
		String	SendUpdateN	= "NpUserReportA.ETaxSendUpdateN";

		/**
		 * 매입전자세금계산서 연동 데이터 상신 처리 - t_ex_etax_aq_tmp <br />
		 * - parameters : issNo, issDt, empSeq <br />
		 * - return : sync_id ( select last_insert_id() ) <br />
		 * - NpAdminReportSQL.xml
		 */
		String	SendUpdateY	= "NpUserReportA.ETaxSendUpdateY";

		/**
		 * 매입전자세금계산서 연동 데이터 상신 처리 - t_ex_etax_aq_tmp <br />
		 * - parameters : compSeq, issNo, issDt, trRegNb, trName, reqAmt, empSeq, empName, receiveEmpSeq, receiveEmpName, receiveEmpSuperKey, eTaxTransSeq, issNo, issDt <br />
		 * - return : <br />
		 * - NpAdminReportSQL.xml
		 */
		String	TransUpdate	= "NpUserReportA.ETaxTransUpdate";
	}
}