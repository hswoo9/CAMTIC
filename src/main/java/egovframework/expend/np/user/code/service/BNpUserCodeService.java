package egovframework.expend.np.user.code.service;


import egovframework.expend.common.vo.ResultVO;

import java.util.Map;

public interface BNpUserCodeService {
	ResultVO GetCommonCode(Map<String, Object> params);
	
	ResultVO UpdateInterfaceInfo(Map<String, Object> params);
}