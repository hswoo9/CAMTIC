package egovframework.expend.np.user.option.dao;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.expend.common.helper.logger.CommonLogger;
import egovframework.expend.common.vo.ResultVO;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Repository ( "FNpUserOptionServiceADAO" )
public class FNpUserOptionServiceADAO extends AbstractDAO {
	@Resource(name = "CommonLogger")
	private CommonLogger cmLog; /* Log 관리 */
	
	/**
	 * 그룹웨어 환경설정 데이터 조회
	 * P : { !formSeq }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO NpGwCommonOptionSelect (Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			List<Map<String, Object>> temp = selectList( "NpUserOptionA.NpGwCommonOptionSelect", params );
			result.setAaData( temp );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 그룹웨어 환경설정 데이터 복사
	 * P : { !formSeq }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO NpGwCommonOptionInsert ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			insert( "NpUserOptionA.NpGwCommonOptionInsert", params );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 그룹웨어 비영리 양식정보 조회
	 * P : { !formSeq }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO NpGwEaFormInfoSelect ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserOptionA.NpGwEaFormInfoSelect", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
            ex.printStackTrace();
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}

	/**
	 * 그룹웨어 영리 양식정보 조회
	 * P : { !formSeq }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO NpGwEapFormInfoSelect ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpUserOptionA.NpGwEapFormInfoSelect", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
	
	/**
	 * 품의/결의 기본 설정 조회
	 * P : { !formSeq }
	 * return ResultVO with aaData
	 */
	@SuppressWarnings ( "unchecked" )
	public ResultVO selectBasicOption ( Map<String, Object> params ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result.setAaData( (List<Map<String, Object>>) selectList( "NpAdminConfigA.selectBasicOption", params ) );
			result.setSuccess( );
		}
		catch ( Exception ex ) {
			cmLog.CommonSetInfoToDatabase( "[   [ERROR] #EXNP# @DAO selectBasicOption] " + ex.getMessage( ), "-", "EXNP" );
			result.setFail( "Data 질의 요청중 에러 발생", ex );
		}
		return result;
	}
}