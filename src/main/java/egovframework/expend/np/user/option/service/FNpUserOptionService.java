package egovframework.expend.np.user.option.service;


import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;

import java.util.Map;


public interface FNpUserOptionService {

	public Map<String, Object> npTest ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;

	public ResultVO selectERPOption (Map<String, Object> params, ConnectionVO conVo ) throws Exception;

	public ResultVO selectGWOption ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;

	public ResultVO selectBaseData ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;

	public ResultVO selectVatCtrData ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;
	
	public ResultVO selectEaFormInfo ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;

	public ResultVO selectAbgtInfo ( Map<String, Object> params, ConnectionVO conVo ) throws Exception;
	
	public ResultVO selectBasicOption ( Map<String, Object> params ) throws Exception;
}