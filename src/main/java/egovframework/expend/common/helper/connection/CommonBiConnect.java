package egovframework.expend.common.helper.connection;

import egovframework.expend.common.CommonMapInterface.sqlMapPath;
import egovframework.expend.common.helper.logger.CommonLogger;
import egovframework.expend.common.vo.ConnectionVO;

import java.util.List;
import java.util.Map;



public class CommonBiConnect {

	/* 변수정의 */
	/* 변수정의 - Common */
	private CommonLogger cmLog = new CommonLogger( );
	/* 변수정의 - class */
	private CommonErpConnect connector = new CommonErpConnect( );

	/* SqlSessionFactory */
	/* SqlSessionFactory - Select */
	public Map<String, Object> Select (ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		cmLog.CommonSetInfo( "bi execute select >> " + queryId );
		try {
			return connector.Select( conVo, sqlMapPath.biPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO Auto-generated catch block
			e.printStackTrace( );
		}
		return null;
	}

	/* SqlSessionFactory - List */
	public List<Map<String, Object>> List ( ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		cmLog.CommonSetInfo( "bi execute select >> " + queryId );
		try {
			return connector.List( conVo, sqlMapPath.biPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO Auto-generated catch block
			e.printStackTrace( );
		}
		return null;
	}

	/* SqlSessionFactory - Insert */
	public int Insert ( ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		cmLog.CommonSetInfo( "bi execute insert >> " + queryId );
		try {
			return connector.Insert( conVo, sqlMapPath.biPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO Auto-generated catch block
			e.printStackTrace( );
		}
		return 0;
	}

	
	
	/* SqlSessionFactory - Update */
	public int Update ( ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		cmLog.CommonSetInfo( "bi execute update >> " + queryId );
		try {
			return connector.Update( conVo, sqlMapPath.biPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO Auto-generated catch block
			e.printStackTrace( );
		}
		return 0;
	}
	/* SqlSessionFactory - Update */
	public int Update ( ConnectionVO conVo, String queryId, Map<String, Object> params, String StoredProcedure ) {
		cmLog.CommonSetInfo( "bi execute update >> " + queryId );
		try {
			return connector.Update( conVo, sqlMapPath.biPath, queryId, params, "SP");
		}
		catch ( Exception e ) {
			// TODO Auto-generated catch block
			e.printStackTrace( );
		}
		return 0;
	}
	


	/* SqlSessionFactory - Delete */
	public int Delete ( ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		cmLog.CommonSetInfo( "bi execute delete >> " + queryId );
		try {
			return connector.Delete( conVo, sqlMapPath.biPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO Auto-generated catch block
			e.printStackTrace( );
		}
		return 0;
	}
}
