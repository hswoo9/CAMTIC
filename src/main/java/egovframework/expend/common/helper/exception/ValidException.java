package egovframework.expend.common.helper.exception;


import egovframework.expend.common.vo.CommonInterface.commonCode;
import egovframework.expend.common.vo.ResultVO;

@SuppressWarnings ( "serial" )
public class ValidException extends Exception {

	ResultVO result;
	
	public ValidException(String msg ) {
		super( msg );

		result = new ResultVO( );
		makeResult(msg);
	}
	
	private void makeResult(String message){
		result.setResultCode( commonCode.fail );
		result.setResultName( message );
	}
	
	public ResultVO getResult(){
		return result;
	}
}
