package egovframework.ac.cmm.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.Map;

public interface CommFileService {

	Map<String, Object> commFileUpLoad(Map<String, Object> map, MultipartHttpServletRequest multi) throws Exception;

	Object getAttachFileList(Map<String, Object> paramMap) throws Exception;

}
