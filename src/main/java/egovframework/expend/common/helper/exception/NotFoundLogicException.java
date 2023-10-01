package egovframework.expend.common.helper.exception;

@SuppressWarnings ( "serial" )
public class NotFoundLogicException extends Exception {

	String tryConnType;

	public NotFoundLogicException(String msg, String tryConnType ) {
		super( msg );
		this.tryConnType = tryConnType;
	}

	public String GetTryConnType ( ) {
		return tryConnType.toString( );
	}
	
	@Override
	public String getMessage(){
		return "[" + tryConnType + "] " +  super.getMessage( );
	}
}
