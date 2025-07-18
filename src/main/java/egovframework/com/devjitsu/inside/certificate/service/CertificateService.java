package egovframework.com.devjitsu.inside.certificate.service;

import java.util.List;
import java.util.Map;

public interface CertificateService {

    /**
     * 증명서신청 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getCertificateList(Map<String, Object> params);

    /**
     * 증명서신청 단일데이터 조회
     * @param params
     * @return
     */
    Map<String, Object> getCertificateOne(Map<String, Object> params);

    /**
     * 증명서신청 증명서신청 저장 ( 관리자 )
     * @param params
     * @return
     */
    void setCertificateAdminInsert(Map<String, Object> params);

    /**
     * 증명서신청 증명서신청 저장
     * @param params
     * @return
     */
    void setCertificateInsert(Map<String, Object> params);

    /**
     * 증명서신청 증명서신청 수정
     * @param params
     * @return
     */
    void setCertificateUpdate(Map<String, Object> params);

    /**
     * 증명서신청 증명서신청 삭제
     * @param params
     * @return
     */
    void setCertificateDelete(Map<String, Object> params);

    /**
     * 증명서신청 전자결재 상태값 업데이트
     * @param bodyMap
     * @throws Exception
     */
    void updateDocState(Map<String, Object> bodyMap) throws Exception;

    void setReqCert(Map<String, Object> params);
}
