package egovframework.expend.common.helper.connection;


import egovframework.expend.common.CommonMapInterface.sqlMapPath;
import egovframework.expend.common.helper.logger.CommonLogger;
import egovframework.expend.common.vo.ConnectionVO;

import java.util.List;
import java.util.Map;


public class CommonBatchCmsConnect {

	/* 변수정의 */
	/* 변수정의 - Common */
	private CommonLogger cmLog = new CommonLogger( );
	/* 변수정의 - class */
	private CommonErpConnect connector = new CommonErpConnect( );

	/* SqlSessionFactory */
	/* SqlSessionFactory - Select */
	public Map<String, Object> Select (ConnectionVO conVo, String queryId, Map<String, Object> params ) throws Exception {
		cmLog.CommonSetInfo( "ex execute select >> " + queryId );
		return connector.Select( conVo, sqlMapPath.cmsPath, queryId, params );
	}

	/* SqlSessionFactory - List */
	public List<Map<String, Object>> List ( ConnectionVO conVo, String queryId, Map<String, Object> params ) throws Exception {
		cmLog.CommonSetInfo( "ex execute select >> " + queryId );
		return connector.List( conVo, sqlMapPath.cmsPath, queryId, params );
	}

	/* SqlSessionFactory - Insert */
	public int Insert ( ConnectionVO conVo, String queryId, Map<String, Object> params ) throws Exception {
		cmLog.CommonSetInfo( "ex execute select >> " + queryId );
		return connector.Insert( conVo, sqlMapPath.cmsPath, queryId, params );
	}

	/* SqlSessionFactory - Update */
	public int Update ( ConnectionVO conVo, String queryId, Map<String, Object> params ) throws Exception {
		cmLog.CommonSetInfo( "ex execute select >> " + queryId );
		return connector.Update( conVo, sqlMapPath.cmsPath, queryId, params );
	}

	/* SqlSessionFactory - Delete */
	public int Delete ( ConnectionVO conVo, String queryId, Map<String, Object> params ) throws Exception {
		cmLog.CommonSetInfo( "ex execute select >> " + queryId );
		return connector.Delete( conVo, sqlMapPath.cmsPath, queryId, params );
	}
}
