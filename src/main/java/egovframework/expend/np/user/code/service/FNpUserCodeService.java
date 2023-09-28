package egovframework.expend.np.user.code.service;


import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;

import java.util.Map;


public interface FNpUserCodeService {

	ResultVO GetCommonCode ( Map<String, Object> params, ConnectionVO conVo );
	
	ResultVO UpdateInterfaceInfo(Map<String, Object> params);
}
