package egovframework.expend.np.user.budget.service.impl;

import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;
import egovframework.expend.np.user.budget.dao.FNpUserBudgetServiceUDAO;
import egovframework.expend.np.user.budget.service.FNpUserBudgetService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;


@Service ( "FNpUserBudgetServiceU" )
public class FNpUserBudgetServiceUImpl implements FNpUserBudgetService {

	/* 변수정의 */
	/* 변수정의 - DAO */
	@Resource ( name = "FNpUserBudgetServiceUDAO" )
	private FNpUserBudgetServiceUDAO dao;

	@Override
	public ResultVO selectERPBudgetBalance (Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		ResultVO result = new ResultVO( );
		try {
			result = dao.selectBudgetBalance( params, conVo );
			Map<String, Object> temp = result.getaData( );
			String applyAm = CommonConvert.NullToString( temp.get( "P_AM_JSUM" ) == null ? "0" : temp.get( "P_AM_JSUM" ) );
			String resAm = CommonConvert.NullToString( temp.get( "P_AM_JSUMCAUSE" ) == null ? "0" : temp.get( "P_AM_JSUMCAUSE" ) );
			String openAm = CommonConvert.NullToString( temp.get( "P_AM_ACTSUM" ) == null ? "0" : temp.get( "P_AM_ACTSUM" ) );
			String balanceAm = "" + (Double.parseDouble( openAm ) - (Double.parseDouble( applyAm ) + Double.parseDouble( resAm )));
			temp.put( "applyAmt", applyAm );
			temp.put( "resAmt", resAm );
			temp.put( "openAmt", openAm );
			temp.put( "balanceAmt", balanceAm );
			temp.put( "ctlYN", temp.get( "P_YN_CONTROL" ).toString( ) );
			result.setaData( temp );
		}
		catch ( Exception ex ) {
			result.setFail( "사용자 기본 정보(ERP iU) 조회 도중 오류가 발생하였습니다." );
		}
		return result;
	}

	@Override
	public ResultVO selectConsBudgetBalance ( Map<String, Object> params ) throws Exception {
		throw new Exception( "품의서 잔액 조회 기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectResUseAmt ( Map<String, Object> params ) throws Exception {
		throw new Exception( "결의액 조회 기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectConsAmt ( Map<String, Object> params ) throws Exception {
		throw new Exception( "품의서별 합계 금 조회 기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectResAmt ( Map<String, Object> params ) throws Exception {
		throw new Exception( "결의서별 합계 금 조회 기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectTryAmt ( Map<String, Object> params ) throws Exception {
		throw new Exception( "문서 예산별 조회 금 조회 기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectConfferBudgetBalanceAmt ( Map<String, Object> params ) throws Exception {
		throw new Exception( "참조품의서 잔액 조회기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectConsBudgetBalanceForYesil ( Map<String, Object> params ) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResultVO selectResUseAmtForYesil ( Map<String, Object> params ) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResultVO selectConsBudgetBalance ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		throw new Exception( "참조품의서 잔액 조회기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectResUseAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		throw new Exception( "결의서 잔액 조회 기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectTryAmt ( Map<String, Object> params, ConnectionVO conVo ) throws Exception {
		throw new Exception( "문서 예산별 조회 금 조회 기능으로 GW전용 기능입니다." );
	}

	@Override
	public ResultVO selectConfferBudgetInfo(Map<String, Object> params) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResultVO updateConfferBudgetInfo(Map<String, Object> params) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
