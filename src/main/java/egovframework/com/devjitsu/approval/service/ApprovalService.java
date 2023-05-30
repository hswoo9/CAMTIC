package egovframework.com.devjitsu.approval.service;

import java.io.IOException;
import java.util.Map;

public interface ApprovalService {

    /**
     * 연동문서 기본정보 불러오기
     * @param params
     * @return
     */
    Map<String, Object> getLinkageProcessDocInterlock(Map<String, Object> params);

    /**
     * 상신전 부여할 문서번호 조회
     * @param params
     * @return
     */
    Map<String, Object> getDeptDocNum(Map<String, Object> params);

    /**
     * 상신 문서 저장
     * @param params
     */
    void setApproveDocInfo(Map<String, Object> params, String base_dir) throws IOException;

    /**
     * 문서 결재
     */
    void setDocApproveNReturn(Map<String, Object> params, String base_dir) throws IOException;

}
