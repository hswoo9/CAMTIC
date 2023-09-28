/**
  * @FileName : CommonAcConnect.java
  * @Project : BizboxA_exp
  * @변경이력 :
  * @프로그램 설명 :
  */
package egovframework.expend.common.helper.connection;


import egovframework.expend.common.CommonMapInterface.sqlMapPath;
import egovframework.expend.common.vo.ConnectionVO;

import java.util.List;
import java.util.Map;


/**
 *   * @FileName : CommonAcConnect.java
 *   * @Project : BizboxA_exp
 *   * @변경이력 :
 *   * @프로그램 설명 :
 *   
 */
public class CommonAcConnect {

	/* ################################################## */
	/* 변수정의 */
	/* ################################################## */
	/* 변수정의 - class */
	private CommonErpConnect connector = new CommonErpConnect( );

	/* SqlSessionFactory */
	/* SqlSessionFactory - Select */
	public Map<String, Object> Select (ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		try {
			return connector.Select( conVo, sqlMapPath.acPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO: handle exception
		}
		return null;
	}

	/* SqlSessionFactory - List */
	public List<Map<String, Object>> List ( ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		try {
			return connector.List( conVo, sqlMapPath.acPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO: handle exception
		}
		return null;
	}

	/* SqlSessionFactory - Insert */
	public int Insert ( ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		try {
			return connector.Insert( conVo, sqlMapPath.acPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO: handle exception
		}
		return 0;
	}

	/* SqlSessionFactory - Update */
	public int Update ( ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		try {
			return connector.Update( conVo, sqlMapPath.acPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO: handle exception
		}
		return 0;
	}

	/* SqlSessionFactory - Delete */
	public int Delete ( ConnectionVO conVo, String queryId, Map<String, Object> params ) {
		try {
			return connector.Delete( conVo, sqlMapPath.acPath, queryId, params );
		}
		catch ( Exception e ) {
			// TODO: handle exception
		}
		return 0;
	}
}
