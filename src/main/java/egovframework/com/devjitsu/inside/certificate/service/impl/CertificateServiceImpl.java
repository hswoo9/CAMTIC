package egovframework.com.devjitsu.inside.certificate.service.impl;

import egovframework.com.devjitsu.inside.certificate.repository.CertificateRepository;
import egovframework.com.devjitsu.inside.certificate.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
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
    }
}
