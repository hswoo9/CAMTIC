package egovframework.com.devjitsu.approval.service;

import java.util.Map;

public interface ApprovalService {

    /**
     * 연동문서 기본정보 불러오기
     * @param params
     * @return
     */
    Map<String, Object> getLinkageProcessDocInterlock(Map<String, Object> params);

}
