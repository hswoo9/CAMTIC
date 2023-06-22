package egovframework.com.devjitsu.subHoliday.service.impl;

import egovframework.com.devjitsu.subHoliday.repository.SubHolidayRepository;
import egovframework.com.devjitsu.subHoliday.service.SubHolidayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubHolidayServiceImpl implements SubHolidayService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(SubHolidayServiceImpl.class);

    @Autowired
    private SubHolidayRepository subHolidayRepository;

    @Override
    @Transactional
    public void setVacUseHist(Map<String, Object> params) {
        if(params.containsKey("vacUseHistId")){
            subHolidayRepository.updateVacUseHist(params);
        }else{
            if(params.containsKey("checkUseYn")){
                subHolidayRepository.setVacUseHist(params);
                subHolidayRepository.updateVacUseHistWork(params);
            }else {
                subHolidayRepository.setVacUseHist(params);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getVacCodeList(Map<String, Object> params) {
        return subHolidayRepository.getVacCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getVacUseHistoryList(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryList(params);
    }

    @Override
    public Map<String, Object> getVacUseHistoryOne(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryOne(params);
    }

    @Override
    public List<Map<String, Object>> getVacUseHistoryWorkList(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryWorkList(params);
    }

    @Override
    public int getVacUseHistoryListTotal(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryListTotal(params);
    }

    @Override
    public List<Map<String, Object>> getUserVacList(Map<String, Object> params) {
        return subHolidayRepository.getUserVacList(params);
    }

    @Override
    public List<Map<String, Object>> getUserVacListStat(Map<String, Object> params) {
        return subHolidayRepository.getUserVacListStat(params);
    }

    @Override
    public void setUserVac(Map<String, Object> params) {
            subHolidayRepository.setUserVacUpdate(params);


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
        params.put("subholidayUseId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "10".equals(docSts)) { // 상신 - 결재
            params.put("status", "C");
            subHolidayRepository.updateApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            params.put("status", "E");
            subHolidayRepository.updateApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "Y");
            subHolidayRepository.updateFinalApprStat(params);
        }
    }

}
