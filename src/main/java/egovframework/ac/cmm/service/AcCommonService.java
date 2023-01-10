package egovframework.ac.cmm.service;

import egovframework.ac.cmm.vo.ConnectionVO;

import java.util.Map;

/**
 * @title AcCommonService.java
 * @author doban7
 *
 * @date 2016. 9. 1. 
 */
public interface AcCommonService {

	/** 
	 * acErpSystemTypeInfo doban7 2016. 9. 1.
	 * @param param
	 * @return
	 * @throws Exception 
	 */
	ConnectionVO acErpSystemInfo(Map<String, Object> param) throws Exception;

}
