package egovframework.com.devjitsu.inside.certificate.service.impl;

import egovframework.com.devjitsu.inside.certificate.repository.CertificateRepository;
import egovframework.com.devjitsu.inside.certificate.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        //해당년도의 증명서 전체 불러오기
        Map<String, Object> yearData = new HashMap<>();
        yearData.put("docuYearDe",params.get("docuYearDe"));
        yearData.put("manageCheck", "admin");
        List<Map<String, Object>> allCertificateList = certificateRepository.getCertificateList(yearData);

        // USER_PROOF_SN을 기준으로 정렬
        allCertificateList.sort((map1, map2) -> Integer.compare((int) map1.get("USER_PROOF_SN"), (int) map2.get("USER_PROOF_SN")));

        for (int i = 0; i < allCertificateList.size(); i++) {
            Map<String, Object> map = allCertificateList.get(i);
            map.put("userProofTurn", i + 1);
        }

        List<Map<String, Object>> certificateList = certificateRepository.getCertificateList(params);

        for (Map<String, Object> certMap : certificateList) {
            int userProofSN = (int) certMap.get("USER_PROOF_SN");
            Map<String, Object> matchingMap = allCertificateList.stream()
                    .filter(map -> userProofSN == (int) map.get("USER_PROOF_SN"))
                    .findFirst()
                    .orElse(null);

            if (matchingMap != null) {
                certMap.put("userProofTurn", matchingMap.get("userProofTurn"));
            }
        }

        return certificateList;
    }

    @Override
    public Map<String, Object> getCertificateOne(Map<String, Object> params){
        Map<String, Object> certificateOne = certificateRepository.getCertificateOne(params);

        Map<String, Object> yearData = new HashMap<>();
        yearData.put("docuYearDe",certificateOne.get("DOCU_YEAR_DE"));
        yearData.put("manageCheck", "admin");
        List<Map<String, Object>> allCertificateList = certificateRepository.getCertificateList(yearData);

        allCertificateList.sort((map1, map2) -> Integer.compare((int) map1.get("USER_PROOF_SN"), (int) map2.get("USER_PROOF_SN")));

        for (int i = 0; i < allCertificateList.size(); i++) {
            Map<String, Object> map = allCertificateList.get(i);
            map.put("userProofTurn", i + 1);
        }

        // certificateOne에 userProofTurn 값 추가
        int userProofSN = (int) certificateOne.get("USER_PROOF_SN");

        // allCertificateList에서 USER_PROOF_SN이 일치하는 Map 찾기
        Map<String, Object> matchingMap = allCertificateList.stream()
                .filter(map -> userProofSN == (int) map.get("USER_PROOF_SN"))
                .findFirst()
                .orElse(null);

        // 일치하는 경우 userProofTurn 값을 certificateOne에 추가
        if (matchingMap != null) {
            certificateOne.put("userProofTurn", matchingMap.get("userProofTurn"));
        }

        // 결과 확인
        System.out.println(certificateOne);



        return certificateOne;
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
