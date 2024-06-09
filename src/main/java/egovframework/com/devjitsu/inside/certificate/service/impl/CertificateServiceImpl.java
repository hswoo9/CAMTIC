package egovframework.com.devjitsu.inside.certificate.service.impl;

import egovframework.com.devjitsu.campus.repository.CampusRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.certificate.repository.CertificateRepository;
import egovframework.com.devjitsu.inside.certificate.service.CertificateService;
import egovframework.com.devjitsu.system.service.MenuManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.security.krb5.internal.PAData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private MenuManagementService menuManagementService;
    @Autowired
    private CampusRepository campusRepository;


    @Override
    public List<Map<String, Object>> getCertificateList(Map<String, Object> params){
        if(!params.containsKey("manageCheck")){
            params.put("manageCheck", "");
        }

        return certificateRepository.getCertificateList(params);
    }

    @Override
    public Map<String, Object> getCertificateOne(Map<String, Object> params){
        return certificateRepository.getCertificateOne(params);
    }

    @Override
    public void setCertificateAdminInsert(Map<String, Object> params) {
        certificateRepository.setCertificateAdminInsert(params);
    }

    @Override
    public void setCertificateInsert(Map<String, Object> params) {
        certificateRepository.setCertificateInsert(params);


        params.put("authorityGroupId", "47");
        List<Map<String, Object>> authUser = menuManagementService.getAuthorityGroupUserList(params);
        String recEmpSeq = "|";
        for(Map<String, Object> map : authUser){
            Map<String, Object> alarm = new HashMap<>();
            recEmpSeq += map.get("EMP_SEQ") + "|";

            alarm.put("sdEmpSeq", params.get("empSeq"));
            alarm.put("SND_EMP_NM", params.get("regtrName"));
            alarm.put("SND_DEPT_SEQ", params.get("deptSeq"));
            alarm.put("SND_DEPT_NM", params.get("regDeptName"));
            alarm.put("recEmpSeq", map.get("EMP_SEQ"));
            alarm.put("ntTitle", "[승인요청] 요청자 : " + params.get("regtrName"));
            alarm.put("ntContent", "[증명서] " + params.get("regDeptName") + " - " + params.get("regtrName"));
            alarm.put("ntUrl", "/Inside/certificateAdmin.do");
            commonRepository.setAlarm(alarm);
        }

        params.put("sdEmpSeq", params.get("empSeq"));           // 요청자 사번
        params.put("SND_EMP_NM", params.get("regEmpName"));        // 요청자 성명
        params.put("SND_DEPT_SEQ", params.get("deptSeq"));      // 요청자 부서
        params.put("SND_DEPT_NM", params.get("regDeptName"));      // 요청자 부서
        params.put("recEmpSeq", recEmpSeq);              // 승인자
        params.put("ntUrl", "/Inside/certificateAdmin.do");   // url
        params.put("frKey", params.get("userProofSn"));
        params.put("psType", "증명서 신청");

        commonRepository.setPsCheck(params);
    }

    @Override
    public void setCertificateUpdate(Map<String, Object> params) {
        certificateRepository.setCertificateUpdate(params);
    }

    @Override
    public void setCertificateDelete(Map<String, Object> params) {
        certificateRepository.setCertificateDelete(params);
    }

    @Override
    public void updateDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("userProofSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            params.put("status", "10");
            certificateRepository.updateCertifiApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { //반려
            params.put("status", "30");
            certificateRepository.updateCertifiApprStat(params);
        }else if("40".equals(docSts)) { //회수
            params.put("status", "40");
            certificateRepository.updateCertifiApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            certificateRepository.updateCertifiFinalApprStat(params);
        }
    }

    @Override
    public void setReqCert(Map<String, Object> params) {
        certificateRepository.setReqCert(params);

        params.put("type", "증명서 신청");
        params.put("frKey", params.get("userProofSn"));
        campusRepository.updPsStatus(params);
    }
}
