package egovframework.expend.common.vo.np;


import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.vo.CommonInterface.commonCode;
import egovframework.expend.common.vo.ResultVO;

import java.util.List;
import java.util.Map;


public class NpErpSendG20VO {

	private List<Map<String, Object>> resDoc;
	private List<Map<String, Object>> resHead;
	private List<Map<String, Object>> resBudget;
	private List<Map<String, Object>> resTrade;
	private int headIdx;
	private int budgetIdx;
	private int tradeIdx;

	
	/**
	 * ERP iU 전송포멧에 맞게 준비
	 */
	public NpErpSendG20VO (ResultVO resDoc, ResultVO resHead, ResultVO resBudget, ResultVO resTrade ) throws Exception {
		this.resDoc = resDoc.getAaData( );
		this.resHead = resHead.getAaData( );
		this.resBudget = resBudget.getAaData( );
		this.resTrade = resTrade.getAaData( );
		this.headIdx = -1;
		this.budgetIdx = -1;
		this.tradeIdx = -1;
		this.headIdx = -1;
		if ( CommonConvert.CommonGetStr(resDoc.getResultCode( )).toString( ).equals( commonCode.fail ) ) {
			throw new Exception( resDoc.getResultName( ) );
		}
		if ( CommonConvert.CommonGetStr(resDoc.getResultCode( )).toString( ).equals( commonCode.fail ) ) {
			throw new Exception( resDoc.getResultName( ) );
		}
		if ( CommonConvert.CommonGetStr(resBudget.getResultCode( )).toString( ).equals( commonCode.fail ) ) {
			throw new Exception( resBudget.getResultName( ) );
		}
		if ( CommonConvert.CommonGetStr(resTrade.getResultCode( )).toString( ).equals( commonCode.fail ) ) {
			throw new Exception( resTrade.getResultName( ) );
		}
		
		/* 헤더 정보 보정 진행 */
		advDataSetHead();
	}
	
	/**
	 * 	HEAD정보 보정 진행
	 */
	private void advDataSetHead(){
		if(this.resDoc.size( ) == 1){
			String docSeq = this.resDoc.get( 0 ).get( "docSeq" ).toString( );
			for(int i = 0;i < this.resHead.size( ); i++){
				this.resHead.get( i ).put( "docSeq", docSeq );
			}
		}
	}
	

	public void initIdx ( ) {
		this.headIdx = -1;
		this.budgetIdx = -1;
		this.tradeIdx = -1;
		this.headIdx = -1;
	}

	
	
	public Map<String, Object> getDoc ( ) throws Exception {
		return resDoc.get( 0 );
	}

	public Map<String, Object> getHead ( ) throws Exception {
		return resHead.get( this.headIdx );
	}

	public Map<String, Object> getBudget ( ) throws Exception {
		Map<String, Object> returnObj = resBudget.get( this.budgetIdx );
		/* 데이터 보정 */
		// returnObj.put( "budgetNote", returnObj.get( "note" ) );
		return returnObj;
	}

	public Map<String, Object> getTrade ( ) throws Exception {
		Map<String, Object> returnObj =resTrade.get( this.tradeIdx );
		/* 데이터 보정 */
		returnObj.put( "tradeNote", returnObj.get( "note" ) );
		return returnObj;
	}

	public Map<String, Object> getNextHead123 ( ) throws Exception {
		System.out.println( "CALL : public Map<String, Object> getNextHead ( ) throws Exception {" );
		System.out.println( this.headIdx );
		this.headIdx =  this.headIdx + 1;
		
		if ( this.resHead.size( ) <= this.headIdx ) {
			return null;
		}
		else {
			return resHead.get( this.headIdx );
		}
	}

	public Map<String, Object> getNextBudget ( ) throws Exception {
		if ( (this.headIdx == -1) || (this.headIdx >= this.resHead.size( )) ) {
			throw new Exception( " header index boundery exception. " );
		}
		String usingHeadKey = this.resHead.get( this.headIdx ).get( "resSeq" ).toString( );
		int budgetNextIdx = (this.budgetIdx + 1);
		if ( this.resBudget.size( ) <= budgetNextIdx ) {
			return null;
		}
		else if ( CommonConvert.CommonGetStr(this.resBudget.get( budgetNextIdx ).get( "resSeq" )).toString( ).equals( usingHeadKey ) ) {
			this.budgetIdx = budgetNextIdx;
			return this.resBudget.get( this.budgetIdx );
		}
		return null;
	}

	public Map<String, Object> getNextTrade ( ) throws Exception {
		if ( (this.headIdx == -1) || (this.headIdx >= this.resHead.size( )) ) {
			throw new Exception( " header index boundery exception. " );
		}
		if ( (this.budgetIdx == -1) || (this.budgetIdx >= this.resBudget.size( )) ) {
			throw new Exception( " budget index boundery exception. " );
		}
		String usingHeadKey = this.resHead.get( this.headIdx ).get( "resSeq" ).toString( );
		String usingBudgetKey = this.resBudget.get( this.budgetIdx ).get( "budgetSeq" ).toString( );
		int tradeNextIdx = (this.tradeIdx + 1);
		if ( this.resTrade.size( ) <= tradeNextIdx ) {
			return null;
		}
		else if ( CommonConvert.CommonGetStr(this.resTrade.get( tradeNextIdx ).get( "resSeq" )).toString( ).equals( usingHeadKey ) && CommonConvert.CommonGetStr(this.resTrade.get( tradeNextIdx ).get( "budgetSeq" )).toString( ).equals( usingBudgetKey ) ) {
			this.tradeIdx = tradeNextIdx;
			return this.resTrade.get( this.tradeIdx );
		}
		return null;
	}
}
