package egovframework.com.devjitsu.docView.service.impl;

import egovframework.com.devjitsu.docView.repository.DocViewProcessRepository;
import egovframework.com.devjitsu.docView.service.DocViewProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocViewProcessServiceImpl implements DocViewProcessService {

    @Autowired
    private DocViewProcessRepository docViewProcessRepository;

    @Override
    public void updateCardLossDocState(Map<String, Object> bodyMap) throws Exception {
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
        params.put("tpClSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            docViewProcessRepository.updateCardLossApprStat(params);
        }else if("20".equals(docSts)) { // 중간결재
            docViewProcessRepository.updateCardLossApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            docViewProcessRepository.updateCardLossApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            docViewProcessRepository.updateCardLossFinalApprStat(params);
        }else if("111".equals(docSts)){ // 임시저장
            docViewProcessRepository.updateCardLossApprStat(params);
        }
    }
}
