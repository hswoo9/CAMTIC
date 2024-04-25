package egovframework.com.devjitsu.doc.approval.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ApprovalService {

    /**
     * 연동 문서 기본 정보 저장
     * @param params
     */
    void setLinkageProcessDocInterlock(Map<String, Object> params);

    /**
     * 연동문서 기본정보 불러오기
     * @param params
     * @return
     */
    Map<String, Object> getLinkageProcessDocInterlock(Map<String, Object> params);

    /**
     * 참조기안 문서 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getFinalApprovalDocList(Map<String, Object> params);

    /**
     * 상신전 부여할 문서번호 조회
     * @param params
     * @return
     */
    Map<String, Object> getDeptDocNum(Map<String, Object> params);

    /**
     * 결재자 부재체크
     * @param params
     * @return
     */
    int getIsExistsAbsent(Map<String, Object> params);

    /**
     * 현재 결재순번 결재자 문서 최초 열람시간
     * @param params
     */
    void setDocApproveRouteReadDt(Map<String, Object> params);

    /**
     * 결재 문서 정보
     */
    Map<String, Object> getDocInfoApproveRoute(Map<String, Object> params);

    /**
     * 결재 문서 정보 (doc_info 테이블만 조회)
     * @param params
     * @return
     */
    Map<String, Object> getDocInfo(Map<String, Object> params);

    /**
     * 보안문서 체크(열람)
     * @param params
     * @return
     */
    boolean getDocSecurityIndexOfUserChk(Map<String, Object> params);

    /**
     * 문서의 현재 결재 순서
     */
    Map<String, Object> getDocApproveNowRoute(Map<String, Object> params);

    /**
     * 문서의 이전 결재 순서
     */
    Map<String, Object> getDocApprovePrevRoute(Map<String, Object> params);

    /**
     * 상신 문서 저장
     * @param params
     */
    void setApproveDocInfo(Map<String, Object> params, String base_dir) throws IOException;

    /**
     * 열람자 문서 열람시간 업데이트
     * @param params
     */
    void setDocReaderReadUser(Map<String, Object> params);

    /**
     * 결재문서 결재라인 정보
     * @param params
     * @return
     */
    List<Map<String, Object>> getDocApproveAllRoute(Map<String, Object> params);

    /**
     * 결재자별 결재상태 공통코드 조회
     * @param params
     * @return
     */
    Map<String, Object> getByApproveCmCodeInfo(Map<String, Object> params);

    /**
     * 문서 결재
     */
    void setDocApproveNReturn(Map<String, Object> params, String base_dir) throws IOException;

    /**
     * 문서 결재 취소
     */
    void setDocApproveCancel(Map<String, Object> params, String base_dir) throws IOException;

    /**
     * 결재 문서 첨부파일 정보
     */
    List<Map<String, Object>> getDocAttachmentList(Map<String, Object> params);

    /**
     * 온나라 문서 첨부파일
     * @param params
     * @return
     */
    List<Map<String, Object>> getOnnaraDocAttachmentList(Map<String, Object> params);

    /**
     * 상신 문서 회수 (최종결재 전 회수 가능)
     */
    void setApproveRetrieve(Map<String, Object> params) throws IOException;

    /**
     * 문서 결재자 의견 보기
     */
    List<Map<String, Object>> getDocApproveHistOpinList(Map<String, Object> params);

    /**
     * 문서 결재이력 보기
     */
    List<Map<String, Object>> getDocApproveStatusHistList(Map<String, Object> params);

    /**
     * 문서 열람이력 보기
     */
    List<Map<String, Object>> getDocReaderHistList(Map<String, Object> params);


    void setApproveDraftFile(Map<String, Object> params, MultipartFile[] mpf, String serverDir, String baseDir);

    void setFormIdUpd(Map<String, Object> params);

    Map<String, Object> getDraftEmpSeq(Map<String, Object> params);
}
