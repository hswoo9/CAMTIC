package egovframework.expend.common.helper.logger;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.Map;


@Repository ( "CommonLoggerDAO" )
public class CommonLoggerDAO extends AbstractDAO {

	public void CommonSetLogToDatabaseInsert ( Map<String, Object> params ) {
		/* INSERT INTO t_expend_log ( `comp_seq`, `module_type`, `log_type`, `message`, `create_date` ) VALUES ( '$compSeq$', '$moduleType$', '$logType$', '$message$', NOW() ) */
//		insert( "CommonLoggerDAO.CommonSetLogToDatabaseInsert", params );
	}
}