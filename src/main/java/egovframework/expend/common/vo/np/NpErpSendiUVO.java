package egovframework.expend.common.vo.np;


import egovframework.expend.common.vo.ResultVO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class NpErpSendiUVO {

	List<Map<String, Object>> resDoc;
	List<Map<String, Object>> resBudget;
	List<Map<String, Object>> resTrade;
	List<Map<String, Object>> sendCauseData;
	List<Map<String, Object>> sendPayData;
	List<KeyContainer> budgetKey ;
	List<KeyContainer> tradeKey ;
	String erpNoCDocu;
	
	/**
	 * ERP iU 전송포멧에 맞게 준비
	 */
	public NpErpSendiUVO (ResultVO resDoc, ResultVO resBudget, ResultVO resTrade, String erpNoCDocu ) throws Exception {
		/* 
		 * 지역변수 초기화 
		 * */
		this.budgetKey = new ArrayList<>( );
		this.tradeKey = new ArrayList<>( );
		this.resDoc = resDoc.getAaData( );
		this.resBudget = resBudget.getAaData( );
		this.resTrade = resTrade.getAaData( );
		
		/*
		 * 생성자 파라미터 무결검증
		 * */
		if ( this.resDoc.size( ) != 1 ) {
			throw new Exception( "문서정보는 단일 데이터를 포함해야 합니다." );
		}
		if ( this.resBudget.size( ) == 0 ) {
			throw new Exception( "예산정보를 찾을 수 없습니다." );
		}
		if ( this.resTrade.size( ) == 0 ) {
			throw new Exception( "거래처정보를 찾을 수 없습니다." );
		}
		/*
		 * 데이터 키 변환 - 전송준비
		 * */
		this.erpNoCDocu = erpNoCDocu;
		this.readySendCauseData( );
		this.readySendPayData( );
	}

	/**
	 * ERP전송 데이터 준비
	 * 헤더 정보와 예산정보를 가지고 있습니다.
	 * 대상 테이블 : FI_DOCUCAUSE.
	 */
	private void readySendCauseData ( ) {
		this.sendCauseData = new ArrayList<Map<String, Object>>( );
		String resBefore = "";
		int resIdx = -1;
		int dispIdx = 0;
		
		for ( int i = 0; i < this.resBudget.size( ); i++ ) {
			Map<String, Object> item = this.resBudget.get( i );
			Map<String, Object> temp = new HashMap<>( );
			
			if ( !resBefore.equals( item.get( "resSeq" ).toString( ) ) ) {
				resIdx++;
				resBefore = item.get( "resSeq" ).toString( );
				dispIdx=0;
			}	
			else {
				dispIdx++;
			}
			
			temp.put( "CD_COMPANY", item.get( "erpCompSeq" ) ); // 회사 코드
			temp.put( "CD_PC", item.get( "erpPcSeq" ) ); // 회계 단위
			temp.put( "NO_CDOCU", makeKeyString(this.erpNoCDocu, resIdx) ); // - 결의서번호
			temp.put( "NO_CDOLINE", "" + ( dispIdx + 1 ) ); // 문서 예산 키
			temp.put( "CD_WDEPT", item.get( "erpDeptSeq" ) ); // ERP 부서 코드 
			temp.put( "ID_WRITE", item.get( "erpEmpSeq" ) ); // ERP 사용자 코드
			temp.put( "DT_WRITE", item.get( "resDate" ) ); // 발의 일자
			temp.put( "TP_EPNOTE", getSetFgCode ( item.get( "docuFgCode" ) ) ); // 결의 구분
			temp.put( "DT_CACCT", item.get( "resDate" ) ); // - 회계 발의 일자
			temp.put( "DT_CAUSE", item.get( "dtCause" ) ); // 원인행위일
			temp.put( "NM_PUMM", item.get( "note" ) ); // 품의 내역
			temp.put( "ST_CDOCU", "3" ); // - 진행상태 승인코드 : 3  
			temp.put( "ID_ACCEPT", ""); // - 전표 승인 사원 코드
			temp.put( "ST_STATE", item.get( "" ) ); // - 출납 상태
			temp.put( "CD_BUDGET", item.get( "erpBudgetSeq" ) ); // 예산단위 코드
			temp.put( "CD_BIZPLAN", item.get( "erpBizplanSeq" ) ); // 사업계획 코드
			temp.put( "CD_BGACCT", item.get( "erpBgacctSeq" ) ); // 예산계정 코드
			temp.put( "NM_NOTE", item.get( "budgetNote" ) ); // 적요
			temp.put( "AM_TAXSTD", item.get( "stdAmt" ) ); // 공급가액
			temp.put( "AM_ADDTAX", item.get( "taxAmt" ) ); // 부가세
			temp.put( "AM_AMT", item.get( "amt" ) ); // 공급대가
			temp.put( "DT_PAYPLAN", item.get( "" ) ); // - 지출 / 수입 예정일
			temp.put( "DT_PAY", item.get( "" ) ); // - 지출 / 수입 일
			temp.put( "DT_REG", item.get( "" ) ); // - 등기일자
			temp.put( "DT_USER", item.get( "" ) ); // - 사용자설정일
			temp.put( "DT_START", item.get( "dtStart" ) ); // - 계약일
			temp.put( "DT_END", item.get( "dtEnd" ) ); // - 검수일
			temp.put( "ID_CAUSE", item.get( "idCause" ) ); // - 원인행위자
			temp.put( "CD_DEPOSIT", item.get( "depositor" ) ); // - 입출금계좌
			temp.put( "AM_ACTSUM", "0" ); // - 실행합
			temp.put( "AM_JSUM", "0" ); // - 예산잔액
			temp.put( "CD_DOCUPC", item.get( "" ) ); // - 전표처리회계단위
			temp.put( "NO_DOCU", item.get( "" ) ); // - 전표번호
			temp.put( "ST_DOCU", "" ); // - 전표상태 3 : 승인
			temp.put( "NM_REJECT", item.get( "" ) ); // - 반려사유
			temp.put( "NO_BDOCU", item.get( "" ) ); // - 반제전표
			temp.put( "NO_BDOLINE", "0" ); // - 반제전표라인
			temp.put( "TP_BDOCU", item.get( "" ) ); // - 원인전표여부(지출등록)
			temp.put( "ST_GWARE", item.get( "종결" ) ); // - 그룹웨어상태
			temp.put( "ID_INSERT", item.get( "" ) ); // - 최초입력일시
			temp.put( "DTS_INSERT", item.get( "" ) ); // - 최초입력사원
			temp.put( "ID_UPDATE", item.get( "" ) ); // - 수정일시
			temp.put( "DTS_UPDATE", item.get( "" ) ); // - 수정사원
			temp.put( "AM_EPNOTESUM", "0" ); // - 결의신청액
			temp.put( "AM_CAUSESUM", "0" ); // - 원인행위액
			temp.put( "AM_GMMSUM", "0" ); // - 결의금액
			temp.put( "AM_BGDAYSUM", "0" ); // - 승인금액
			temp.put( "NO_PAYORDER", item.get( "" ) ); // - 지급명령번호
			temp.put( "ID_EXAM", item.get( "" ) ); // - 
			temp.put( "ID_OBSER", item.get( "" ) ); // - 
			temp.put( "CD_ACCT", item.get( "erpFiacctSeq" ) ); // - 회계 계정 - 예산계정과 동일 
			temp.put( "NM_INPUT", item.get( "" ) ); // - 
			sendCauseData.add( temp );
			
			KeyContainer c = new KeyContainer( );
			c.noCDocu = makeKeyString(this.erpNoCDocu, i);
			c.noCDoline = "" + ( dispIdx + 1 ) ;
			c.resDocSeq = item.get( "resDocSeq" ).toString( );
			c.resHeadSeq = item.get( "resSeq" ).toString( );
			c.resBudgetSeq = item.get( "budgetSeq" ).toString( );
			this.budgetKey.add( c );
		}
		return;
	}

	private String getSetFgCode (Object item){
		String returnStr = "";
		if(item == null){
			returnStr = "";
		}else{
			if(item.toString( ).length( ) == 1){
				return "00" + item.toString( );
			}else if (item.toString( ).length( ) == 2){
				return "0" + item.toString( );
			}else{
				return item.toString( );
			}
		}
		return returnStr;
	}
	
	/**
	 * ERP전송 데이터 준비
	 * 채주정보를 가지고 있습니다.
	 * 대상 테이블 : FI_DOCUCAUSEPAY.
	 */
	private void readySendPayData ( ) {
		this.sendPayData = new ArrayList<Map<String, Object>>( );
		
		String budgetBefore = "";
		String resBefore = "";
		
		int resIdx = -1;
		int budgetIdx = 0;
		int tradeIdx = 0;

		for ( int i = 0; i < this.resTrade.size( ); i++ ) {
			Map<String, Object> item = this.resTrade.get( i );
			Map<String, Object> temp = new HashMap<>( );
			
			if ( !resBefore.equals( item.get( "resSeq" ).toString( ) ) ) {
				resBefore = item.get( "resSeq" ).toString( );
				budgetBefore = item.get( "budgetSeq" ).toString( );
				resIdx++;
				budgetIdx = 1;
				tradeIdx = 1;
			}
			else if ( !budgetBefore.equals( item.get( "budgetSeq" ).toString( ) ) ) {
					budgetBefore = item.get( "budgetSeq" ).toString( );
					budgetIdx++;
					tradeIdx = 1;
			} 
			else {
				tradeIdx++;
			}
			
			temp.put( "CD_COMPANY", item.get( "erpCompSeq" ) ); // - 회사코드
			temp.put( "CD_PC", item.get( "erpPcSeq" ) ); // - 회계단위
			temp.put( "NO_CDOCU", makeKeyString(this.erpNoCDocu, resIdx) ); // - 결의서번호
			temp.put( "NO_CDOLINE", "" + budgetIdx ); // - 결의서라인번호 
			temp.put( "NO_PAYLINE", "" + tradeIdx ); // - 결제정보라인번호
			temp.put( "TP_PAY", item.get( "setFgCode" ) ); // - 결제수단
			temp.put( "FG_TAX", item.get( "vatFgCode" ) ); // - 과세구분
			temp.put( "TP_CRE", item.get( "trFgCode" ) ); // - 채주유형
			temp.put( "AM_AMT", item.get( "amt" ) ); // - 공급대가
			temp.put( "AM_TAXSTD", item.get( "stdAmt" ) ); // - 공급가액
			temp.put( "AM_ADDTAX", item.get( "vatAmt" ) ); // - 부가세
			temp.put( "AM_INCOMTAX", "0" ); // - 소득세
			temp.put( "AM_RESIDTAX", "0" ); // - 주민세
			temp.put( "AM_ANNU", "0" ); // - 국민연금
			temp.put( "AM_INS", "0" ); // - 건강보험
			temp.put( "AM_EMPE", "0" ); // - 고용보험
			temp.put( "AM_OINS", "0" ); // - 장기요양보험
			temp.put( "AM_ETCTAX", "0" ); // - 기타세액
			temp.put( "CD_CODE", item.get( "trSeq" ) ); // - 채주코드
			temp.put( "NM_NAME", item.get( "trName" ) ); // - 채주명
			temp.put( "NM_CEO", item.get( "ceoName" ) ); // - 대표자
			temp.put( "CD_BANK", item.get( "btrSeq" ) ); // - 금융기관코드
			temp.put( "NM_BANK", item.get( "btrName" ) ); // - 금융기관명
			temp.put( "NO_DEPOSIT", item.get( "baNb" ) ); // - 계좌번호
			temp.put( "NM_DEPOSIT", item.get( "depositor" ) ); // - 예금주
			temp.put( "NM_NOTE", item.get( "note" ) ); // - 비고
			temp.put( "DT_TO", item.get( "taxDate" ) ); // - 신고기준일 / 과세 경우 필수 
			temp.put( "CD_MNG", item.get( "" ) ); // - 소득등록관리번호
			temp.put( "YM", item.get( "" ) ); // - 귀속년월
			temp.put( "ID_INSERT", item.get( "" ) ); // - 최초입력일시
			temp.put( "DTS_INSERT", item.get( "" ) ); // - 최초입력사원
			temp.put( "ID_UPDATE", item.get( "" ) ); // - 수정일시
			temp.put( "DTS_UPDATE", item.get( "" ) ); // - 수정사원
			temp.put( "NO_CARD", getCardNum(item.get( "cardNum" )) ); // - 
			temp.put( "NM_INPUT", item.get( "" ) ); // - 
			temp.put( "ST_MUTUAL", item.get( "noTaxCode" ) ); // 불공제 사유 구분 코드
			sendPayData.add( temp );
			
			KeyContainer c = new KeyContainer( );
			c.noCDocu = makeKeyString(this.erpNoCDocu, resIdx);
			c.noCDoline = "" + budgetIdx;
			c.noPayLine = "" + tradeIdx;
			c.resDocSeq = item.get( "resDocSeq" ).toString( );
			c.resHeadSeq = item.get( "resSeq" ).toString( );
			c.resBudgetSeq = item.get( "budgetSeq" ).toString( );
			c.resTradeSeq = item.get( "tradeSeq" ).toString( );
			this.tradeKey.add( c );
		}
		return;
	}

	private String getCardNum (Object o){
		String result = "";
		if(o == null){
			return "";
		}
		result = o.toString( ).replace( "-", "" );
		if(result.length( ) == 16){
			result = result.substring( 0,4 ) + "-" + result.substring( 4, 8 )   + "-" + result.substring( 8, 12 ) + "-" + result.substring( 12, 16 );
		}
		
		return result;
	}
	
	private String makeKeyString(String orgnKey, int val){
		String imperfactKey  = orgnKey.substring( 0, 10 );
		String idx = orgnKey.substring( 10 );
		int idx2 = Integer.parseInt( idx ) + val;
		return imperfactKey + String.format( "%05d", idx2 );
	}
	
	/**
	 * ERP 전송 키 반환
	 * 대상 테이블 : t_exnp_resbudget
	 * 
	 * @throws Exception
	 */
	public List<KeyContainer> getBudgetKeyList(){
		return this.budgetKey;
	}
	
	/**
	 * ERP 전송 키 반환
	 * 대상 테이블 : t_exnp_restrade
	 * 
	 * @throws Exception
	 */
	public List<KeyContainer> getTradeKeyList(){
		return this.tradeKey;
	}
	
	/**
	 * ERP 전송 데이터 반환
	 * 대상 테이블 : FI_DOCUCAUSE
	 * 
	 * @throws Exception
	 */
	public List<Map<String, Object>> getSendCauseData ( ) throws Exception {
		if ( this.sendCauseData == null ) {
			throw new Exception( "전송 데이터가 준비되지 않았습니다." );
		}
		return this.sendCauseData;
	}

	/**
	 * ERP 전송 데이터 반환
	 * 대상 테이블 : FI_DOCUCAUSEPAY
	 * 
	 * @throws Exception
	 */
	public List<Map<String, Object>> getSendPayData ( ) throws Exception {
		if ( this.sendPayData == null ) {
			throw new Exception( "전송 데이터가 준비되지 않았습니다." );
		}
		return this.sendPayData;
	}
	
	public class KeyContainer{
		public String noCDocu;
		public String noCDoline;
		public String noPayLine;
		public String resDocSeq;
		public String resHeadSeq;
		public String resBudgetSeq;
		public String resTradeSeq;
		
		public KeyContainer(){
			noCDocu = "";
			noCDoline = "";
			noPayLine = "";
			resDocSeq = "";
			resHeadSeq = "";
			resBudgetSeq = "";
			resTradeSeq = "";
		}
	}
}
